import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import amazonLogo from "../../assets/amazon.png";
import jumiaLogo from "../../assets/jumia.png";
import noonLogo from "../../assets/noon.png";
import axios from "axios";
import Loading from "../../Components/Loader/Loading";
import HomeCard from "../Home/Home-Components/HomeCard";

export default function Details() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const [recomendationProducts, setRecomendationProducts] = useState([]);

  const getRecomendationProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASEURL
        }/api/v1/products/recommend-laptop/${id}`,
        {
          headers: {
            Authorization: `abdelrahman ${token}`,
          },
        }
      );
      setRecomendationProducts(response.data.recommendedLaptop);
    } catch (error) {
      setError(error.message || "Error");
    }
  };
  useEffect(() => {
    setLoading(true);
    const getOneProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASEURL}/api/v1/products/amazon-laptop/${id}`,{
            headers: {
              Authorization : `abdelrahman ${token}`,
            }
          }
        );
        setProduct(response.data);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getOneProduct();
    getRecomendationProducts();
  }, [id]);



  if (loading) return <div className="flex justify-center items-center my-12">
    <Loading />
  </div>;
  if (error || !product) return <div className="text-center p-5 text-red-500">Error loading product</div>;

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div className="relative">
          <img
            src={product.galleryThumbnails?.[currentImageIndex] || product.thumbnailImage}
            alt={product.title}
            className="rounded-lg w-full max-h-[400px] object-contain"
          />
          <div className="flex justify-center gap-2 mt-4">
            {product.galleryThumbnails?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`h-16 w-16 object-cover rounded-md border-2 ${currentImageIndex === idx ? 'border-blue-500' : 'border-gray-300'}`}
                onClick={() => setCurrentImageIndex(idx)}
              />
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>

          <div className="flex gap-4 mb-4 mt-5">
            {product.priceAmazon && (
              <a href={product.urls?.amazon} target="_blank">
                <img src={amazonLogo} alt="Amazon" className="h-8" />
                <p className="text-sm">{product.priceAmazon} EGP</p>
                <button></button>
              </a>
            )}
            {product.priceJumia && (
              <a href={product.urls?.jumia} target="_blank">
                <img src={jumiaLogo} alt="Jumia" className="h-8" />
                <p className="text-sm">{product.priceJumia} EGP</p>
              </a>
            )}
            {product.urls?.noon && (
              <a href={product.urls?.noon} target="_blank">
                <img src={noonLogo} alt="Noon" className="h-8" />
              </a>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4">
            {showMore ? product.description : `${product.description.slice(0, 250)}...`}
            {product.description.length > 250 && (
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-blue-600 ml-2"
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            )}
          </p>
     
          {/* Features */}
          <ul className="list-disc ml-5 text-sm text-gray-700">
            {product.features?.map((feat, i) => (
              <li key={i}>{feat}</li>
            ))}
          </ul>
        </div>
      </div>
 {/* Recomendations  */}
 <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Recommended Products</h3>
        {loading ? (
          <div className="flex justify-center items-center my-8">
            <Loading />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-6 px-4">
            {recomendationProducts.map((product) => (
              <HomeCard
                key={product._id}
                id={product._id}
                name={product.title}
                image={product.thumbnailImage}
                priceAmazon={product.priceAmazon}
                priceJumia={product.priceJumia}
                priceNoon={product.priceNoon}
                currency={product.currency}
                category={product.category}
              />
            ))}
          </div>
        )}
      </div>
      {/* Attributes */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Specifications</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          {product.attributes?.map((attr) => (
            <div key={attr._id} className="bg-gray-50 p-2 rounded shadow-sm">
              <span className="font-semibold">{attr.key}</span>: {attr.value || "N/A"}
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      {product.productPageReviews?.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
          <div className="space-y-6">
            {product.productPageReviews.map((review) => (
              <div key={review._id} className="border p-4 rounded-md shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  {review.avatar && (
                    <img
                      src={review.avatar}
                      alt={review.username}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{review.username}</p>
                    <p className="text-sm text-gray-500">{review.reviewedIn}</p>
                  </div>
                </div>
                <p className="font-bold">{review.reviewTitle}</p>
                <p className="text-gray-700">{review.reviewDescription}</p>
                <p className="text-yellow-500">Rating: {review.ratingScore}/5</p>
                {review.reviewReaction && (
                  <p className="text-xs text-gray-500 mt-1">{review.reviewReaction}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
