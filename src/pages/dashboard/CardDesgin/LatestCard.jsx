import { useEffect, useState } from "react";
import { useGetAllLatestQuery } from "@/Rtk/orderApi";
import { FaClipboardList } from "react-icons/fa";
import io from "socket.io-client";

const LatestOrders = () => {
  const { data, isLoading, refetch } = useGetAllLatestQuery(); // Always declared at top level
  const [visibleCount, setVisibleCount] = useState(10);

  const orders = data?.slice(0, visibleCount) || []; // Ensure this is not conditional

  useEffect(() => {
    const socket = io("https://db.shanyascans.com");

    socket.on("connect", () => {
      console.log("🟢 Connected to Socket.io server:", socket.id);
    });

    // Refetch data when a new order is placed
    socket.on("orderPlaced", () => {
      refetch(); // No async/await to avoid unexpected re-renders
    });

    // Cleanup to avoid memory leaks
    return () => {
      socket.off("orderPlaced");
      socket.off("connect");
      socket.disconnect();
    };
  }, []); // Dependency array should stay empty

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-full border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">LATEST ORDERS (1HOUR)</h2>

      <div className="mt-4 relative">
        {orders.map((order, index) => (
          <div key={index} className="flex items-start gap-3 relative">
            {index !== 0 && (
              <div className="absolute left-2 top-0 h-5 w-0.5 bg-gray-300" />
            )}

            <div className="text-gray-600 bg-gray-100 p-2 rounded-full text-lg">
              <FaClipboardList />
            </div>

            <div>
              <p className="text-gray-700 text-sm font-medium">
                {order.orderName}
              </p>
              <p className="text-xs text-gray-500">{order.orderType}</p>
              <p className="text-xs text-gray-500">
                ₹{order.orderPrice} - {new Date(order.bookingDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {data?.length > visibleCount && (
        <button
          onClick={() => setVisibleCount(visibleCount + 10)}
          className="mt-3 text-blue-600 text-sm hover:underline w-full text-center"
        >
          View More
        </button>
      )}
    </div>
  );
};

export default LatestOrders;
