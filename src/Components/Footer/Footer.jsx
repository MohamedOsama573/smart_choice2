import { FiPhone, FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Footer() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("❌ You're not logged in. Please login first.");
      return;
    }

    const [firstName, ...lastParts] = form.name.trim().split(" ");
    const lastName = lastParts.join(" ") || "-";

    const body = {
      firstName: firstName || "-",
      lastName,
      email: form.email,
      phone: "01022222222",
      message: form.message
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_BASEURL}api/v1/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `abdelrahman ${token}`
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Message sent successfully!");
        setForm({ name: '', email: '', message: '' });
      } else {
        toast.error("❌ Failed to send: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Error sending message.");
    }
  };


  return (
    <footer className="bg-[#222] text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Smart Choice</h3>
            <p className="text-gray-300 max-w-xs">
              We create digital experiences that matter. Our team is dedicated to bringing your vision to life.
            </p>
            <div className="flex space-x-4 pt-2">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub].map((Icon, idx) => (
                <a key={idx} href="#" className="text-gray-300 hover:text-white transition transform hover:scale-110">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About Us", "Services", "Portfolio", "Careers"].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-300 hover:text-white border-b border-transparent hover:border-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiPhone size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <FiMail size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">contact@example.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <FiMapPin size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Innovation Street, Tech City,<br />
                  CA 94043, United States
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
                required
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 resize-none"
                required
              />
              <button
                type="submit"
                className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-300"
              >
                <FiSend size={16} className="mr-2" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Smart Choice. All rights reserved.
          </p>
          <ul className="flex space-x-6 text-sm mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, idx) => (
              <li key={idx}>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}