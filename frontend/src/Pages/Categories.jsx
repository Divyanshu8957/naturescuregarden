import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLeaf, FaSpa, FaHandHoldingHeart, FaMortarPestle, FaPrayingHands } from "react-icons/fa";

const categories = [
  { 
    name: "Ayurveda", 
    icon: <FaLeaf className="text-green-500 text-4xl" />, 
    description: "Ancient herbal medicine for holistic healing.",
    fullDescription: "Ayurveda is an ancient Indian healing system that emphasizes balance in bodily systems using diet, herbal treatment, and yogic breathing.",
    image: "/images/yoga.avif"
  },
  { 
    name: "Yoga & Naturopathy", 
    icon: <FaSpa className="text-blue-500 text-4xl" />, 
    description: "Natural therapies and yoga for wellness.",
    fullDescription: "Yoga & Naturopathy focus on using natural therapies, yoga, and meditation to promote holistic wellness and detoxification.",
    image: "/images/neuro.jpeg"
  },
  { 
    name: "Unani", 
    icon: <FaHandHoldingHeart className="text-orange-500 text-4xl" />, 
    description: "Traditional healing based on natural elements.",
    fullDescription: "Unani medicine is based on Greek-Arabic healing principles, using herbal medicines and lifestyle changes for treating illnesses.",
    image: "/images/unani.webp"
  },
  { 
    name: "Siddha", 
    icon: <FaMortarPestle className="text-purple-500 text-4xl" />, 
    description: "An ancient South Indian healing system.",
    fullDescription: "Siddha is one of the oldest medicinal systems originating from Tamil Nadu, focusing on herbs, minerals, and spiritual healing.",
    image: "images/siddha.jpg"
  },
  { 
    name: "Homeopathy", 
    icon: <FaPrayingHands className="text-yellow-500 text-4xl" />, 
    description: "Healing with natural diluted substances.",
    fullDescription: "Homeopathy is a medical system that uses highly diluted natural substances to treat ailments based on the principle of 'like cures like'.",
    image: "images/homeo.jpg"
  },
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section className="py-12 bg-gradient-to-b from-green-100 to-green-300">
      <div className="text-center mb-8">
        <motion.h2 
          className="text-4xl font-extrabold text-green-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Herbal Categories
        </motion.h2>
        <p className="text-gray-700 mt-2">Discover the diverse systems of herbal medicine</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white shadow-lg rounded-2xl border border-green-300 flex flex-col items-center text-center transition duration-300 hover:shadow-2xl cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: "0px 5px 20px rgba(34, 197, 94, 0.5)" }}
            onClick={() => setSelectedCategory(category)}
          >
            {category.icon}
            <h3 className="text-xl font-bold mt-4 text-green-800">{category.name}</h3>
            <p className="text-gray-600 mt-2">{category.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Modal for Category Details */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg max-w-lg text-center relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <img src={selectedCategory.image} alt={selectedCategory.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-2xl font-bold text-green-800">{selectedCategory.name}</h2>
              <p className="text-gray-700 mt-2">{selectedCategory.fullDescription}</p>
              <motion.button 
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedCategory(null)}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Categories;
