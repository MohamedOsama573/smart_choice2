import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FadeLoader } from "react-spinners";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      setSuccessMessage(null);
      setErrorMessage(null);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASEURL}/api/v1/signin`,
          values
        );

        // console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.access_token); // Save token

        // // console.log("Login successful:", response.data);

        setSuccessMessage("Login successful!");
        setTimeout(() => {
          setSuccessMessage(null);
          navigate("/");
        }, 2000);
      } catch (error) {
        console.error("Login failed:", error);
        if (error.response && error.response.data) {
          const errorMsg = error.response.data.message || "Login failed";
          setErrorMessage(errorMsg);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        } else {
          setErrorMessage("An unexpected error occurred");
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        }
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
          "Must be at least 8 characters, including an uppercase, lowercase, number, and special character"
        )
        .required("Password is required"),
    }),
  });

  return (
    <div className="relative flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-50">
      {isLoading && (
        <div className="fixed inset-0 bg-transparent flex justify-center items-center z-50">
          <FadeLoader color="#4F7292" height={15} width={5} radius={2} margin={2} />
        </div>
      )}

      {successMessage && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 p-4 text-sm text-blue-700 bg-blue-100 rounded z-40" role="alert">
          <span className="font-medium">Success!</span> {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 p-4 text-sm text-red-800 bg-red-100 rounded z-40" role="alert">
          <span className="font-medium">Error:</span> {errorMessage}
        </div>
      )}

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-[#3333333a] shadow-2xl w-full max-w-md relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">Log in</h2>
        <p className="text-center text-gray-600 mt-2">
          Don’t have an Account?{' '}
          <Link
            to="/register"
            className="text-[#4F7292] hover:text-[#91bfea] hover:transition-all duration-400 ease-in-out"
          >
            Create an Account
          </Link>
        </p>

        <form onSubmit={loginFormik.handleSubmit} className="mt-6">
          <div>
            <input
              id="email"
              name="email"
              onBlur={loginFormik.handleBlur}
              onChange={loginFormik.handleChange}
              value={loginFormik.values.email}
              type="email"
              disabled={isLoading}
              placeholder="Email"
              className="w-full p-2 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:scale-[1.02] focus:ring-[#4F7292] focus:border-0"
            />
            {loginFormik.touched.email && loginFormik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{loginFormik.errors.email}</p>
            )}
          </div>

          <div className="mt-4 relative">
            <input
              id="password"
              name="password"
              onBlur={loginFormik.handleBlur}
              onChange={loginFormik.handleChange}
              value={loginFormik.values.password}
              type={showPassword ? "text" : "password"}
              disabled={isLoading}
              placeholder="Password"
              className="w-full p-2 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:scale-[1.02] focus:ring-[#4F7292] focus:border-0"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 text-xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoMdEye /> : <FaEyeSlash />}
            </span>
            {loginFormik.touched.password && loginFormik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{loginFormik.errors.password}</p>
            )}
          </div>

          <div className="text-right mt-2">
            <Link
              to="/forget-password"
              className="text-[#4F7292] text-sm hover:text-[#91bfea] hover:transition-all duration-400 ease-in-out"
            >
              Forgot password?
            </Link>
          </div>
          <div className="text-left mt-2">
            Do not have an Account?{' '}
            <Link
              to="/register"
              className="text-[#4F7292] text-sm hover:text-[#91bfea] hover:transition-all duration-400 ease-in-out"
            >
              Create an Account     
            </Link>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#6B8EAE] tracking-wider text-sm sm:text-base text-white p-2 rounded-lg mt-6 hover:bg-[#4F7292] hover:scale-[102%] hover:transition-all duration-200 disabled:bg-gray-400"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <p className="px-3 text-gray-600">Or Log in with</p>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          className="flex items-center justify-center w-full border border-gray-300 shadow bg-white text-md p-2 rounded-lg hover:bg-gray-50 hover:scale-[102%] hover:transition-all duration-200 ease-in-out"
          disabled={isLoading}
        >
          <FcGoogle className="text-2xl mr-1.5" /> Google
        </button>
      </div>
    </div>
  );
};

export default Login;
