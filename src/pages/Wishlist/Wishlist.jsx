import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASEURL}/api/v1/all-wishlist`,
          {
            headers: {
              Authorization: `abdelrahman ${localStorage.getItem("token")}`,
            },
          }
        );
        setWishlist(response.data.data); // adjust based on the actual array shape
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);
  const deleteFromWishlist = async (productId, modelType) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_BASEURL}/api/v1/delete-wishlist`,
        {
          headers: {
            Authorization: `abdelrahman ${token}`,
          },
          data: {
            productId,
            modelType,
          },
        }
      );
      toast.success(response.data.message || "Deleted from wishlist!");
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete from wishlist", error);
      toast.error("Failed to delete from wishlist. Please try again.");
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-lg font-semibold animate-pulse">
          Loading Wishlist...
        </p>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-lg font-semibold">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlist.map((item) => (
        <div
          key={item.productId}
          className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300"
        >
          <img
            src={
              item.productData.thumbnailImage ||
              item.productData.galleryThumbnails?.[0]
            }
            alt={item.productData.brand}
            className="w-full  object-cover"
          />
          <div className="p-4 flex flex-col justify-between h-[200px]">
            <div>
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {item.productData.brand} - {item.modelType}
              </h3>
              <p className="text-gray-600 text-sm mt-1 truncate">
                {item.productData.processor}
              </p>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {item.productData.urls?.amazon && (
                    <a
                      href={item.productData.urls.amazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Amazon
                    </a>
                  )}
                  <span className="text-green-600 font-bold text-md">
                    {item.productData.priceAmazon
                      ? `${item.productData.priceAmazon.toLocaleString()} EGP`
                      : "Price Unavailable"}
                  </span>
                  {item.productData.urls?.jumia && (
                    <a
                      href={item.productData.urls.jumia}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 text-sm hover:underline"
                    >
                      Jumia
                    </a>
                  )}
                  <span className="text-green-600 font-bold text-md">
                    {item.productData.priceJumia
                      ? `${item.productData.priceJumia.toLocaleString()} EGP`
                      : "Price Unavailable"}
                  </span>
                </div>
                <button
                  onClick={() =>
                    deleteFromWishlist(item.productId, item.modelType)
                  }
                  className="text-red-500 hover:text-red-700 transition duration-200"
                >
                  <MdDelete size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
