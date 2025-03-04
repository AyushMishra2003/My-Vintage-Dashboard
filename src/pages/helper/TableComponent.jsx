import { useState } from "react";
import AddScanTest from "../scan/AddScanTest";

const TableComponent = ({ columns, data, title, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [show,setShow]=useState(false)
  
  // Get current page data
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  return (
    <div className="w-full p-4 border rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold ">{title}</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700" onClick={()=>setShow(true)}>
          + Add Scan Test
        </button>
        </div>

     {!show  ?  
     <div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((col, index) => (
              <th key={index} className="border border-gray-300 p-2 text-left">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-white even:bg-gray-100">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="border border-gray-300 p-2">
                  {col.type === "image" ? (
                    <img src={row[col.accessor]} alt="" className="w-12 h-12 object-cover rounded" />
                  ) : (
                    row[col.accessor]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <div className="flex justify-end items-center mt-4">
        <button
          className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-3">Page {currentPage} of {totalPages}</span>
        <button
          className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      
      </div> : <AddScanTest/> }


    </div>
  );
};

export default TableComponent;
