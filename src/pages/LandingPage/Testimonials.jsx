import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      rating: 5,
      text: 'This site saved me over $200 on my new MacBook Pro! I was about to buy from Amazon when I found a much better deal on Noon through this comparison tool.',
      product: 'MacBook Pro',
      saved: 200
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      rating: 5,
      text: 'I have been using this comparison tool for all my tech purchases. It\'s incredible how much price variation there is across platforms. Found my Samsung Galaxy for $150 less!',
      product: 'Samsung Galaxy S23',
      saved: 150
    },
    {
      id: 3,
      name: 'Jessica Patel',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      rating: 4,
      text: 'Not only did I save money on my headphones, but I also discovered that Jumia had a better warranty policy than the other sites. This comparison really shows you the full picture.',
      product: 'Sony WH-1000XM5',
      saved: 75
    }
  ];

  return (
    <div className="bg-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Smart Shoppers Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join thousands of savvy electronics buyers who have saved money by comparing before purchasing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-md p-8 relative transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <blockquote className="text-gray-600 mb-6">
                {testimonial.text}
              </blockquote>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Product compared:</div>
                <div className="font-medium text-gray-900 mb-2">{testimonial.product}</div>
                <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Saved ${testimonial.saved}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
