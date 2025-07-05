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


const socket = io("https://db.shanyascans.com"); // 

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


  // const { data: initialData, isLoading,refetch } = useGetAllTotalOrderQuery();
  const [orders, setOrders] = useState([]);
 const socket = io("https://db.shanyascans.com");
//  const socket = io("https://dbsanya.drmanasaggarwal.com");
 
 const handleTotalOrderQuery = async () => {

  await refetch();
};

  // useEffect(() => {
  //   // Load initial orders
  //   setOrders(initialData);

  //   // ✅ Debugging socket connection
  //   socket.on("connect", () => {
  //     console.log("🟢 Connected to Socket.io server:", socket.id);
  //   });

  //   socket.on("ham-aa-gaye", () => {
  //     console.log("ham aaye ki nahi babu:", socket.id);
  //   });

  //   socket.on("orderPlaced", () => { 
  //     handleTotalOrderQuery()
  //   });


  //   return () => {
  //     socket.off("orderPlaced");
  //   };
  // }, [initialData]);







  return (
    <div className="">
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
