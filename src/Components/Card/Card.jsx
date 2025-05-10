import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import phone from "../../assets/647786_main.avif";

export function Component() {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate("/details")}
      className="max-w-sm w-full sm:w-3/4 hover:scale-[101%] hover:rotate-[.7deg] transition-transform duration-300 cursor-pointer"
    >
      <img src={phone} alt="iPhone" className="w-1/2 mx-auto" />
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        iPhone 14 Pro Max
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Apple iPhone 16 Pro Max - 1TB - Natural Titanium (Official Warranty)
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log("Compare clicked");
        }}
        className="px-2 py-2 w-1/2 mx-auto bg-cyan-500 text-white rounded-lg font-bold hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 transition-all duration-300 ease-in-out"
      >
        Compare
      </button>
    </Card>
  );
}