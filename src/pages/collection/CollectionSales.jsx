
import React from 'react'
import TableComponent from '../helper/TableComponent';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGetCollectionSalesQuery } from '@/Rtk/collectionApi';

const CollectionSales = () => {
    const { data, isLoading } = useGetCollectionSalesQuery()

    const navigate=useNavigate()


    const columns = [
        { header: "Name", accessor: "name" },
        { header: "Email", accessor: "email" },
        // { header: "URL", accessor: "url" },
        { header: "Passowrd", accessor: "password" },

        { header: "Action", accessor: "action", type: "action" }
    ];

    const tableData = data?.map((test) => ({
        name: test.name || "N/A",
        email: test.email || "N/A",
        password: test.password || "N/A",
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
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-black">{"Home-Collection Sales"}</h2>
                <button
                    className="bg-[#212121] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                onClick={() => navigate("/dashboard/home-collection/add")}


                >
                    + Add Collection Sales
                </button>
            </div>
            {isLoading ? (
                <p className="text-center text-lg font-semibold">Loading...</p>
            ) : (
                <TableComponent title="Package List" columns={columns} data={tableData} itemsPerPage={10} />
            )}
        </div>
    )
}

export default CollectionSales