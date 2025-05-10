/* eslint-disable react/prop-types */
import { useState } from "react";

const filterOptions = {
  brandName: ["Samsung", "Apple", "Lenovo", "Huawei", "Microsoft"],
  displaySize: ["8.7", "10.1", "10.5", "11", "12.4"],
  displayResolution: ["1280 x 800 pixels", "1920 x 1200 pixels", "2560 x 1600 pixels"],
  processorBrand: ["Qualcomm", "Apple", "MediaTek", "Intel"],
  maximumSupportedMemory: ["2 GB", "4 GB", "6 GB", "8 GB", "12 GB"],
  speakerDescription: ["Built-in stereo speakers", "Quad speakers", "Dolby Atmos"],
  graphicsCoprocessor: ["Samsung Integrated Graphics", "Apple GPU", "Intel UHD"],
  graphicsChipsetBrand: ["Samsung", "Apple", "Intel"],
  graphicsCardDescription: ["Integrated", "Dedicated"],
  connectivityType: ["Wi-Fi", "Cellular", "Wi-Fi + Cellular"],
  wirelessType: ["802.11g", "802.11ac", "802.11ax"],
  operatingSystem: ["Android", "iOS", "Windows"],
};

const inputFields = [
  { key: "search", label: "Search", placeholder: "Search" },
  { key: "manufacturer", label: "Manufacturer", placeholder: "e.g. Samsung" },
  { key: "color", label: "Color" },
  { key: "frontWebcamResolution", label: "Front Camera", placeholder: "e.g. 5 MP" },
];

const TelevisionFilterSidebar = ({ filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters || {});

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
  };

  return (
    <div className="w-full lg:w-1/4 bg-white shadow-md rounded p-4 space-y-4">
      <h2 className="text-xl font-semibold">Filter Tablets</h2>

      {/* Text Inputs */}
      {inputFields.map(({ key, label, placeholder }) => (
        <div key={key}>
          <label className="block font-medium mb-1">{label}</label>
          <input
            type="text"
            value={localFilters[key] || ""}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      ))}

      {/* Select Dropdowns */}
      {Object.entries(filterOptions).map(([key, options]) => (
        <div key={key}>
          <label className="block font-medium mb-1 capitalize">
            {key.replace(/([A-Z])/g, " $1")}
          </label>
          <select
            value={localFilters[key] || ""}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Apply Button */}
      <button
        onClick={handleApplyFilters}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default TelevisionFilterSidebar;
