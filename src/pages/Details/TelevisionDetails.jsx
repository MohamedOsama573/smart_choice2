import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import amazonLogo from "../../assets/amazon.png";
import jumiaLogo from "../../assets/jumia.png";
import noonLogo from "../../assets/noon.png";
import { Button } from "flowbite-react";
import HomeCard from "../Home/Home-Components/HomeCard";
import Loading from "../../Components/Loader/Loading";

function TelevisionDetails() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [televisionData, setData] = useState(null);
  const [error, setError] = useState(false);
  const [recomendationProducts, setRecomendationProducts] = useState([]);
  const getRecomendationProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASEURL
        }/api/v1/televisions/recommend-television/${id}`,
        {
          headers: {
            Authorization: `abdelrahman ${token}`,
          },
        }
      );

      setRecomendationProducts(response.data.recommendTelevision);
    } catch (error) {
      setError(error.message || "Error");
    }
  };
  const getTelevisionDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASEURL
        }/api/v1/televisions/amazon-television/${id}`,
        {
          headers: {
            Authorization: `abdelrahman ${token}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTelevisionDetails();
    getRecomendationProducts();
  }, [id]);

  const handleNextImage = () => {
    if (!televisionData?.highResolutionImages?.length) return;
    setCurrentImageIndex((prev) =>
      prev === televisionData.highResolutionImages.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error || !televisionData)
    return (
      <div className="text-center p-5 text-red-500">Error loading product</div>
    );

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div className="relative">
          <img
            src={
              televisionData.highResolutionImages?.[currentImageIndex] ||
              televisionData.thumbnailImage
            }
            alt={televisionData.title}
            className="rounded-lg w-full max-h-[400px] object-contain"
          />
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {televisionData.highResolutionImages?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`h-16 w-16 object-cover rounded-md border-2 cursor-pointer ${
                  currentImageIndex === idx
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setCurrentImageIndex(idx)}
              />
            ))}
          </div>
          <Button onClick={handleNextImage} className="mt-4">
            Next Image
          </Button>
        </div>

        {/* Right: Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{televisionData.title}</h2>
          <div className="flex items-center mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-2">
              {televisionData.stars} ★
            </span>
            <span className="text-gray-600 text-sm">
              ({televisionData.reviewsCount} reviews)
            </span>
          </div>

          {/* Prices and Links */}
          <div className="flex gap-4 mb-4 flex-wrap">
            {televisionData.priceAmazon && (
              <a
                href={televisionData.urls?.amazon}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center"
              >
                <img src={amazonLogo} alt="Amazon" className="h-8 mx-auto" />
                <p className="text-sm">{televisionData.priceAmazon} EGP</p>
              </a>
            )}
            {televisionData.priceJumia && (
              <a
                href={televisionData.urls?.jumia}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center"
              >
                <img src={jumiaLogo} alt="Jumia" className="h-8 mx-auto" />
                <p className="text-sm">{televisionData.priceJumia} EGP</p>
              </a>
            )}
            {televisionData.priceNoon && (
              <a
                href={televisionData.urls?.noon}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center"
              >
                <img src={noonLogo} alt="Noon" className="h-8 mx-auto" />
                <p className="text-sm">{televisionData.priceNoon} EGP</p>
              </a>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4">
            {showMore
              ? televisionData.description
              : `${televisionData.description?.slice(0, 250)}...`}
            {televisionData.description?.length > 250 && (
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-blue-600 ml-2"
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            )}
          </p>

          {/* Key Features */}
          <h3 className="font-semibold mb-2">Key Features:</h3>
          <ul className="list-disc ml-5 text-sm text-gray-700 mb-4">
            {televisionData.features?.map((feat, i) => (
              <li key={i}>{feat}</li>
            ))}
          </ul>
        
          {/* Product Overview */}
          <h3 className="font-semibold mb-2">Product Overview:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            {televisionData.productOverview?.map((item) => (
              <div key={item._id}>
                <span className="font-medium">{item.key}:</span> {item.value}
              </div>
            ))}
          </div>
        </div>
      </div>
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
      {/* Reviews Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
        <div className="space-y-4">
          {televisionData.productPageReviews?.map((review) => (
            <div key={review._id} className="border-b pb-4">
              <div className="flex items-center mb-2">
                {review.avatar && (
                  <img
                    src={review.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <div>
                  <p className="font-medium">{review.username}</p>
                  <div className="flex items-center">
                    <span className="text-yellow-400">
                      {"★".repeat(review.ratingScore)}
                    </span>
                    <span className="text-gray-400 ml-1">
                      {"★".repeat(5 - review.ratingScore)}
                    </span>
                  </div>
                </div>
              </div>
              <h4 className="font-semibold">{review.reviewTitle}</h4>
              <p className="text-gray-700">{review.reviewDescription}</p>
              <p className="text-gray-500 text-sm mt-1">{review.reviewedIn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Specifications</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          {televisionData.attributes?.map((attr) => (
            <div key={attr._id} className="bg-gray-50 p-2 rounded shadow-sm">
              <span className="font-semibold">{attr.key}</span>:{" "}
              {attr.value || "N/A"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TelevisionDetails;
