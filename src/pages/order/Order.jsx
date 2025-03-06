import { useGetAllOrderQuery } from '@/Rtk/orderApi'
import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableComponent from '../helper/TableComponent';


const Order = () => {

    const { data, isLoading } = useGetAllOrderQuery()

    console.log(data);

    const columns = [
        { header: "Name", accessor: "name" },
        { header: "email", accessor: "email" },
        { header: "Phone Number", accessor: "phoneNumber" },
        { header: "Address", accessor: "address" },
        { header: "Order Category", accessor: "ordercategory" },
        { header: "Order Name", accessor: "category" },
        { header: "price", accessor: "price" },
        { header: "Action", accessor: "action", type: "action" }
    ];

    const tableData = data?.map((test) => ({
        name: test?.orderName
            || "N/A",
        email: test.email || "N/A",
        phoneNumber:test.phone || "N/A",
        address:test.address
        || "N/A",
        ordercategory:test.category || "N/A",
        category:test.name || "N/A",
        price:test.price || "N/A",
 
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
    })) || [];



    return (
        <div>
                 {isLoading ? <p>Loading...</p> : <TableComponent title="Package List" columns={columns} data={tableData} itemsPerPage={10} />}

        </div>
    )
}

export default Order