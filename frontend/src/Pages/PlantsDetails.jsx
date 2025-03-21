import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "@google/model-viewer";

const PlantDetails = () => {
  const { id } = useParams(); // Get plant ID from URL
  const [plant, setPlant] = useState(null);
  
  useEffect(() => {
    const fetchPlantDetails = async () => {
      try {
        const response = await fetch(`https://virtualherbalgarden.onrender.com/api/plants/${id}`);
        const data = await response.json();
        setPlant(data);
      } catch (error) {
        console.error("Error fetching plant details:", error);
      }
    };

    fetchPlantDetails();
  }, [id]);

  if (!plant) return <p className="text-center text-lg font-bold mt-10">Loading...</p>;

  return (
    <motion.div 
      className="flex flex-col md:flex-row p-6 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Left Side: Plant Details */}
      <motion.div 
        className="w-full md:w-1/2"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold mb-4">{plant.common_name} ({plant.botanical_name})</h1>
        <motion.img 
          src={plant.static_image} 
          alt={plant.common_name} 
          className="w-full h-64 object-cover rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <p className="mt-4"><strong>Habitat:</strong> {plant.habitat}</p>
        <p className="mt-2"><strong>Medicinal Uses:</strong> {plant.medicine_uses}</p>
        <p className="mt-2"><strong>Method of Cultivation:</strong> {plant.method_of_cultivation}</p>
      </motion.div>

      {/* Right Side: 3D Model */}
      <motion.div 
        className="w-full md:w-1/2 flex justify-center items-center h-[500px]"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >  
        <model-viewer 
          src={plant.models_image}  
          alt={`3D model of ${plant.common_name}`}  
          auto-rotate  
          camera-controls  
          ar  
          background-color="transparent"  
          shadow-intensity="1"  
          exposure="1.5"  
          scale="5 5 5"  
          camera-orbit="0deg 90deg 1m"  
          field-of-view="30deg" 
          style={{ width: "500px", height: "500px" }} 
        ></model-viewer>  
      </motion.div>
    </motion.div>
  );
};

export default PlantDetails;
