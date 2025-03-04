import { useGetAllBannerQuery } from '@/Rtk/bannerApi';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableComponent from '../helper/TableComponent';

const Banner = () => {
    const { data, isLoading } = useGetAllBannerQuery();

    console.log(data);

    const columns = [
        { header: "S.No", accessor: "sno" },
        { header: "Type", accessor: "type" },
        { header: "Photo", accessor: "photo" },
        {
            header: "Action",
            accessor: "action",
            type: "action"
        },
    ];

    const tableData = data?.map((test, index) => ({
        sno: index + 1,
        type: test.types ? test.types : "N/A",
        photo: test.photo ? (
            <img 
                src={test.photo.secure_url} 
                alt="Banner" 
                className="w-16 h-16 object-cover rounded-md border border-gray-300" 
            />
        ) : (
            "N/A"
        ),
        action: (
            <div className="flex gap-3">
                {/* Edit Button */}
                <button
                    onClick={() => handleEdit(test)}
                    className="text-blue-600 hover:text-blue-800"
                >
                    <FaEdit size={18} />
                </button>

                {/* Delete Button */}
                <button
                    onClick={() => handleDelete(test)}
                    className="text-red-600 hover:text-red-800"
                >
                    <FaTrash size={18} />
                </button>
            </div>
        ),
    })) || [];

    return (
        <div>
            {isLoading ? (
                <p className="text-center text-lg font-semibold">Loading...</p>
            ) : (
                <TableComponent
                    title="Banner List"
                    columns={columns}
                    data={tableData}
                    itemsPerPage={10}
                />
            )}
        </div>
    );
}

export default Banner;
