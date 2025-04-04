import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { GoogleMap, useJsApiLoader, Marker, Polyline } from "@react-google-maps/api";

const url="https://db.shanyascans.com"
// const url="http://localhost:5000"

const socket = io(url, {
  transports: ["websocket"],
  reconnection: true,
});

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const initialCenter = {
  lat: 28.82163182319635,
  lng: 80.9996193,
};

const Test = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC9ZOZHwHmyTWXqACqpZY2TL7wX2_Zn05U",
  });

  const [location, setLocation] = useState(initialCenter);
  const [address, setAddress] = useState("");
  const [path, setPath] = useState([initialCenter]);
  const [map, setMap] = useState(null); // Store Google Map instance

  const [lat,setLat]=useState("")
  const [lng,setLng]=useState("")

   const [data,setData]=useState("")

  useEffect(() => {


    socket.on("connect", () => {
      console.log("🟢 Connected to Socket.io server:", socket.id);
    });


    return () => {
      socket.off("connect");

    };
  }, []);

  // if (!isLoaded) {
  //   return <div>Loading Map...</div>;
  // }

  return (
    <div>

          <input  className="px-2 py-2 border border-red-500 "  onChange={(e)=>setData(e.target.value)}  value={data} />

    </div>
  );
};

export default Test;
