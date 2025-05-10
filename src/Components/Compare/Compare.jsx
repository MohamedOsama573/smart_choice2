import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loader/Loading";

export const Compare = () => {
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  // console.log(data);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("compareData"));
    if (!data?.productIds?.length) return;

    const fetchComparison = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_BASEURL}/api/v1/compare`,
          {
            productIds: data.productIds,
            category: data.category || "laptop",
          },
          {
            headers: {
              Authorization: `abdelrahman ${localStorage.getItem("token")}`,
            },
          }
        );
        setResult(response.data);
      } catch (err) {
        console.error("Comparison error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComparison();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <Loading />
      </div>
    );

  if (!result)
    return (
      <div className="text-center py-10">No comparison data available.</div>
    );

  const products = result.data || [];
  const aiResponse = result.aiResponse || {};
  const comparisonTable = aiResponse?.comparisonTable || {};
  const rating = aiResponse?.rating || [];

  // Helper to get score for a product
  const getScore = (id) => rating.find((r) => r.id === id)?.score || 0;
  const bestProductId = rating.reduce((maxId, product) => {
    return getScore(product.id) > getScore(maxId) ? product.id : maxId;
  }, rating[0]?.id);
  const featureKeys = Object.values(comparisonTable)[0]
    ? Object.keys(Object.values(comparisonTable)[0])
    : [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Comparison Results
      </h1>

      {/* Product Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {products.map((product) => {
          const isBest = product.id === bestProductId;

          // Convert prices to numbers for comparison (fallback to Infinity if null/undefined)
          const prices = {
            amazon: Number(product.priceAmazon) || Infinity,
            jumia: Number(product.priceJumia) || Infinity,
            noon: Number(product.priceNoon) || Infinity,
          };

          const minPrice = Math.min(prices.amazon, prices.jumia, prices.noon);

          return (
            <div
              key={product.id}
              className={`bg-white shadow p-4 rounded-lg text-center border-4 ${
                isBest ? "border-green-300" : "border-transparent"
              }`}
            >
              <img
                src={product.thumbnailImage}
                alt={product.title}
                className="h-32 mx-auto object-contain mb-2"
              />
              <h2 className="font-semibold text-sm">{product.title}</h2>
              <p
                className={`mt-2 font-bold ${
                  prices.amazon === minPrice
                    ? "text-green-700 underline"
                    : "text-green-600"
                }`}
              >
                Amazon: {product.priceAmazon} EGP
              </p>
              <p
                className={`font-bold ${
                  prices.jumia === minPrice
                    ? "text-orange-700 underline"
                    : "text-orange-500"
                }`}
              >
                Jumia: {product.priceJumia} EGP
              </p>
              <p
                className={`font-bold ${
                  prices.noon === minPrice
                    ? "text-yellow-500 underline"
                    : "text-yellow-300"
                }`}
              >
                Noon: {product.priceNoon} EGP
              </p>
              <div className="flex justify-center items-center">
                <p className="text-white bg-green-500 w-1/2 rounded-full p-2 mt-1">
                  Score: {getScore(product.id)} /10
                </p>
              </div>
              {isBest && (
                <p className="text-green-700 font-bold mt-2">🏆 Best Choice</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="p-2 border font-bold text-left">Feature</th>
              {products.map((product) => (
                <th
                  key={product.id}
                  className="p-2 border font-bold text-center"
                >
                  <div className="flex flex-col justify-center items-center my-2">
                    <img
                      src={product.thumbnailImage}
                      alt={product.title}
                      className="h-32 mx-auto object-contain mb-2"
                    />{" "}
                    <p>{product.title}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureKeys.map((feature) => (
              <tr key={feature} className="hover:bg-gray-50">
                <td className="p-2 border font-medium">{feature}</td>
                {products.map((product) => {
                const check = typeof product[feature];
                let value;
                
                if (check === "number") {
                  value = product[feature.replace(/\s+/g, "")] || "";
                } else {
                  value = product[feature.toLowerCase().replace(/\s+/g, "")] || "-";
                }
                
                  const highlight =
                    comparisonTable[product.id]?.[feature] === 1;
                  return (
                    <td
                      key={product.id}
                      className={`p-2 border text-center ${
                        highlight ? "font-semibold" : ""
                      }`}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
