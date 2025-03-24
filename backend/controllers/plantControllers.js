const Plant = require("../models/Plant");

// Get All Plants
exports.getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    // console.log("All Plants from DB:", plants); //  Debug output
    res.json(plants);
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).json({ message: "Error fetching plants" });
  }
};

// Get Single Plant
exports.getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: "Error fetching plant" });
  }
};

exports.searchPlants = async (req, res) => {
  try {
    const { query } = req.query;
    console.log("📢 Step 1: Received Query =", query);  // ✅ Check kar raha hai ki query aa rahi hai ya nahi

    if (!query || query.trim() === "") {
      console.log("❌ Step 2: Query is empty!");
      return res.status(400).json({ message: "❌ Search query is required" });
    }

    const searchQuery = query.trim();
    console.log("🔍 Step 3: Cleaned Query =", searchQuery);

    const plants = await Plant.find({
      $or: [
        { botanical_name: { $regex: new RegExp(searchQuery, "i") } },
        { common_name: { $regex: new RegExp(searchQuery, "i") } }
      ]
    });

    console.log("🌿 Step 4: Matching Plants Found =", plants);

    if (plants.length === 0) {
      console.log("❌ Step 5: No Plants Found!");
      return res.status(404).json({ message: "❌ Plant not found in database!" });
    }

    console.log("✅ Step 6: Sending Response to Frontend");
    res.json(plants);
  } catch (error) {
    console.error("❌ Step 7: Search Error =", error);
    res.status(500).json({ message: "⚠️ Search failed!", error });
  }
};

