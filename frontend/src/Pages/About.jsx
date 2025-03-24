import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="bg-gradient-to-r from-green-100 to-green-300 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading Animation */}
        <motion.h2
          className="text-4xl font-bold text-green-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🌿 About Virtual Herbal Garden
        </motion.h2>

        {/* Description Animation */}
        <motion.p
          className="text-lg text-gray-800 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Our Virtual Herbal Garden is an immersive platform showcasing the diverse range of 
          medicinal plants used in <strong>AYUSH</strong> (Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy).
          Explore <strong>interactive 3D models</strong>, detailed information, and guided virtual tours to understand 
          the power of traditional healing herbs.
        </motion.p>

        {/* Features Section with Animation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {/* Card 1 */}
          <motion.div
            className="p-6 bg-white shadow-lg rounded-xl hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-green-700 mb-2">🌱 Interactive 3D Models</h3>
            <p className="text-gray-600">
              Rotate & explore high-quality 3D models of medicinal plants.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="p-6 bg-white shadow-lg rounded-xl hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-green-700 mb-2">📚 Rich Botanical Details</h3>
            <p className="text-gray-600">
              Learn about habitat, medicinal uses, and traditional applications.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="p-6 bg-white shadow-lg rounded-xl hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-green-700 mb-2">🗺️ Virtual Herbal Tours</h3>
            <p className="text-gray-600">
              Discover themed herbal gardens for health, skin care, and immunity.
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Animation */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <a
            href="/"
            className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Start Exploring 🌿
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
