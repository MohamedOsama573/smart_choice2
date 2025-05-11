import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { getAmazonLaptops } from "../../../Redux/Services/Products/getLaptopsProducts";
import { getPhoneProducts } from "../../../Redux/Services/Products/getPhoneProducts";
import { getAllTablets } from "../../../Redux/Services/Products/getTabletProducts";
import { getTelevisionProducts } from "../../../Redux/Services/Products/getTelevisionProducts";

function SearchBar() {
  const dispatch = useDispatch();

  const [category, setCategory] = useState("laptop");
  const [filterType, setFilterType] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const filters = {
      [filterType]: searchTerm,
    };

    let action;
    switch (category) {
      case "laptop":
        action = await dispatch(
          getAmazonLaptops({ page: 1, limit: 50, filters })
        );
        break;
      case "mobile":
        action = await dispatch(
          getPhoneProducts({ page: 1, limit: 50, filters })
        );
        break;
      case "tablet":
        action = await dispatch(getAllTablets({ page: 1, limit: 50, filters }));
        break;
      case "television":
        action = await dispatch(
          getTelevisionProducts({ page: 1, limit: 50, filters })
        );
        break;
      default:
        return;
    }

    if (action?.payload?.data) {
      setResults(action.payload.data);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="mx-4">
      <div className="bg-gray-50 border text-black border-blue-200 rounded-xl flex items-center gap-2 p-1">
        {/* Category Dropdown */}
        <select
          className="p-1 rounded border border-gray-300"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="laptop">Laptop</option>
          <option value="mobile">Mobile</option>
          <option value="tablet">Tablet</option>
          <option value="television">Television</option>
        </select>

        {/* Filter Type Dropdown */}
        <select
          className="p-1 rounded border border-gray-300"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="brand">Brand</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder={`Search by ${filterType}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-black p-2 border-gray-300 rounded outline-none"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-main text-white p-2 rounded cursor-pointer"
        >
          <IoSearchOutline size={20} />
        </button>
      </div>

      {/* Results List directly below input */}
      {/* <div className="w-full mt-2 bg-white rounded-md border border-gray-200 shadow max-h-[400px] overflow-y-auto">
        {results.map((item, index) => (
          <div
            key={item.id || index}
            className="flex items-center gap-4 p-3 border-b last:border-b-0 hover:bg-gray-50"
          >

            <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-contain w-full h-full"
                />
              ) : (
                <span className="text-gray-400 text-xs">No Image</span>
              )}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
                {item.title || "No title"}
              </h4>
              <p className="text-xs text-gray-500">
                {item.brand || "No brand"}
              </p>
              {item.price && (
                <p className="text-sm font-bold text-blue-600">${item.price}</p>
              )}
            </div>
          </div>
        ))}
        )
      </div> */}
    </div>
  );
}

export default SearchBar;
