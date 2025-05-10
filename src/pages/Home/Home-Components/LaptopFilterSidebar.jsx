/* eslint-disable react/prop-types */
import { useState } from "react";

const ramOptions = ["4 GB", "8 GB", "16 GB", "32 GB"];
const screenSizes = ["13.3", "14", "15.6", "16", "17"];
const processorTypes = [
  "Core i3",
  "Core i5",
  "Core i7",
  "Core i9",
  "Ryzen 5",
  "Ryzen 7",
];
const osOptions = ["Windows", "Mac OS", "Linux", "ChromeOS"];
const storageOptions = ["256 GB", "512 GB", "1 TB", "2 TB"];
const brands = ["HP", "Dell", "MSI", "Lenovo", "Asus", "Acer", "Apple"];
const graphicsDescriptions = ["Integrated", "Dedicated"];
const graphicsCoprocessors = [
  "Intel Iris",
  "Intel UHD",
  "NVIDIA GeForce",
  "AMD Radeon",
];

const LaptopFilterSidebar = ({ filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters || {});

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
  };

  return (
    <div className="w-full lg:w-1/4 bg-white shadow-md rounded p-4 space-y-4">
      <h2 className="text-xl font-semibold">Filter Laptops</h2>

      {/* Search */}
      <div>
        <label className="block font-medium mb-1">Search</label>
        <input
          type="text"
          value={localFilters.search || ""}
          onChange={(e) => handleChange("search", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Search"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium mb-1">Category</label>
        <select
          value={localFilters.category || ""}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          <option value="Laptop">Laptop</option>
        </select>
      </div>

      {/* Availability */}
      <div>
        <label className="block font-medium mb-1">Availability</label>
        <select
          value={
            localFilters.inStock === true
              ? "true"
              : localFilters.inStock === false
              ? "false"
              : ""
          }
          onChange={(e) => handleChange("inStock", e.target.value === "true")}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="block font-medium mb-1">Brand</label>
        <select
          value={localFilters.brand || ""}
          onChange={(e) => handleChange("brand", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Processor Type */}
      <div>
        <label className="block font-medium mb-1">Processor Type</label>
        <select
          value={localFilters.processorType || ""}
          onChange={(e) => handleChange("processorType", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {processorTypes.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* RAM Size */}
      <div>
        <label className="block font-medium mb-1">RAM Size</label>
        <select
          value={localFilters.ramSize || ""}
          onChange={(e) => handleChange("ramSize", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {ramOptions.map((ram) => (
            <option key={ram} value={ram}>
              {ram}
            </option>
          ))}
        </select>
      </div>

      {/* Screen Size */}
      <div>
        <label className="block font-medium mb-1">Screen Size (inches)</label>
        <select
          value={localFilters.screenSize || ""}
          onChange={(e) => handleChange("screenSize", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {screenSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Graphics Coprocessor */}
      <div>
        <label className="block font-medium mb-1">Graphics Coprocessor</label>
        <select
          value={localFilters.graphicsCoprocessor || ""}
          onChange={(e) => handleChange("graphicsCoprocessor", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {graphicsCoprocessors.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Graphics Description */}
      <div>
        <label className="block font-medium mb-1">Graphics Description</label>
        <select
          value={localFilters.graphicsCardDescription || ""}
          onChange={(e) =>
            handleChange("graphicsCardDescription", e.target.value)
          }
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {graphicsDescriptions.map((desc) => (
            <option key={desc} value={desc}>
              {desc}
            </option>
          ))}
        </select>
      </div>

      {/* Operating System */}
      <div>
        <label className="block font-medium mb-1">Operating System</label>
        <select
          value={localFilters.operatingSystem || ""}
          onChange={(e) => handleChange("operatingSystem", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {osOptions.map((os) => (
            <option key={os} value={os}>
              {os}
            </option>
          ))}
        </select>
      </div>

      {/* Internal Storage */}
      <div>
        <label className="block font-medium mb-1">Internal Storage</label>
        <select
          value={localFilters.internalStorage || ""}
          onChange={(e) => handleChange("internalStorage", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {storageOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Battery Life */}
      <div>
        <label className="block font-medium mb-1">Battery Life (hrs)</label>
        <input
          type="number"
          min="1"
          placeholder="e.g. 8"
          value={localFilters.batteryLife || ""}
          onChange={(e) => handleChange("batteryLife", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Series */}
      <div>
        <label className="block font-medium mb-1">Series</label>
        <input
          type="text"
          value={localFilters.series || ""}
          onChange={(e) => handleChange("series", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Series name"
        />
      </div>
      {/* Max Price */}
      <div>
        <label className="block font-medium mb-1">Max Price</label>
        <input
          type="number"
          min="0"
          placeholder="e.g. 2000"
          value={localFilters.maxPrice || ""}
          onChange={(e) => handleChange("maxPrice", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Apply Filters Button */}
      <div className="pt-4">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-main cursor-pointer  text-white font-semibold py-2 px-4 rounded"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default LaptopFilterSidebar;
