export const fetchPlants = async () => {
  try {
    console.log("🌿 Fetching plants from API..."); // ✅ Debugging
    const response = await fetch("https://virtualherbalgarden.onrender.com/api/plants");

    console.log("🔄 API Response:", response); // ✅ Debugging

    if (!response.ok) {
      throw new Error(`Failed to fetch plants: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Fetched Plants:", data); // ✅ Debugging output

    return data;
  } catch (error) {
    console.error("❌ Error fetching plants:", error);
    return [];
  }
};
