import { FaShieldAlt, FaTruck, FaCreditCard, FaGift } from 'react-icons/fa';

const PlatformBenefits = () => {
  const platforms = [
    {
      name: 'Amazon',
      logo: 'A',
      color: 'bg-yellow-500',
      benefits: [
        { icon: <FaShieldAlt className="h-5 w-5" />, text: 'Reliable customer reviews' },
        { icon: <FaTruck className="h-5 w-5" />, text: 'Fast Prime shipping' },
        { icon: <FaCreditCard className="h-5 w-5" />, text: 'Secure payment methods' }
      ]
    },
    {
      name: 'Noon',
      logo: 'N',
      color: 'bg-blue-500',
      benefits: [
        { icon: <FaShieldAlt className="h-5 w-5" />, text: 'Local warranty support' },
        { icon: <FaTruck className="h-5 w-5" />, text: 'Free next-day delivery' },
        { icon: <FaGift className="h-5 w-5" />, text: 'Noon club membership benefits' }
      ]
    },
    {
      name: 'Jumia',
      logo: 'J',
      color: 'bg-green-500',
      benefits: [
        { icon: <FaShieldAlt className="h-5 w-5" />, text: 'Buyer protection policy' },
        { icon: <FaCreditCard className="h-5 w-5" />, text: 'Flexible payment options' },
        { icon: <FaGift className="h-5 w-5" />, text: 'Regular flash sales and deals' }
      ]
    }
  ];

  return (
    <div className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Compare Across Platforms?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Each platform offers unique benefits. We help you find the perfect balance of price and perks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-8 transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <div
                  className={`${platform.color} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold`}
                >
                  {platform.logo}
                </div>
                <h3 className="ml-4 text-2xl font-bold text-gray-900">{platform.name}</h3>
              </div>

              <ul className="space-y-5">
                {platform.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="flex-shrink-0 text-blue-600">
                      {benefit.icon}
                    </div>
                    <span className="ml-3 text-gray-600">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformBenefits;
