import { useDeletePackageMutation, useGetAllPackageQuery } from '@/Rtk/packageApi';
import React from 'react'
import TableComponent from '../helper/TableComponent';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Package = () => {

    const { data, isLoading } = useGetAllPackageQuery();
    const [deletePackage] = useDeletePackageMutation()
    const navigate=useNavigate()


    const columns = [
        { header: "Package Name", accessor: "package" },
        // { header: "URL", accessor: "url" },
        { header: "Package Rate", accessor: "rate" },
        { header: "Action", accessor: "action", type: "action" }
    ];

    const tableData = data?.map((test) => ({
        package: test.packageName || "N/A",
        rate: test.packageDiscount + "/-" || "N/A",
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


    const handleDelete = async (id) => {
      

        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!",
            });

            if (result?.isConfirmed) {
                const response = await deletePackage(id)

                if (response?.success) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
            }
        } catch (error) {
            console.error("Error deleting:", error);
        }
    }

    const handleEdit=async(data)=>{
         navigate("/dashboard/package/add", {state:data})
    }





    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-black">{"Health-Package Tag"}</h2>
                <button
                    className="bg-[#212121] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                onClick={() => navigate("/dashboard/package/add")}
                
 
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