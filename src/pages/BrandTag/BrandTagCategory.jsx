import { useAddThemeTagMutation,  useDeleteThemeTagMutation,  useEditThemeTagMutation, useGetAllThemeTagQuery } from '@/Rtk/packageApi'
import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableComponent from '../helper/TableComponent';
import { useAddLabTestTagMutation, useDeleteLabTagMutation, useEditLabTagMutation, useGetAllLabTestQuery } from '@/Rtk/labTestTag';
import { useDispatch } from 'react-redux';
import Spinner from '../Loading/SpinLoading';
import Swal from 'sweetalert2';
import { useAddBrandMutation, useDeleteBrandMutation, useEditBrandMutation, useGetAllBrandNameQuery } from '@/Rtk/brandTagApi';


const BrandCategoryTag = () => {

    const { data, isLoading } = useGetAllBrandNameQuery()

    const [deleteBrandTag, { isLoading: isDeleteLoading, isError: isDelete, isSuccess: isDeleteSuccess }] = useDeleteBrandMutation()

    const [addBrandTag]= useAddBrandMutation()
    const [editBrandTag] = useEditBrandMutation()
    const [currentTag, setCurrentTag] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [spinLoading, setSpinLoading] = useState(false)
    const [text, setText] = useState("")
    const [themeId, setThemeId] = useState("")
    const [photo, setPhoto] = useState(null);
    const dispatch = useDispatch()

    const columns = [
        { header: "Tag Name", accessor: "tag" },
        // { header: "Photo", accessor: "photo" },
        { header: "Action", accessor: "action", type: "action" }
    ];




    const tableData = data?.map((test) => ({
        tag: test?.brandName
            || "N/A",
        // url: test.url || "N/A",
        // photo: test.photo ? (
        //     <img
        //         src={test.photo.secure_url}
        //         alt={test?.themeName}
        //         className="w-16 h-16 object-cover rounded-md border border-gray-300"
        //     />
        // ) : (
        //     "N/A"
        // ),
        action: (
            <div className="flex gap-3">
                <button
                    onClick={() => handleEditTag(test)}
                    className="text-blue-600 hover:text-blue-800"
                >
                    <FaEdit size={18} />
                </button>
                <button
                    onClick={() => handleDeleteTag(test._id)}
                    className="text-red-600 hover:text-red-800"
                >
                    <FaTrash size={18} />
                </button>
            </div>
        ),
    })) || [];


    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formData = new FormData()
        setSpinLoading(true)
        // formData.append("themeName", text)
        // formData.append("photo", photo)


        const data={
             brandName:text
        }
   
         
        let response

        if (currentTag) {
            response = await editBrandTag({data,id:currentTag?._id}).unwrap()
        } else {
            response = await addBrandTag(data).unwrap();
        }

     

        if (response?.success) {

            setCurrentTag(null)
            setText("")
            setPhoto("")
            setThemeId("")
            setIsModalOpen(false)
        }
        setSpinLoading(false)

    }
    

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleDeleteTag = async (id) => {
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
                const response = await deleteBrandTag(id).unwrap(); // Await the mutation


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

    const handleEditTag = (data) => {
        
        setCurrentTag(data)
        setText(data?.brandName)
        setPhoto(data?.photo?.secure_url)
        // setThemeId(data?.packageSlugName        )
        setIsModalOpen(true)

    }

    const handleCancelTag = () => {
        setCurrentTag(null)
        setText("")
        setPhoto("")
        setThemeId("")
        setIsModalOpen(false)
    }
      

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-black">{"Brand Tag"}</h2>
                <button
                    className="bg-[#212121] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                onClick={() => setIsModalOpen(true)}
                >
                    + Add Brand Tag
                </button>
            </div>
            {isLoading ? <p>Loading...</p> : <TableComponent title="Package List" columns={columns} data={tableData} itemsPerPage={10} />}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">{currentTag ? "Edit Theme Tag" : "Add Theme Tag"}</h2>

                        {/* Edit Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Dropdown for Banner Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Enter Tag Name</label>
                                <input type="text" value={text} className='w-full py-1 rounded  border border-gray-700' onChange={(e) => setText(e.target.value)} />
                            </div>



                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
                                <input type="file" onChange={handlePhotoChange} className="w-full p-2 border rounded-md" />
                            </div>

                

                            {/* Submit & Cancel Buttons */}
                            <div className="flex justify-end gap-2  border border-red-500">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-400 text-white rounded-md"
                                    onClick={() => handleCancelTag()}


                                >
                                    Cancel
                                </button>
                                {spinLoading ? <Spinner /> : <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                                    {currentTag ? "Edit Save" :
                                        "Save Changes"}
                                </button>}

                            </div>
                        </form>
                    </div>
                </div>
            )}


        </div>
    )
}

export default BrandCategoryTag