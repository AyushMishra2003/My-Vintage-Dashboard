import { useAssignedCollectionSalesMutation, useGetCollectionSalesQuery, useGetHomeCollectionDetailQuery } from "@/Rtk/collectionApi";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const DetailHomeCollection = () => {
    const location = useLocation();
    const { state } = location;

    const { data: detail, isLoading: detailLoading } = useGetHomeCollectionDetailQuery(state?._id)


    // Local state for editable fields
    // const [detail, setdetail] = useState(detail || {});
    const [selectedStatus, setSelectedStatus] = useState(detail?.bookingStatus);
    const [assignedCollectionSales] = useAssignedCollectionSalesMutation()
    const { data, isLoading } = useGetCollectionSalesQuery()
    const [assignedTo, setAssignedTo] = useState("");
    const [assignedId, setAssignedId] = useState("")

    if (!state) {
        return <div className="text-center text-red-500">No order details available</div>;
    }

    // Convert Date & Time to Readable Format
    const formatDateTime = (isoString) => {
        return new Date(isoString).toLocaleString();
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setdetail((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle Status Update
    const handleStatusChange = (status) => {


    };

    // Handle Assignment
    const handleAssign = (e) => {

        setAssignedTo(e.target.value);
    };




    const handleAssigned = async () => {
        const filterData = data.find((val) => val.name === assignedTo);


        const data1 = {
            salesId: filterData._id,
            orderId: state._id
        }
        console.log(data1);

        const response = await assignedCollectionSales(data1)



        setAssignedTo("")
        setAssignedId("")



    }











    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <div className="flex items-center justify-between pb-4">
                <h2 className="text-2xl font-semibold text-gray-800 ">
                    Order Details - {detail?.orderName}
                </h2>
                <div className="flex gap-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"

                    >
                        Cancelled
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"

                    >
                        Complete
                    </button>

                </div>
            </div>


            {/* Order Details */}
            <div className="border p-4 rounded-lg bg-gray-50 space-y-3">
                <div>
                    <span className="font-semibold text-gray-700">Patient Name:</span> {detail?.patientName}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="font-semibold text-gray-700">Age:</span> {detail?.patientAge}
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700">Gender:</span> {detail?.patientGender}
                    </div>
                </div>

                <div>
                    <span className="font-semibold text-gray-700">Order Type:</span> {detail?.orderType}
                </div>

                <div>
                    <span className="font-semibold text-gray-700">Category:</span> {detail?.category}
                </div>

                <div>
                    <span className="font-semibold text-gray-700">Price (₹):</span> {detail?.orderPrice}
                </div>

                <div>
                    <span className="font-semibold text-gray-700">Quantity:</span> {detail?.quantity}
                </div>

                <div>
                    <span className="font-semibold text-gray-700">Booking Date:</span> {formatDateTime(detail?.bookingDate)}
                </div>

                <div>
                    <span className="font-semibold text-gray-700">Booking Time:</span> {formatDateTime(detail?.bookingTime)}
                </div>

                <div>
                    <span className="font-semibold text-gray-700">Created At:</span> {formatDateTime(detail?.createdAt)}
                </div>

                <div>
                    <span className="font-semibold text-gray-700">Order Status:</span>
                    <span
                        className={`ml-2 px-3 py-1 rounded ${selectedStatus === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : selectedStatus === "completed"
                                ? "bg-green-200 text-green-800"
                                : "bg-red-200 text-red-800"
                            }`}
                    >
                        {selectedStatus}
                    </span>
                </div>

                <div>
                    <span className="font-semibold text-gray-700">Report Status:</span> {detail?.reportStatus}
                </div>

                <div>
                    <span className="font-semibold text-gray-700">Assigned To:</span> {detail?.assignedTo?.name || "Not Assigned"}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
                {/* Left Side - Confirm & Cancel Buttons */}
                <div>
                    {assignedTo &&
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                            onClick={() => handleAssigned()}
                        >
                            Save Changes
                        </button>
                    }

                </div>

                {/* Right Side - Assign To Dropdown */}
                {!detail?.assignedTo &&
                    <div className="relative">
                        <select
                            className="border p-2 rounded"
                            value={assignedTo}
                            onChange={handleAssign}
                        >
                            <option value="">Assign To</option>
                            {Array.isArray(data) && data.map((val) => {
                                return (<option value={val?.name}>{val?.name}</option>)
                            })}

                        </select>
                    </div>
                }
            </div>
        </div>
    );
};

export default DetailHomeCollection;
