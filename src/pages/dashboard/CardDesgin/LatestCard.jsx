import { useState } from "react";
import { useGetAllLatestQuery } from "@/Rtk/orderApi";
import { FaClipboardList } from "react-icons/fa";

const LatestOrders = () => {
  const { data, isLoading } = useGetAllLatestQuery();
  const [visibleCount, setVisibleCount] = useState(10); // Show 10 items initially

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  const orders = data?.slice(0, visibleCount) || []; // Slice data for pagination

  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-full border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">LATEST ORDERS</h2>


      <div className="mt-4 relative">
        {orders.map((order, index) => (
          <div key={index} className="flex items-start gap-3 relative">
            {/* Timeline line */}
            {index !== 0 && <div className="absolute left-2 top-0 h-5 w-0.5 bg-gray-300" />}

            {/* Icon */}
            <div className="text-gray-600 bg-gray-100 p-2 rounded-full text-lg">
              <FaClipboardList />
            </div>

            {/* Order details */}
            <div>
              <p className="text-gray-700 text-sm font-medium">{order.orderName}</p>
              <p className="text-xs text-gray-500">{order.orderType}</p>
              <p className="text-xs text-gray-500">₹{order.orderPrice} - {new Date(order.bookingDate).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
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
