
import { useSocketTestingMutation } from '@/Rtk/testApi';
import React, { useEffect } from 'react'
import { io } from "socket.io-client";

// 1. Connect to server

const Test = () => {
  const socket = io("http://localhost:5000");

  const [socketTesting] = useSocketTestingMutation()
  const handleClick = () => {
    socket.emit("Don", "Hello Ayush Don ji kaise hai aap");
  }

  const data = {
    "salesPersonId": 123,
    "message": "ayush mishra"
  }

  const handleAao = async () => {
    const response = await socketTesting(data)
  }



  useEffect(() => {
    const salesPersonId = "123"; // Static or dynamic as needed
  
    socket.emit("joinRoom", salesPersonId);
    console.log(`✅ Joined Room: ${salesPersonId}`);
  
    // Private Message Listener
    socket.on("privateMessage", (data) => {
      console.log("📩 Private Message Received:", data);
    });
  
    return () => {
      socket.off("privateMessage"); 
    };
  }, []);

  
  return (
    <div>

      <button onClick={() => handleClick()} className='p-4 border border-red-500'>Click Me</button>

    </div>
  )
}

export default Test