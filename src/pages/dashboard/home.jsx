import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { useGetAllOrderQuery, useGetAllTotalOrderQuery } from "@/Rtk/orderApi";
import io from "socket.io-client";
import LatestOrders from "./CardDesgin/LatestCard";
import BookingCharts from "./CardDesgin/BookingChart";
import HomeCollectionOrders from "./CardDesgin/HomeCollectionOrder";


const socket = io("http://localhost:5000"); // 🔥 Ensure backend URL is correct

const DataCard = ({ title, count, icon, percentage, trend }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64 border border-gray-200 flex flex-col items-center">
      <div className="bg-green-500 p-3 rounded-full text-white text-xl">
        {icon}
      </div>
      <h2 className="text-gray-600 text-sm mt-2">{title}</h2>
      <p className="text-xl font-bold text-gray-900">{count}</p>
      
    </div>
  );
};




export function Home() {


  const { data: initialData, isLoading } = useGetAllTotalOrderQuery();
  const [orders, setOrders] = useState(initialData || []);



  useEffect(() => {
    // Load initial orders
    setOrders(initialData);

    // ✅ Debugging socket connection
    socket.on("connect", () => {
      console.log("🟢 Connected to Socket.io server:", socket.id);
    });

    // ✅ Listen for order updates
    socket.on("todayOrdersSummary", (newOrder) => {
      setOrders(newOrder)
    });

    return () => {
      socket.off("orderUpdated");
    };
  }, [initialData]);







  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {orders &&
          Array.isArray(orders) &&
          orders.map((data, index) => (
            <DataCard key={index} title={data?._id} count={data?.count} />
          ))}
      </div>


      {/* <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3 border border-red-500">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div> */}

      
      <BookingCharts/>



      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3 ">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
        
         <HomeCollectionOrders/>
        </Card>
           <LatestOrders/>
      </div>


    </div>
  );
}

export default Home;
