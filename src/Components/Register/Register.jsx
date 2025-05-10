import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FadeLoader } from "react-spinners";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const registerFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cPassword: "",
      phone :""
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setIsLoading(true);
      setSuccessMessage(null);
      setErrorMessage(null);
      try {
        localStorage.setItem("email", values.email);
        const response = await axios.post(`${import.meta.env.VITE_BASEURL}/api/v1/signup`, values);
        setSuccessMessage(response.message||"Registration successful!");
        setTimeout(() => {
          setSuccessMessage(null);
          navigate("/otp");
        }, 1500);
      } catch (error) {
        console.error("Registration failed:", error);
        if (error.response && error.response.data) {
          const errorMsg = error.response.data.message || "Registration failed";
          setErrors({ email: errorMsg });
          setErrorMessage(errorMsg);
        } else {
          setErrorMessage("An unexpected error occurred");
        }
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First name is required").min(3, "Must be at least 3 characters").max(15, "Must be at most 15 characters"),
      lastName: yup.string().required("Last name is required").min(3, "Must be at least 3 characters").max(15, "Must be at most 15 characters"),
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/, "Must be at least 8 characters, including an uppercase, lowercase, number, and special character").required("Password is required"),
      cPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm password is required"),
      phone :  yup.string().required("Phone number is required").matches(/^\d{11}$/, "Phone number must be 11 digits"),
    }),
  });

  return (
    <div className="relative flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
      {isLoading && (
        <div className="fixed inset-0 bg-white/60 flex justify-center items-center z-50">
          <FadeLoader color="#4F7292" height={15} width={5} radius={2} margin={2} />
        </div>
      )}

      {successMessage && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 p-4 rounded-md bg-green-100 text-green-800 text-sm font-semibold shadow z-40" role="alert">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 p-4 rounded-md bg-red-100 text-red-800 text-sm font-semibold shadow z-40" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="bg-white mt-1 sm:mt-0 p-6 sm:p-8 rounded-xl shadow-[#3333333a] shadow-2xl w-full max-w-md relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center -mt-2">Create an Account</h2>
        <p className="text-center text-gray-600 mt-2">
          Already have an account? <Link to="/Login" className="text-[#4F7292] hover:text-[#91bfea] hover:transition-all duration-400 ease-in-out">Log in</Link>
        </p>

        <form onSubmit={registerFormik.handleSubmit} className="mt-6">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="w-full sm:w-1/2">
              <input
                id="firstName"
                name="firstName"
                onBlur={registerFormik.handleBlur}
                onChange={registerFormik.handleChange}
                value={registerFormik.values.firstName}
                type="text"
                placeholder="First Name"
                className="w-full p-2 mt-2 sm:mt-0 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F7292] focus:border-transparent"
              />
              {registerFormik.touched.firstName && registerFormik.errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{registerFormik.errors.firstName}</p>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <input
                id="lastName"
                name="lastName"
                onBlur={registerFormik.handleBlur}
                onChange={registerFormik.handleChange}
                value={registerFormik.values.lastName}
                type="text"
                placeholder="Last Name"
                className="w-full p-2 mt-2 sm:mt-0 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F7292] focus:border-transparent"
              />
              {registerFormik.touched.lastName && registerFormik.errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{registerFormik.errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <input
              id="email"
              name="email"
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              value={registerFormik.values.email}
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F7292] focus:border-transparent"
            />
            {registerFormik.touched.email && registerFormik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{registerFormik.errors.email}</p>
            )}
          </div>
          <div className="mt-4">
            <input
              id="phone"
              name="phone"
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              value={registerFormik.values.phone}
              type="text"
              placeholder="phone"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F7292] focus:border-transparent"
            />
            {registerFormik.touched.phone && registerFormik.errors.phone && (
              <p className="text-red-500 text-xs mt-1">{registerFormik.errors.phone}</p>
            )}
          </div>
          <div className="mt-4 relative">
            <input
              id="password"
              name="password"
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              value={registerFormik.values.password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F7292] focus:border-transparent"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 text-xl" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <IoMdEye /> : <FaEyeSlash />}
            </span>
            {registerFormik.touched.password && registerFormik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{registerFormik.errors.password}</p>
            )}
          </div>
          <div className="mt-4 relative">
            <input
              id="cPassword"
              name="cPassword"
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              value={registerFormik.values.cPassword}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F7292] focus:border-transparent"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 text-xl" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <IoMdEye /> : <FaEyeSlash />}
            </span>
            {registerFormik.touched.cPassword && registerFormik.errors.cPassword && (
              <p className="text-red-500 text-xs mt-1">{registerFormik.errors.cPassword}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#6B8EAE] tracking-wider text-sm sm:text-base text-white p-2 rounded-lg mt-6 hover:bg-[#4F7292] hover:scale-105 transition duration-200 disabled:bg-gray-400"
          >
            {isLoading ? "Registering..." : "Create Account"}
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <p className="px-3 text-gray-600">Or register with</p>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <button className="flex items-center justify-center w-full border border-gray-300 shadow bg-white text-md p-2 rounded-lg hover:bg-gray-50 hover:scale-105 transition duration-200">
          <FcGoogle className="text-2xl mr-1.5" /> Google
        </button>
      </div>
    </div>
  );
};

export default Register;
