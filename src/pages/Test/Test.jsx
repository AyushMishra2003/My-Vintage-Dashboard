import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { GoogleMap, useJsApiLoader, Marker, Polyline } from "@react-google-maps/api";

// const url="https://dbsanya.drmanasaggarwal.com/"
const url="http://localhost:5000"

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

  useEffect(() => {
    if (!isLoaded || !window.google) return;

    const geocoder = new window.google.maps.Geocoder();

    const getAddress = (lat, lng) => {
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
          setAddress(results[0].formatted_address);
        } else {
          setAddress("Address not found");
        }
      });
    };

    socket.on("connect", () => {
      console.log("🟢 Connected to Socket.io server:", socket.id);
    });

    // socket.on("get-updated-sales-lat-lng", (data) => {
    //   setLat(data.sales_lat)
    //   setLng(data.sales_lng)
    //   if (data?.sales_lat && data?.sales_lng) {
    //     const updatedLocation = {
    //       lat: parseFloat(data.sales_lat),
    //       lng: parseFloat(data.sales_lng),
    //     };
    //     console.log("📩 Location Updated:", updatedLocation);

    //     // Animate Marker Movement
    //     setLocation((prevLocation) => ({
    //       lat: prevLocation.lat + (updatedLocation.lat - prevLocation.lat) * 0.2,
    //       lng: prevLocation.lng + (updatedLocation.lng - prevLocation.lng) * 0.2,
    //     }));

    //     setPath((prevPath) => [...prevPath, updatedLocation]);

    //     getAddress(updatedLocation.lat, updatedLocation.lng);

    //     // Auto-center map on marker
    //     if (map) {
    //       map.panTo(updatedLocation);
    //     }
    //   }
    // });

  //  socket.emit("check-welcome", { message: "Hello from Client!" });
  

  //  socket.on("check-karo", (data)=>{
  //       console.log(data);
        
  //  });

  socket.on("get-updated-sales-lat-lng",(data)=>{
     console.log(data);
     
  })

    const data45={
      orderDetailId:"67e54811d73286831c64b411"
    }

    socket.emit("get-sales-lat-lng", data45);

    return () => {
      // socket.off("get-updated-sales-lat-lng");
      // socket.off("connect");
      socket.off("check-welcome");
    };
  }, [isLoaded, map]);

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={18}
        onLoad={(mapInstance) => setMap(mapInstance)} // Store map instance
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker
          position={location}
          icon={{
            url: "https://cdn-icons-png.flaticon.com/512/5231/5231019.png", // Delivery Boy Icon
            scaledSize: new window.google.maps.Size(60, 60),
            anchor: new window.google.maps.Point(30, 30),
          }}
          animation={window.google.maps.Animation.DROP} // Smooth Drop Animation
        />
        <Polyline
          path={path}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 4,
          }}
        />
      </GoogleMap>
      <div style={{ padding: "10px", fontSize: "18px" }}>
        <strong>Current Address: </strong>{address}
        <strong>Location: </strong>{lat} , {lng}
      </div>
    </div>
  );
};

export default Test;
