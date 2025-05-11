import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASEURL}/api/v1/forget-password`, {
        email,
      });

      setSuccessMsg("Reset link has been sent to your email.");
      setTimeout(()=>{
        navigate('/change-password')
      },1500)
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-[#3333333a] shadow-2xl p-8 py-10 rounded-2xl w-96 mx-5 my-0">
        <h2 className="text-[30px] font-bold text-center">Forget Password?</h2>
        <p className="text-center text-gray-600 mt-2">
          Enter your email address and we will send you a link to reset your password
        </p>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:scale-[1.02] focus:ring-[#4F7292] focus:border-0"
              placeholder="Email"
            />
            {errorMsg && (
              <div
                className="p-2 mt-0.5 text-sm mb-2 text-red-800 bg-red-100 rounded-lg"
                role="alert"
              >
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div
                className="p-2 mt-2 text-sm mb-2 text-green-800 bg-green-100 rounded-lg"
                role="alert"
              >
                {successMsg}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6B8EAE] tracking-wider text-white p-2 rounded-lg mt-4 hover:bg-[#4F7292] hover:scale-[102%] hover:transition-all duration-200 delay-150 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
