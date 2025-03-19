import React, { useEffect, useState } from "react";
import { useGetAllOrderQuery } from "@/Rtk/orderApi";
import io from "socket.io-client";
import { FaEdit, FaTrash } from "react-icons/fa";
import TableComponent from "../helper/TableComponent";

const socket = io("http://localhost:5000"); // 🔥 Ensure backend URL is correct

const Order = () => {
    const { data: initialData, isLoading } = useGetAllOrderQuery();
    const [orders, setOrders] = useState(initialData || []);

    console.log(initialData);
    

    useEffect(() => {
        // Load initial orders
        setOrders(initialData);
        
        console.log("⚡ Socket.io connected:", socket.connected);

        // ✅ Debugging socket connection
        socket.on("connect", () => {
            console.log("🟢 Connected to Socket.io server:", socket.id);
        });

        // ✅ Listen for order updates
        socket.on("todayOrdersSummary", (newOrder) => {
            console.log("📩 New order received:", newOrder);
            setOrders((prevOrders) => [...prevOrders, newOrder]); // Add new order at the end
        });

        return () => {
            socket.off("orderUpdated");
        };
    }, [initialData]);

    const columns = [
        { header: "Name", accessor: "name" },
        { header: "Email", accessor: "email" },
        { header: "Phone Number", accessor: "phoneNumber" },
        { header: "Address", accessor: "address" },
        // { header: "Order Category", accessor: "ordercategory" },
        // { header: "Order Name", accessor: "category" },
        // { header: "Price", accessor: "price" },
        { header: "Action", accessor: "action", type: "action" }
    ];

    const tableData = (orders ?? []).slice().reverse().map((test) => ({
        name: test?.userDetails?.name|| "N/A",
        email: test?.userDetails?.email|| "N/A",
        phoneNumber: test?.phoneNumber || "N/A",
        address: test?.address || "N/A",
        // ordercategory: test?.category || "N/A",
        // category: test?.name || "N/A",
        // price: test?.price || "N/A",
        action: (
            <div className="flex gap-3">
                <button
                    onClick={() => handleEdit(test)}
                    className="text-blue-600 hover:text-blue-800"
                >
                    <FaEdit size={18} />
                </button>
                <button
                    onClick={() => handleDelete(test._id)}
                    className="text-red-600 hover:text-red-800"
                >
                    <FaTrash size={18} />
                </button>
            </div>
        ),
    }));
    
    

    return (
        <div>
            {isLoading ? <p>Loading...</p> : <TableComponent title="Order List" columns={columns} data={tableData} itemsPerPage={10} />}
        </div>
    );
};

export default Order;
