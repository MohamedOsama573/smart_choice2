/* eslint-disable react/prop-types */
import { useState } from "react";

const tabletBrands = ["Samsung", "Apple", "Lenovo", "Huawei", "Microsoft"];
const displaySizes = ["8.7", "10.1", "10.5", "11", "12.4"];
const displayResolutions = [
  "1280 x 800 pixels",
  "1920 x 1200 pixels",
  "2560 x 1600 pixels",
];
const processorBrands = ["Qualcomm", "Apple", "MediaTek", "Intel"];
const memoryOptions = ["2 GB", "4 GB", "6 GB", "8 GB", "12 GB"];
const speakerDescriptions = [
  "Built-in stereo speakers",
  "Quad speakers",
  "Dolby Atmos",
];
const graphicsCoprocessors = [
  "Samsung Integrated Graphics",
  "Apple GPU",
  "Intel UHD",
];
const graphicsChipsetBrands = ["Samsung", "Apple", "Intel"];
const graphicsDescriptions = ["Integrated", "Dedicated"];
const connectivityTypes = ["Wi-Fi", "Cellular", "Wi-Fi + Cellular"];
const wirelessTypes = ["802.11g", "802.11ac", "802.11ax"];
const operatingSystems = ["Android", "iOS", "Windows"];

const TabletFilterSidebar = ({ filters, setFilters }) => {
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

      {/* Brand */}
      <div>
        <label className="block font-medium mb-1">Brand</label>
        <select
          value={localFilters.brand || ""}
          onChange={(e) => handleChange("brand", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {tabletBrands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Manufacturer */}
      <div>
        <label className="block font-medium mb-1">Manufacturer</label>
        <input
          type="text"
          value={localFilters.manufacturer || ""}
          onChange={(e) => handleChange("manufacturer", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="e.g. Samsung"
        />
      </div>

      {/* Color */}
      <div>
        <label className="block font-medium mb-1">Color</label>
        <input
          type="text"
          value={localFilters.color || ""}
          onChange={(e) => handleChange("color", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Display Size */}
      <div>
        <label className="block font-medium mb-1">Display Size (inches)</label>
        <select
          value={localFilters.displaySize || ""}
          onChange={(e) => handleChange("displaySize", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {displaySizes.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Display Resolution */}
      <div>
        <label className="block font-medium mb-1">Display Resolution</label>
        <select
          value={localFilters.displayResolution || ""}
          onChange={(e) => handleChange("displayResolution", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {displayResolutions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Processor Brand */}
      <div>
        <label className="block font-medium mb-1">Processor Brand</label>
        <select
          value={localFilters.processorBrand || ""}
          onChange={(e) => handleChange("processorBrand", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {processorBrands.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Max Supported Memory */}
      <div>
        <label className="block font-medium mb-1">Max Memory</label>
        <select
          value={localFilters.maximumSupportedMemory || ""}
          onChange={(e) =>
            handleChange("maximumSupportedMemory", e.target.value)
          }
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {memoryOptions.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Speaker Description */}
      <div>
        <label className="block font-medium mb-1">Speaker</label>
        <select
          value={localFilters.speakerDescription || ""}
          onChange={(e) =>
            handleChange("speakerDescription", e.target.value)
          }
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {speakerDescriptions.map((s) => (
            <option key={s} value={s}>
              {s}
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

      {/* Graphics Chipset Brand */}
      <div>
        <label className="block font-medium mb-1">Graphics Brand</label>
        <select
          value={localFilters.graphicsChipsetBrand || ""}
          onChange={(e) =>
            handleChange("graphicsChipsetBrand", e.target.value)
          }
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {graphicsChipsetBrands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Graphics Description */}
      <div>
        <label className="block font-medium mb-1">Graphics Type</label>
        <select
          value={localFilters.graphicsCardDescription || ""}
          onChange={(e) =>
            handleChange("graphicsCardDescription", e.target.value)
          }
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {graphicsDescriptions.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Connectivity Type */}
      <div>
        <label className="block font-medium mb-1">Connectivity</label>
        <select
          value={localFilters.connectivityType || ""}
          onChange={(e) => handleChange("connectivityType", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {connectivityTypes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Wireless Type */}
      <div>
        <label className="block font-medium mb-1">Wireless Type</label>
        <select
          value={localFilters.wirelessType || ""}
          onChange={(e) => handleChange("wirelessType", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {wirelessTypes.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      {/* Front Webcam Resolution */}
      <div>
        <label className="block font-medium mb-1">Front Camera</label>
        <input
          type="text"
          value={localFilters.frontWebcamResolution || ""}
          onChange={(e) =>
            handleChange("frontWebcamResolution", e.target.value)
          }
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="e.g. 5 MP"
        />
      </div>

      {/* Operating System */}
      <div>
        <label className="block font-medium mb-1">OS</label>
        <select
          value={localFilters.operatingSystem || ""}
          onChange={(e) => handleChange("operatingSystem", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          {operatingSystems.map((os) => (
            <option key={os} value={os}>
              {os}
            </option>
          ))}
        </select>
      </div>

      {/* Battery Charging Time */}
      <div>
        <label className="block font-medium mb-1">Charging Time (hrs)</label>
        <input
          type="number"
          value={localFilters.batteryChargingTime || ""}
          onChange={(e) =>
            handleChange("batteryChargingTime", e.target.value)
          }
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="e.g. 2.5"
          step="0.1"
        />
      </div>

      {/* Item Weight */}
      <div>
        <label className="block font-medium mb-1">Weight (g)</label>
        <input
          type="number"
          value={localFilters.itemWeight || ""}
          onChange={(e) => handleChange("itemWeight", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Max Price */}
      <div>
        <label className="block font-medium mb-1">Max Price</label>
        <input
          type="number"
          min="0"
          placeholder="e.g. 800"
          value={localFilters.maxPrice || ""}
          onChange={(e) => handleChange("maxPrice", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Apply Filters Button */}
      <div className="pt-4">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-main text-white font-semibold py-2 px-4 rounded"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default TabletFilterSidebar;
