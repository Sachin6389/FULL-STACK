import { asyncHandler } from "../utiles/AscynHandler.js";
import { ApiError } from "../utiles/ApiError.js";
import { Apiresponse } from "../utiles/ApiResponse.js";
import { Order } from "../Models/Order.Model.js";
import { User } from "../Models/user.Models.js";
import Stripe from "stripe";

const deliveryCharge = 50; // example
const currency = "inr";

const stripe = new Stripe(process.env.STRIPE_KEY);

const Cashondelivery = asyncHandler(async (req, res) => {
  try {
    const { userId, items, totalAmount, address } = req.body;

    if (!userId || !items || !totalAmount || !address) {
      throw new ApiError(400, "all fields are required");
    }
    const oderdata = {
      userId,
      items,
      totalAmount,
      address,
      orderDate: Date.now(),
      paymentMethod: "Cash on Delivery",
      payment: false,
    };

    const order = await Order.create(oderdata);
    if (!order) {
      throw new ApiError(500, "somthing went at order wrong");
    }
    await User.findByIdAndUpdate(userId, { cart: {} }, { new: true });
    return res
      .status(201)
      .json(new Apiresponse(201, "order placed successfully", order));
  } catch (error) {
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new Apiresponse(
          status,
          null,
          error.message || "Something went wrong at placing order",
        ),
      );
  }
});
const Rezorpay = asyncHandler(async (req, res) => {});
const stripepayment = asyncHandler(async (req, res) => {
  const { userId, items, totalAmount, address } = req.body;
  const { origin } = req.headers;

  if (!userId || !items || !totalAmount || !address) {
    throw new ApiError(400, "All fields are required");
  }

  // ⚠️ Create order but mark payment = false
  const order = await Order.create({
    userId,
    items,
    totalAmount,
    address,
    orderDate: Date.now(),
    paymentMethod: "Stripe",
    payment: false,
  });

  if (!order) {
    throw new ApiError(500, "Something went wrong while creating order");
  }

  // Clear cart
  await User.findByIdAndUpdate(userId, { cart: {} });

  // ✅ Stripe line items
  const line_items = items.map((item) => ({
    price_data: {
      currency,
      product_data: {
        name: item.name || "Product",
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  // Delivery charges
  line_items.push({
    price_data: {
      currency,
      product_data: {
        name: "Delivery Charges",
      },
      unit_amount: deliveryCharge * 100,
    },
    quantity: 1,
  });

  // ✅ Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items,
    success_url: `${origin}/verify?success=true&orderId=${order._id}`,
    cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
  });

  return res.status(201).json(
    new Apiresponse(201, "order placed successfully", {
      session_url: session.url,
    }),
  );
});
const verifystripe = asyncHandler(async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true }, { new: true });
      return res
        .status(201)
        .json(new Apiresponse(201, { success: true }, "payment is succesfull"));
    } else {
      await Order.findByIdAndDelete(orderId);
      return res
        .status(201)
        .json(
          new Apiresponse(201, { success: false }, "payment is not succesfull"),
        );
    }
  } catch (error) {
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new Apiresponse(
          status,
          null,
          error.message || "Something went wrong at placing order",
        ),
      );
  }
});
const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({});
    return res
      .status(200)
      .json(new Apiresponse(200, orders, "all orders fetched successfully"));
  } catch (error) {
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new Apiresponse(
          status,
          null,
          error.message || "Something went wrong at fetching all orders",
        ),
      );
  }
});
const getuserorder = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id;

    const orders = await Order.find({ userId });

    return res
      .status(200)
      .json(new Apiresponse(200, orders, "user orders fetched successfully"));
  } catch (error) {
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new Apiresponse(
          status,
          null,
          error.message || "Something went wrong at fetching user orders",
        ),
      );
  }
});
const updatestatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;
  try {
    if (!orderId || !status) {
      throw new ApiError(400, "orderId and status are required");
    }
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );
    if (!order) {
      throw new ApiError(404, "Order not found");
    }
    return res
      .status(200)
      .json(new Apiresponse(200, order, "Order status updated successfully"));
  } catch (error) {
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new Apiresponse(
          status,
          null,
          "Something went wrong while updating order status",
        ),
      );
  }
});
const updateorderrecord = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  

  try {
    if (!orderId) {
      throw new ApiError(400, "OrderId is required");
    }

    const respons = await Order.findByIdAndDelete(orderId);

    return res
      .status(200)
      .json(new Apiresponse(200, respons, "Delete the order"));
  } catch (error) {
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(
        new Apiresponse(
          status,
          null,
          "Something went wrong while deleting order ",
        ),
      );
  }
});
export {
  Cashondelivery,
  Rezorpay,
  stripepayment,
  getOrders,
  getuserorder,
  updatestatus,
  verifystripe,
  updateorderrecord,
};
