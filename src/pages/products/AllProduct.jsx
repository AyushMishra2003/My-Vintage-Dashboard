import { useGetAllProductQuery } from '@/Rtk/productApi';
import React, { useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AllProduct = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading } = useGetAllProductQuery({ page, limit });
    const navigate = useNavigate();

    const handleEdit = (item) => {
        // your edit logic
    };


    const handleView = (item) => {

        navigate(`/dashboard/products/${item?._id}`)
    };

    const handleDelete = (id) => {
        // your delete logic
    };

    const tableData = data?.products || [];
    const totalPages = data?.totalPages || 1;


  

    return (
        <div>
            <div className="flex items-center justify-between mb-2 mt-2">
                <h2 className="text-2xl font-semibold text-black">All Products</h2>
                <button
                    className="bg-[#06425F] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    onClick={() => navigate("/dashboard/products")}
                >
                    + Add Product
                </button>
            </div>

            {isLoading ? (
                <p className="text-center text-lg font-semibold">Loading...</p>
            ) : (
                <>
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                        <table className="min-w-full divide-y divide-gray-200 bg-white">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">S.No.</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rate</th>
                                  
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Photo</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {tableData.map((product, index) => (
                                    <tr key={product._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {(page - 1) * limit + index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product?.title || "N/A"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product?.rate} Rs</td>
                                       
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {product?.mainPhoto?.secure_url ? (
                                                <img
                                                    src={product.mainPhoto.secure_url}
                                                    alt={product.title}
                                                    className="w-16 h-16 object-cover rounded-md border border-gray-300"
                                                />
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="flex gap-3">
                                                <button onClick={() => handleView(product)} className="text-blue-600 hover:text-blue-800">
                                                    <FaEdit size={18} />
                                                </button>
                                                {/* <button onClick={() => handleView(product)} className="text-green-600 hover:text-blue-800">
                                                    <FaEye size={18} />
                                                </button> */}
                                                <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-800">
                                                    <FaTrash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                            {/* <tbody className="divide-y divide-gray-200">
                                {tableData.map((product) => (
                                    <tr key={product._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product?.title || "N/A"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product?.rate} Rs</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product?.categoryType || "N/A"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {product?.mainPhoto?.secure_url ? (
                                                <img
                                                    src={product.mainPhoto.secure_url}
                                                    alt={product.title}
                                                    className="w-16 h-16 object-cover rounded-md border border-gray-300"
                                                />
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="flex gap-3">
                                                <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-800">
                                                    <FaEdit size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-800">
                                                    <FaTrash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody> */}
                        </table>
                    </div>

                    <div className="flex justify-center mt-4 gap-2">
                        <button
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            disabled={page <= 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>
                        <span className="px-4 py-1 font-medium">Page {page} of {totalPages}</span>
                        <button
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            disabled={page >= totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AllProduct;
