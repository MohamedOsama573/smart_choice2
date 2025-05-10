export const ForgetPassword = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-[#3333333a] shadow-2xl p-8 py-10 rounded-2xl w-96 mx-5 my-0 ">
        <h2 className="text-[30px] font-bold text-center ">Forget Password?</h2>
        <p className="text-center text-gray-600 mt-2">Enter your email address and we will send you link to reset your password </p>
        {/* login form */}
        <form className="mt-6">
          <div>
          {/* Email input */}
            <input id="email" name="email" type="email" required className="w-full p-2 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:scale-[1.02] focus:ring-[#4F7292]  focus:border-0" placeholder="Email"/>
            <div className="p-2 mt-0.5 text-sm mb-2 hidden text-red-800 rounded-lg  dark:bg-gray-800 dark:text-red-400"
              role="alert"> Change a few things up and try submitting again.</div>
          </div>
          {/* Login button */}
          <button type="submit" className="w-full bg-[#6B8EAE] tracking-wider text-white p-2 rounded-lg mt-4 hover:bg-[#4F7292] hover:scale-[102%] hover:transition-all duration-200  delay-150">
             Send Email
          </button>
        </form>
      </div>  
    </div>
  );
};

export default ForgetPassword;
