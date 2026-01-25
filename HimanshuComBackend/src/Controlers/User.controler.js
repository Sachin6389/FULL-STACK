import { asyncHandler } from "../utiles/AscynHandler.js";
import { ApiError } from "../utiles/ApiError.js";
import { User } from "../Models/user.Models.js";
import { Apiresponse } from "../utiles/ApiResponse.js";
import { UploudOnCloundinary } from "../utiles/cloundinary.js";
import jwt from "jsonwebtoken";
import validator from "validator";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  try {
    // get user details from fronted
    // varified and validation
    // check if user already exit:username,Emials
    // for Image,check for avatar
    //upload them to cloudinary,avatar
    //create user contex in db
    // check for user creation
    //return res
    const { fullName, email, phone, password, address, PinCode, City, State } =
      req.body;
    if (
      [fullName, email, phone, password, address, PinCode, City, State].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }
    const exitedUser = await User.findOne({
      $or: [{ phone }, { email }],
    });
    if (exitedUser) {
      throw new ApiError(409, "User with email or phone already exist");
    }
    if (!validator.isEmail(email)) {
      throw new ApiError(400, "Email Id is not valide");
    }

    if (password.length < 8) {
      throw new ApiError(
        400,
        "Password should strong and it contain minimum 8 lenght"
      );
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;

    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar or photo file is required");
    }
    const avatar = await UploudOnCloundinary(avatarLocalPath);

    if (!avatar) {
      throw new ApiError(400, "avatar file is required");
    }
    const user = await User.create({
      fullName,
      avatar: avatar.url,
      email,
      password,
      address: address.toLowerCase(),
      phone,
      PinCode,
      City,
      State,
    });
    const createUser = await User.findById(user._id).select(
      "-password  -refreshtoken"
    );
    if (!createUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }
    return res
      .status(201)
      .json(new Apiresponse(200, { user: createUser }, "user registered Successfully"));
  } catch (error) {
    // If ApiError → use its status and message
    const status = error.statusCode || 500;

    return res
      .status(status)
      .json(
        new Apiresponse(status, null, error.message || "Registration failed")
      );
  }
});
const loginuser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new ApiError(400, "EmailId is required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credetials");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    const loggedInuser = await User.findById(user._id).select(
      " -password  -refreshToken"
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new Apiresponse(
          200,
          {
            user: loggedInuser,
            accessToken,
            refreshToken,
          },
          "User logged in successfully"
        )
      );
  } catch (error) {
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(new Apiresponse(status, null, error.message || "Login failed"));
  }
});
const LogoutUser = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new Apiresponse(200, {}, "User logged Out"));
  } catch (error) {
    return res.status(500).json(new Apiresponse(500, null, "Logout failed"));
  }
});


const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    // 1. Get refresh token from body or cookies
    const incomingRefreshToken =
      req.body?.refreshToken || req.cookies?.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
    }

    // 2. Verify refresh token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // 3. Find user
    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // 4. Match refresh token with DB
    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token expired or already used");
    }

    // 5. Generate new tokens
    const { accessToken, refreshToken } =
      await generateAccessAndRefreshToken(user._id);

    // 6. Cookie options
    const options = {
      httpOnly: true,
      secure: true, // true in production (HTTPS)
      sameSite: "strict",
    };

    // 7. Send response
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new Apiresponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
      const status = error.statusCode || 500;
      return res
         .status(status)
         .json(
             new Apiresponse(
                   status,
                     null,
                     error.message || "Could not refresh access token"
                   )
                 );
  }
});


const changePassword = asyncHandler(async (req, res) => {
  try {
    
    const { oldPassword, NewPassword } = req.body;
    
    
    const user = await User.findById(req.user?._id);
    
    
    const ispassword = await user.isPasswordCorrect(oldPassword);
    if (!ispassword) {
      throw new ApiError(401, "Invalid old password");
    }
    user.password = NewPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new Apiresponse(200, {}, "Password changed successfuly"));
  } catch (error) {
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new Apiresponse(
          status,
          null,
          error.message || "Could not change password"
        )
      );
  }
});

const updatedAccountDetail = asyncHandler(async (req, res) => {
  try {
    const { fullName, email, phone, address, City, State, PinCode } = req.body;
    if (!(fullName || City || State || PinCode)) {
      throw new ApiError(401, "All fields are required");
    }
    if (!(phone || address)) {
      throw new ApiError(401, "All fields are required");
    }
    if (email && !validator.isEmail(email)) {
      throw new ApiError(400, "EmailId is not valide");
    }
    
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          fullName: fullName,
          email: email,
          phone: phone,
          address: address,
          City: City,
          State: State,
          PinCode: PinCode,

        },
      },
      { new: true }
    ).select("-password");
    return res
      .status(200)
      .json(
        new Apiresponse(200, { user: user }, " Account Detailed is updated successful")
      );
  } catch (error) {
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new Apiresponse(
          status,
          null,
          error.message || "Could not update avatar image"
        )
      );
  }
});
const updatedAvatarImage = asyncHandler(async (req, res) => {
  try {
    const avatarLocalpath = req.file?.path;
    console.log(avatarLocalpath);
    
    if (!avatarLocalpath) {
      throw new ApiError(400, "File is required");
    }
    const newavatar = await UploudOnCloundinary(avatarLocalpath);
    if (!newavatar.url) {
      throw new ApiError(400, "file is not uploaded because of error");
    }
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          avatar: newavatar.url,
        },
      },
      {
        new: true,
      }
    ).select("-password");
    return res
      .status(200)
      .json(new Apiresponse(200, user, "Avatar image updated successfully"));
  } catch (error) {
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new Apiresponse(
          status,
          null,
          error.message || "Could not update avatar image"
        )
      );
  }
});
const adminPanel = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "email and password is required");
    }

    if (
      email !== process.env.ADMIN_EMAIL &&
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(400)
        .json(new Apiresponse(400, "Invalide password or emailId"));
    }
    const payload = email + password;
    const token = jwt.sign({ payload }, process.env.ACCES_TOKEN_SECRET, {
      expiresIn: process.env.ACCES_TOKEN_EXPIRY,
    });

    return res
      .status(200)
      .json(new Apiresponse(200, token, "Admin login succefull"));
  } catch (error) {
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new Apiresponse(status, null, error.message || "Admin login failed")
      );
  }
});

export {
  registerUser,
  loginuser,
  LogoutUser,
  refreshAccessToken,
  changePassword,
  adminPanel,
  updatedAccountDetail,
  updatedAvatarImage,
};
