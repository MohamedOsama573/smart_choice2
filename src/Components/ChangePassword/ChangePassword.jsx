import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cPassword: "",
    otpEmail: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.cPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASEURL}/api/v1/change-password`,
        formData
      );

      setSuccessMsg("Password changed successfully!");
      setFormData({
        email: "",
        password: "",
        cPassword: "",
        otpEmail: "",
      });
      setTimeout(()=>{
        navigate('/login')
      },1500)
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg p-8 py-10 rounded-2xl w-96 mx-5 my-0">
        <h2 className="text-[26px] font-bold text-center">Change Password</h2>
        <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#4F7292] focus:outline-none"
          />

          <input
            type="text"
            name="otpEmail"
            placeholder="OTP Code"
            value={formData.otpEmail}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#4F7292] focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#4F7292] focus:outline-none"
          />

          <input
            type="password"
            name="cPassword"
            placeholder="Confirm Password"
            value={formData.cPassword}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#4F7292] focus:outline-none"
          />

          {errorMsg && (
            <div className="text-sm text-red-700 bg-red-100 p-2 rounded">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="text-sm text-green-700 bg-green-100 p-2 rounded">
              {successMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6B8EAE] text-white p-2 rounded-lg hover:bg-[#4F7292] transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
