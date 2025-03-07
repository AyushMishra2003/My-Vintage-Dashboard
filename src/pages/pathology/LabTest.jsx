import { useDeleteLabTestMutation, useGetAllLabTestQuery } from '@/Rtk/labTestTag'
import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableComponent from '../helper/TableComponent';
import { useNavigate } from 'react-router-dom';

const LabTest = () => {
      const { data, isLoading } = useGetAllLabTestQuery()
      const [deleteLabTest]=useDeleteLabTestMutation()
 
      const navigate=useNavigate()
     

          const columns = [
              { header: "PathologyName", accessor: "type" },
              { header: "price", accessor: "price" },
              { header: "Action", accessor: "action", type: "action" }
          ];
      
          const tableData = data?.map((test) => ({
              type: test?.testDetailName
              || "N/A",
              price: test.testPrice+ +" "+  "Rs" || "N/A",
             
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


          const handleEdit=async(data)=>{
               navigate("/dashboard/pathology/add",{state:data})
          }


          const handleDelete=async(id)=>{
               const response=await deleteLabTest(id)
          } 
      

  return (
    <div>
        <div>
                   <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">{"Pathology Test List"}</h2>
                <button
                    className="bg-[#212121] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              
                    onClick={()=>navigate("/dashboard/pathology/add")}
                >
                    + Add Pathology Test
                </button>
            </div>
             {isLoading ? (
                <p className="text-center text-lg font-semibold">Loading...</p>
            ) : (
                <TableComponent title="Lab Test Tag" columns={columns} data={tableData} itemsPerPage={10} />
            )}

        </div>


    </div>
  )
}

export default LabTest