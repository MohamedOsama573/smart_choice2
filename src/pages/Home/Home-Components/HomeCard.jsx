import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import amazonLogo from "../../../assets/amazon.png";
import jumiaLogo from "../../../assets/jumia.png";
import noonLogo from "../../../assets/noon.png";

function HomeCard({
  image,
  name,
  priceJumia,
  priceAmazon,
  priceNoon,
  id,
  currency,
  category,
  onSelect,
  selected,
  isRecomendation,
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCompared, setIsCompared] = useState(selected);
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    setIsCompared(selected);
  }, [selected]);

  const truncatedName = name.length > 40 ? name.slice(0, 40) + "..." : name;

  const handleWishlistToggle = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to modify wishlist!");
        return;
      }

      if (isWishlisted) {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          `${import.meta.env.VITE_BASEURL}/api/v1/delete-wishlist`,
          {
            headers: {
              Authorization: `abdelrahman ${token}`,
            },
            data: {
              productId: id,
              modelType: category,
            },
          }
        );
        toast.success(response.data.message || "Deleted from wishlist!");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_BASEURL}/api/v1/wishlist`,
          {
            productId: id,
            modelType: category,
          },
          {
            headers: {
              Authorization: `abdelrahman ${token}`,
            },
          }
        );
        toast.success(response.data.message || "Added to wishlist!");
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleCompareToggle = () => {
    setIsCompared(!isCompared);
    onSelect(id);
    toast[!isCompared ? "success" : "info"](
      !isCompared ? "Added to compare." : "Removed from compare.",
      { autoClose: 1500 }
    );
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md py-6 px-4 m-2">
      <img
        src={image}
        alt={name}
        className="cursor-pointer h-56 rounded-t-lg transition-transform duration-300 transform hover:scale-110"
      />

      <Link
        to={`/${category}/product/${id}`}
        className="text-lg font-semibold mt-2 text-center w-full truncate"
        title={name}
      >
        {truncatedName}
      </Link>

      <div className="flex justify-between items-center gap-2">
        <img src={amazonLogo} className="w-16" />
        <p className="text-gray-600">
          {priceAmazon} {currency}
        </p>
      </div>
      <div className="flex justify-between items-center gap-2">
        <img src={jumiaLogo} className="w-16" />
        <p className="text-gray-600 mt-1">
          {priceJumia} {currency}
        </p>
      </div>
      {priceNoon && (
        <div className="flex justify-between items-center gap-2">
          <img src={noonLogo} className="w-16 " />
          <p className="text-gray-600 mt-1">
            {priceNoon} {currency}
          </p>
        </div>
      )}

      <div className="flex gap-2 justify-between items-center w-full mt-2">
        {isRecomendation ? (
          ""
        ) : (
          <button
            onClick={handleCompareToggle}
            className={`border py-2 px-6 rounded text-lg font-bold ${
              isCompared
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-900 hover:text-white"
            }`}
          >
            Compare
          </button>
        )}

        {isAuthenticated && (
          <button
            onClick={handleWishlistToggle}
            className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
          >
            {isWishlisted ? (
              <FaHeart size={20} className="text-red-500" />
            ) : (
              <FaRegHeart size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default HomeCard;
