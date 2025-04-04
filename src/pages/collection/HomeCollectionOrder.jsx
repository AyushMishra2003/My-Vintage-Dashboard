import React, { useState, useEffect } from "react";
import { useGetAllHomeCollectionQuery } from "@/Rtk/orderApi";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import io from "socket.io-client";

const HomeCollectionOrder = () => {
    const { data, isLoading,refetch } = useGetAllHomeCollectionQuery();

     const socket = io("https://db.shanyascans.com");


    const [selectedStatus, setSelectedStatus] = useState("confirmed");
    const [filterDays, setFilterDays] = useState(1);
    const [reportFilter, setReportFilter] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [summary, setSummary] = useState({
        total: 0,
        pending: 0,
        cancelled: 0,
        ongoing: 0,
        completed: 0,
        reportReady: 0,
        notReady: 0,
    });

    const handleFetchData=async()=>{
        await refetch();
    }

    useEffect(() => {
        if (!data) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let orders=data

        // let orders = data.filter(order => {
        //     const orderDate = new Date(order.bookingDate);
        //     orderDate.setHours(0, 0, 0, 0);
        //     const daysDiff = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));

        //     return (
        //         order.bookingStatus === selectedStatus &&
        //         daysDiff < filterDays &&
        //         (reportFilter ? order.reportStatus === reportFilter : true)
        //     );
        // });

        // orders.reverse(); // Latest order first
          
        const reversedOrders = [...orders].reverse(); 

        
        // orders.reverse()

        setFilteredOrders(reversedOrders);
        setCurrentPage(1);

        let summaryData = {
            total: data.length,
            pending: data.filter(o => o.bookingStatus === "pending").length,
            cancelled: data.filter(o => o.bookingStatus === "cancelled").length,
            ongoing: data.filter(o => o.bookingStatus === "ongoing").length,
            completed: data.filter(o => o.bookingStatus === "completed").length,
            reportReady: data.filter(o => o.reportStatus === "ready").length,
            notReady: data.filter(o => o.reportStatus === "not ready").length,
        };

        setSummary(summaryData);
    }, [data, selectedStatus, filterDays, reportFilter]);

      useEffect(() => {
        socket.on("orderPlaced", () => { 
            handleFetchData()
        });
        
        return () => {
          socket.off("orderPlaced");
        };
      }, []);

    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;


    console.log(currentOrders);
    console.log(data);
    
    

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center text-[#201654]">Home Collection Orders</h2>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
                {[
                    { label: "Total", value: summary.total, bg: "bg-blue-500" },
                    { label: "Pending", value: summary.pending, bg: "bg-yellow-500" },
                    { label: "Cancelled", value: summary.cancelled, bg: "bg-red-500" },
                    { label: "Ongoing", value: summary.ongoing, bg: "bg-purple-500" },
                    { label: "Completed", value: summary.completed, bg: "bg-green-500" },
                    { label: "Report Ready", value: summary.reportReady, bg: "bg-indigo-500" },
                    { label: "Not Ready", value: summary.notReady, bg: "bg-gray-500" },
                ].map((item, index) => (
                    <div key={index} className={`${item.bg} text-white p-4 rounded-lg text-center shadow-lg`}>
                        <p className="text-lg font-bold">{item.value}</p>
                        <p className="text-sm">{item.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="border p-2 rounded-md bg-white shadow-md">
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                </select>

                <div className="flex items-center bg-white shadow-md p-3 rounded-lg">
                    <label className="font-semibold text-gray-700">Show last</label>
                    <input type="number" min="1" value={filterDays} onChange={(e) => setFilterDays(Number(e.target.value))}
                        className="border border-gray-300 p-2 rounded w-16 text-center mx-2" />
                    <span className="text-gray-700">days</span>
                </div>

                <select value={reportFilter} onChange={(e) => setReportFilter(e.target.value)} className="border p-2 rounded-md bg-white shadow-md">
                    <option value="">All Reports</option>
                    <option value="ready">Ready</option>
                    <option value="not ready">Not Ready</option>
                </select>
            </div>

            {/* Orders Table */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {currentOrders.length > 0 ? (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#201654] text-white text-center">
                                <th className="p-3 border">Booking Time</th>
                                <th className="p-3 border">Order Name</th>
                                <th className="p-3 border">Patient Name</th>
                                <th className="p-3 border">Status</th>
                                <th className="p-3 border">Report Status</th>
                                <th className="p-3 border">Price</th>
                                <th className="p-3 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((order, i) => (
                                <tr key={i} className="text-center bg-gray-50 hover:bg-gray-100 transition">
                                    <td className="p-3 border">{new Date(order.bookingTime).toLocaleTimeString()}</td>
                                    <td className="p-3 border">{order.orderName}</td>
                                    <td className="p-3 border">{order.patientName}</td>
                                    <td className={`p-3 border font-semibold ${order.bookingStatus === "pending" ? "text-red-500" : "text-green-500"}`}>
                                        {order.bookingStatus}
                                    </td>
                                    <td className={`p-3 border font-semibold ${order.reportStatus === "not ready" ? "text-red-500" : "text-green-500"}`}>
                                        {order.reportStatus}
                                    </td>
                                    <td className="p-3 border">₹{order.orderPrice}</td>
                                    <td className="p-3 border">
                                        <Link to={"/dashboard/home-collection/detail"} state={{ ...order }}>
                                            <IoMdEye />
                                        </Link>


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <p className="text-center text-gray-500">No bookings found.</p>}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-4">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <span className="text-lg font-semibold">{currentPage}</span>

                <button
                    onClick={() => setCurrentPage(prev => (prev * itemsPerPage < filteredOrders.length ? prev + 1 : prev))}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                    disabled={currentPage * itemsPerPage >= filteredOrders.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default HomeCollectionOrder;
