import { useGetAllPackageQuery } from '@/Rtk/packageApi';
import React from 'react'
import TableComponent from '../helper/TableComponent';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Package = () => {

     const { data, isLoading } = useGetAllPackageQuery();
  
     console.log(data);

     const columns = [
        { header: "Package Name", accessor: "package" },
        // { header: "URL", accessor: "url" },
        { header: "Package Rate", accessor: "rate" },
        { header: "Action", accessor: "action", type: "action" }
    ];

       const tableData = data?.map((test) => ({
            package: test.packageName || "N/A",
            rate: test.packageRate || "N/A",
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
                <h2 className="text-2xl font-semibold text-black">{"Health-Package Tag"}</h2>
                <button
                    className="bg-[#212121] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                // onClick={() => setIsModalOpen(true)}
                >
                    + Add Package
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

export default Package