function Home( { token } ) {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      
      <div className="bg-white shadow-md rounded-xl p-6 sm:p-8 md:p-10 text-center w-full max-w-2xl">
        
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          👋 Welcome to Admin Panel
        </h1>

        <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg">
          Please select an option from the sidebar to continue.
        </p>

      </div>

    </div>
  );
}

export default Home;

