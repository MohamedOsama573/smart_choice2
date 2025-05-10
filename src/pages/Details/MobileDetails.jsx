import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import amazonLogo from "../../assets/amazon.png";
import jumiaLogo from "../../assets/jumia.png";
import noonLogo from "../../assets/noon.png";
import axios from "axios";
import HomeCard from "../Home/Home-Components/HomeCard";
import Loading from "../../Components/Loader/Loading";

export default function MobileDetails() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileData, setData] = useState(null);
  const [error, setError] = useState(false);
  const [recomendationProducts, setRecomendationProducts] = useState([]);

  const getRecomendationProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASEURL
        }/api/v1/mobiles/recommend-mobile/${id}`,
        {
          headers: {
            Authorization: `abdelrahman ${token}`,
          },
        }
      );
  
      
      setRecomendationProducts(response.data.recommendMobile);
    } catch (error) {
      setError(error.message || "Error");
    }
  };
  useEffect(() => {
    const getMobileDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASEURL}/api/v1/mobiles/${id}`,
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

    getMobileDetails();
    getRecomendationProducts();
  }, [id]);

  const handleNextImage = () => {
    if (!mobileData?.highResolutionImages?.length) return;
    setCurrentImageIndex((prev) =>
      prev === mobileData.highResolutionImages.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error || !mobileData) return <div className="text-center p-5 text-red-500">Error loading product</div>;

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div className="relative">
          <img
            src={mobileData.highResolutionImages?.[currentImageIndex] || mobileData.thumbnailImage}
            alt={mobileData.title}
            className="rounded-lg w-full max-h-[400px] object-contain"
          />
          <div className="flex justify-center gap-2 mt-4">
            {mobileData.highResolutionImages?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`h-16 w-16 object-cover rounded-md border-2 ${currentImageIndex === idx ? 'border-blue-500' : 'border-gray-300'}`}
                onClick={() => setCurrentImageIndex(idx)}
              />
            ))}
          </div>
          <Button onClick={handleNextImage} className="mt-4">Next Image</Button>
        </div>

        {/* Right: Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {mobileData.brand} - {mobileData.productOverview?.find(item => item.key === "Model Name")?.value}
          </h2>
          <p className="text-gray-600 mb-2">{mobileData.brand}</p>

          {/* Prices and Links */}
          <div className="flex gap-4 mb-4">
            {mobileData.priceAmazon && (
              <a href={mobileData.urls?.amazon} target="_blank">
                <img src={amazonLogo} alt="Amazon" className="h-8" />
                <p className="text-sm">{mobileData.priceAmazon} EGP</p>
              </a>
            )}
            {mobileData.priceJumia && (
              <a href={mobileData.urls?.jumia} target="_blank">
                <img src={jumiaLogo} alt="Jumia" className="h-8" />
                <p className="text-sm">{mobileData.priceJumia} EGP</p>
              </a>
            )}
            {mobileData.priceNoon && (
              <a href={mobileData.urls?.noon} target="_blank">
                <img src={noonLogo} alt="Noon" className="h-8" />
                <p className="text-sm">{mobileData.priceNoon} EGP</p>
              </a>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4">
            {showMore ? mobileData.description : `${mobileData.description?.slice(0, 250)}...`}
            {mobileData.description?.length > 250 && (
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
            {mobileData.features?.map((feat, i) => (
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
          {mobileData.attributes?.map((attr) => (
            <div key={attr._id} className="bg-gray-50 p-2 rounded shadow-sm">
              <span className="font-semibold">{attr.key}</span>: {attr.value || "N/A"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
