
import { useGetAllLabTestTagQuery } from '@/Rtk/labTestTag';
import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableComponent from '../helper/TableComponent';

const LabTestTag = () => {
    const { data, isLoading } = useGetAllLabTestTagQuery()
    console.log(data);



    const columns = [
        { header: "name", accessor: "type" },
        { header: "Photo", accessor: "photo" },
        { header: "Action", accessor: "action", type: "action" }
    ];

    const tableData = data?.map((test) => ({
        type: test?.labTagName || "N/A",
        // url: test.url || "N/A",
        photo: test.icon ? (
            <img
                src={test.icon.secure_url}
                alt="Banner"
                className="w-16 h-16 object-cover rounded-md border border-gray-300"
            />
        ) : (
            "N/A"
        ),
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
                <h2 className="text-2xl font-semibold text-gray-700">{"Pathology Lab Tag"}</h2>
                <button
                    className="bg-[#212121] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    // onClick={() => setIsModalOpen(true)}
                >
                    + Add Tag
                </button>
            </div>
             {isLoading ? (
                <p className="text-center text-lg font-semibold">Loading...</p>
            ) : (
                <TableComponent title="Lab Test Tag" columns={columns} data={tableData} itemsPerPage={10} />
            )}

        </div>
    )
}

export default LabTestTag