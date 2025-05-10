import { FaSearch, FaChartLine, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg')] bg-cover bg-center opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="text-center md:text-left md:max-w-2xl lg:max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
            <span className="block">Compare Electronics.</span>
            <span className="block text-blue-200">Save Smart.</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Find the best deals across Noon, Amazon, and Jumia in one place. 
            Compare prices, features, and reviews instantly.
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row sm:justify-center md:justify-start mt-8">
            <Link to={'/products'} className="bg-white text-blue-700 hover:bg-blue-50 transition-colors duration-200 font-medium rounded-full px-8 py-4 text-lg shadow-lg flex items-center justify-center">
              <FaSearch className="mr-2 h-5 w-5" />
              Start Comparing
            </Link>
            <button className="bg-transparent hover:bg-blue-700 border-2 border-white text-white transition-colors duration-200 font-medium rounded-full px-8 py-4 text-lg flex items-center justify-center">
              <FaChartLine className="mr-2 h-5 w-5" />
              See Price Trends
            </button>
          </div>
          
          <div className="mt-12 text-center md:text-left">
            <p className="inline-flex items-center text-blue-100 text-lg">
              <FaShoppingCart className="mr-2 h-5 w-5" />
              <span>Trusted by over 50,000 smart shoppers</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-16 right-0 left-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-gray-50 fill-current w-full h-full">
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
}

export default Hero;