/* eslint-disable react/prop-types */
import { useState } from "react";

const osOptions = ["Android 14", "Android 13", "iOS 17", "HarmonyOS"];
const connectivityOptions = ["4G", "5G", "WiFi", "Bluetooth"];
const colorOptions = ["Black", "White", "Blue", "Green", "Red"];
const formFactors = ["Bar", "Foldable", "Slider"];
const gpsOptions = ["True", "False"];
const audioJackOptions = ["3.5 mm", "Type-C", "None"];

const MobileFilterSidebar = ({ filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters || {});

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
  };

  return (
    <div className="w-full lg:w-1/4 bg-white shadow-md rounded p-4 space-y-4">
      <h2 className="text-xl font-semibold">Filter Mobiles</h2>

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

      {/* Connectivity Technology */}
      <div>
        <label className="block font-medium mb-1">Connectivity Technology</label>
        <select
          value={localFilters.connectivityTechnology || ""}
          onChange={(e) => handleChange("connectivityTechnology", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {connectivityOptions.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>

      {/* GPS */}
      <div>
        <label className="block font-medium mb-1">GPS</label>
        <select
          value={localFilters.gps || ""}
          onChange={(e) => handleChange("gps", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {gpsOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Display Colors */}
      <div>
        <label className="block font-medium mb-1">Display Colors</label>
        <input
          type="text"
          placeholder="e.g. DCI-P3"
          value={localFilters.displayColors || ""}
          onChange={(e) => handleChange("displayColors", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Scanner Resolution */}
      <div>
        <label className="block font-medium mb-1">Scanner Resolution</label>
        <input
          type="text"
          placeholder="e.g. 2460 x 1080"
          value={localFilters.scannerResolution || ""}
          onChange={(e) => handleChange("scannerResolution", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Audio Jack */}
      <div>
        <label className="block font-medium mb-1">Audio Jack</label>
        <select
          value={localFilters.audioJack || ""}
          onChange={(e) => handleChange("audioJack", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {audioJackOptions.map((jack) => (
            <option key={jack} value={jack}>
              {jack}
            </option>
          ))}
        </select>
      </div>

      {/* Form Factor */}
      <div>
        <label className="block font-medium mb-1">Form Factor</label>
        <select
          value={localFilters.formFactor || ""}
          onChange={(e) => handleChange("formFactor", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {formFactors.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div>
        <label className="block font-medium mb-1">Color</label>
        <select
          value={localFilters.color || ""}
          onChange={(e) => handleChange("color", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {colorOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Battery Power Rating */}
      <div>
        <label className="block font-medium mb-1">Battery Power Rating</label>
        <input
          type="text"
          placeholder="e.g. 5500mAh"
          value={localFilters.batteryPowerRating || ""}
          onChange={(e) => handleChange("batteryPowerRating", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* What's in the Box */}
      <div>
        <label className="block font-medium mb-1">What is in the Box</label>
        <input
          type="text"
          placeholder="e.g. USB Cable"
          value={localFilters.whatsInTheBox || ""}
          onChange={(e) => handleChange("whatsInTheBox", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Item Weight */}
      <div>
        <label className="block font-medium mb-1">Item Weight</label>
        <input
          type="text"
          placeholder="e.g. 300g"
          value={localFilters.itemWeight || ""}
          onChange={(e) => handleChange("itemWeight", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Item Model Number */}
      <div>
        <label className="block font-medium mb-1">Model Number</label>
        <input
          type="text"
          placeholder="e.g. MZB0JFJEG"
          value={localFilters.itemModelNumber || ""}
          onChange={(e) => handleChange("itemModelNumber", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Shipping Dimensions */}
      <div>
        <label className="block font-medium mb-1">Shipping Dimensions</label>
        <input
          type="text"
          placeholder="e.g. 17.9 x 9.3 x 5.7 cm"
          value={localFilters.shippingDimensions || ""}
          onChange={(e) => handleChange("shippingDimensions", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* User Reviews */}
      <div>
        <label className="block font-medium mb-1">User Reviews</label>
        <input
          type="text"
          placeholder="e.g. 4.4 / 5"
          value={localFilters.userReviews || ""}
          onChange={(e) => handleChange("userReviews", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Apply Filters Button */}
      <div className="pt-4">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-main cursor-pointer text-white font-semibold py-2 px-4 rounded"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default MobileFilterSidebar;
