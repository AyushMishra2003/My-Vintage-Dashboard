import { useDeleteDoctorMutation, useGetAllTeamQuery } from '@/Rtk/teamApi';
import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableComponent from '../helper/TableComponent';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Team = () => {
    const { data, isLoading } = useGetAllTeamQuery();
    const navigate = useNavigate()
    const [deleteTeam] = useDeleteDoctorMutation()
    const filterDoctor = Array.isArray(data) && data.filter((data) => data.isDoctor == true)
    const filterNotDoctor = Array.isArray(data) && data.filter((data) => !data.isDoctor)
    const combinedArray = Array.isArray(filterDoctor) && Array.isArray(filterNotDoctor) && [...filterDoctor, ...filterNotDoctor];




    const columns = [
        { header: "Doctor Name", accessor: "name" },
        { header: "Photo", accessor: "photo" },
        { header: "Degree", accessor: "degree" },
        { header: "Destination", accessor: "destination" },
        { header: "Action", accessor: "action", type: "action" }
    ];

    const tableData = Array.isArray(combinedArray) && combinedArray?.map((test) => ({
        name: test.doctorName || "N/A",
        // url: test.url || "N/A",
        photo: test.doctorPhoto ? (
            <img
                src={test.doctorPhoto.secure_url}
                alt="Banner"
                className="w-16 h-16 object-cover rounded-md border border-gray-300"
            />
        ) : (
            "N/A"
        ),
        photo: test.doctorPhoto ? (
            <img
                src={test.doctorPhoto.secure_url}
                alt="Banner"
                className="w-16 h-16 object-cover rounded-md border border-gray-300"
            />
        ) : (
            "N/A"
        ),
        degree: test.degree || "N/A",
        destination: test.doctorDesination,
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


    // const handleDelete=async(id)=>{
    //      const response=await deleteTeam(id)
    // }

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
                const response = await deleteTeam(id)


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
       navigate("/dashboard/team/add",{state:data})    
    }


    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-black">{"Team List"}</h2>
                <button
                    className="bg-[#212121] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"

                    onClick={() => navigate("/dashboard/team/add")}
                >
                    + Add Team
                </button>
            </div>
            {isLoading ? (
                <p className="text-center text-lg font-semibold">Loading...</p>
            ) : (
                <TableComponent title="Team List" columns={columns} data={tableData} itemsPerPage={10} />
            )}

        </div>
    )
}

export default Team