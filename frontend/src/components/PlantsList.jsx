import { useState, useEffect } from "react";
import { fetchPlants } from "../api/fetchPlants";
import PlantCard from "./PlantCard";

const PlantsList = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const getPlants = async () => {
      try {
        const data = await fetchPlants();
        console.log("Fetched Plants:", data); 
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

  return (
    <div className="grid grid-cols-4 gap-4 p-4 mt-10">
      {plants.length === 0 ? (
        <p className="text-center text-gray-500">No plants found</p>
      ) : (
        plants.map((plant) => <PlantCard key={plant._id} plant={plant} />)
      )}
    </div>
  );
};

export default PlantsList;
