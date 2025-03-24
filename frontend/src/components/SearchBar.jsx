import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchPlants } from "../api/fetchPlants";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [showResults, setShowResults] = useState(false); // State to control dropdown visibility
  const searchRef = useRef(null); // Ref to handle click outside

  useEffect(() => {
    const getPlants = async () => {
      try {
        const data = await fetchPlants();
        if (Array.isArray(data)) {
          setPlants(data);
        } else {
          console.error("Data format incorrect:", data);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    getPlants();
  }, []);

  // Filter items based on query
  const filteredItems = plants.filter((plant) =>
    plant.common_name.toLowerCase().includes(query.toLowerCase())
  );

  // Navigate to selected plant
  const handleSearch = (plant) => {
    if (plant) {
      navigate(`/plants/${plant._id}`);
      setQuery(""); // Reset search bar
      setShowResults(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 bg-gray-100 p-2 rounded-full shadow-md relative"
      >
        <motion.input
          type="text"
          placeholder="Search plants..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onKeyDown={(e) => e.key === "Enter" && filteredItems.length > 0 && handleSearch(filteredItems[0])}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          whileFocus={{ scale: 1.02 }}
        />
        <motion.button
          onClick={() => filteredItems.length > 0 && handleSearch(filteredItems[0])}
          className="bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </motion.div>

      {/* Dropdown for search results */}
      {showResults && query && (
        <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
          {filteredItems.length > 0 ? (
            filteredItems.map((plant, index) => (
              <li
                key={index}
                onClick={() => handleSearch(plant)}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {plant.common_name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-red-500">No Plants Found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
