import { useState } from "react";
import { motion } from "framer-motion";

const Herba = () => {
  const [input, setInput] = useState("");  
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      console.log("🟢 Chatbot Response:", data); 

      const botMessage = { text: data.reply || "Koi response nahi mila!", sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("❌ Error fetching chatbot response:", error);
      setMessages((prev) => [...prev, { text: "❌ Error! Try again.", sender: "bot" }]);
    }

    setInput("");
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg relative"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={() => setMessages([])}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">💬 Ask Herba Anything</h2>

        <motion.div 
          className="h-64 overflow-y-auto border p-3 rounded-md mb-4 bg-gray-50 shadow-inner"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {messages.map((msg, i) => (
            <motion.p 
              key={i} 
              className={`mb-2 p-2 rounded-md ${msg.sender === "user" ? "text-right text-white bg-blue-600" : "text-left text-white bg-green-600"}`}
              initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <strong>{msg.sender === "user" ? "You" : "Herba"}:</strong> {msg.text}
            </motion.p>
          ))}
        </motion.div>

        <div className="flex">
          <motion.input
            type="text"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400"
            whileTap={{ scale: 0.9 }}
          >
            Send
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Herba;
