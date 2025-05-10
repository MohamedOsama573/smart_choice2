import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { getAmazonLaptops } from "../../../Redux/Services/Products/getLaptopsProducts";
import { getPhoneProducts } from "../../../Redux/Services/Products/getPhoneProducts";
import { getAllTablets } from "../../../Redux/Services/Products/getTabletProducts";
import { getTelevisionProducts } from "../../../Redux/Services/Products/getTelevisionProducts";

import HomeCard from "./Home-Components/HomeCard";
import Loading from "../../Components/Loader/Loading";

import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import LaptopFilterSidebar from "./Home-Components/LaptopFilterSidebar";
import TabletFilterSidebar from "./Home-Components/TabletFilterSidebar";
import MobileFilterSidebar from "./Home-Components/MobileFilterSidebar";
import TelevisionFilterSidebar from "./Home-Components/TelevisionFilterSidebar";

export const Home = () => {
  const dispatch = useDispatch();
  const {
    AmazonLaptopsProducts,
    phoneProducts,
    tabletesProducts,
    televisionProducts,
    ProductsLoading,
    ProductError,
  } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedSource, setSelectedSource] = useState("amazonLaptops");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const limit = 10;
  const [filters, setFilters] = useState({});

  const handleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    switch (selectedSource) {
      case "amazonLaptops":
        dispatch(getAmazonLaptops({ page, limit, filters }));
        break;
      case "phones":
        dispatch(getPhoneProducts({ page, limit , filters }));
        break;
      case "tablets":
        dispatch(getAllTablets({ page, limit ,filters }));
        break;
      case "televisions":
        dispatch(getTelevisionProducts({ page, limit,filters }));
        break;
      default:
        break;
    }
  }, [dispatch, page, selectedSource, filters]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => page > 1 && setPage((prev) => prev - 1);

  const productsToRender =
    selectedSource === "amazonLaptops"
      ? AmazonLaptopsProducts
      : selectedSource === "phones"
      ? phoneProducts
      : selectedSource === "tablets"
      ? tabletesProducts
      : selectedSource === "televisions"
      ? televisionProducts
      : [];

  return (
    <>
      <div className="py-14 bg-gray-100 ">
        {/* Category Buttons */}
        <div className="flex justify-center items-center lg:px-6 px-2">
          <div className="flex justify-center gap-4 flex-wrap mt-4  p-2 lg:w-1/2 w-full rounded-md">
            {[
              { label: "Laptops", value: "amazonLaptops" },
              { label: "Phones", value: "phones" },
              { label: "Tablets", value: "tablets" },
              { label: "Televisions", value: "televisions" },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => {
                  setSelectedSource(value);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded cursor-pointer ${
                  selectedSource === value
                    ? "bg-black text-white"
                    : "bg-white border border-[#333]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Section */}
        {ProductsLoading ? (
          <div className="flex justify-center items-center my-4">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 px-4">
            {selectedSource === "amazonLaptops" ? (
              <LaptopFilterSidebar filters={filters} setFilters={setFilters} />
            ) : selectedSource === "tablets" ? (
              <TabletFilterSidebar filters={filters} setFilters={setFilters}/>
            ) : selectedSource === "phones" ?(
              <MobileFilterSidebar filters={filters} setFilters={setFilters} />
            ):(
              <TelevisionFilterSidebar filters={filters} setFilters={setFilters} />
            )}

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6  items-start  ">
              {productsToRender.map((product) => (
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
                  selected={selectedProducts.includes(product._id)}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {ProductError && (
          <p className="text-center text-red-500 mt-4">{ProductError}</p>
        )}

        {/* Compare Button */}
        {selectedProducts.length >= 2 && (
          <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-[#333]  text-white px-6 py-3 rounded shadow-lg z-50">
            <button
              onClick={() => {
                sessionStorage.setItem(
                  "compareData",
                  JSON.stringify({
                    productIds: selectedProducts,
                    category:
                      selectedSource === "amazonLaptops"
                        ? "Laptop"
                        : selectedSource === "phones"
                        ? "Mobile"
                        : selectedSource === "tablets"
                        ? "Tablet"
                        : "Television",
                  })
                );
                navigate("/compare");
              }}
              className="cursor-pointer"
            >
              Compare {selectedProducts.length} Products
            </button>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-4 my-8">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="bg-[#333] px-4 py-2 rounded disabled:opacity-50"
          >
            <GrFormPrevious />
          </button>
          <span className="flex items-center">{`Page ${page}`}</span>
          <button
            onClick={handleNextPage}
            className="bg-[#333] text-white px-4 py-2 rounded"
          >
            <MdNavigateNext />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
