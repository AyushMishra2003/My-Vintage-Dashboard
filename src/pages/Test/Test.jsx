import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Howl } from "howler";
import notificationSound from '/notify.mp3'
// ✅ Server ka socket connection
const socket = io("http://localhost:5000"); // Change this to your server URL if needed

const Test = () => {
  const [tag, setTag] = useState(0);
  const [messages, setMessages] = useState([]);

    // 🔥 Load Notification Sound
    const sound = new Howl({
        src: [notificationSound],
        volume: 1.0,
      });

  // ✅ API call to fetch messages
  const fetchMessages = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/message");
      setTag(data.tag); // Tag update
      setMessages(data.messages); // Messages update
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages(); // Initial load

    // ✅ Listen for real-time tag updates
    socket.on("updateTag", (newTag) => {
      console.log("🔄 Real-time Tag Update:", newTag);
      setTag(newTag);
    });

    sound.play();

    return () => {
      socket.off("updateTag"); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="p-5 bg-gray-100">
      <h1 className="text-xl font-bold mb-3">📢 Real-time Message Testing</h1>
      
      {/* ✅ Show Tag Count */}
      <p className="mb-2">🔥 Tag Count: <span className="text-red-500 font-bold">{tag}</span></p>
      
      {/* ✅ Show Messages */}
      <div className="border p-3 rounded-md bg-white shadow-md">
        <h2 className="font-semibold">📩 Messages:</h2>
        {messages.length > 0 ? (
          <ul className="list-disc pl-5">
            {messages.map((msg, index) => (
              <li key={index} className="mt-1">{msg}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No messages yet.</p>
        )}
      </div>
    </div>
  );
};

export default Test;
