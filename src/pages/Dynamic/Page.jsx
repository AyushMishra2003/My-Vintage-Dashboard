import React, { useState } from 'react';
import {
  useGetAllPagesQuery,
  useCreatePageMutation,
  useDeletePageMutation,
} from '@/Rtk/dynamicApi';
import { FaHome, FaPlaceOfWorship } from 'react-icons/fa';
import { MdContactPhone, MdOutlineRoundaboutRight, MdReviews } from 'react-icons/md';
import { GrGallery } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

// Icon and color mapping based on page titles
const iconMap = {
  Home: <FaHome />,
  About: <MdOutlineRoundaboutRight />,
  Gallery: <GrGallery />,
  Places: <FaPlaceOfWorship />,
  Contact: <MdContactPhone />,
  Testimonial: <MdReviews />,
};

const colorMap = {
  Home: 'bg-[#655CCE]',
  About: 'bg-[#EA5455]',
  Gallery: 'bg-[#FF9F43]',
  Places: 'bg-[#28C76F]',
  Contact: 'bg-[#FF9F43]',
  Testimonial: 'bg-[#28C76F]',
};

// ✅ Card Component
const WebsiteContentCard = ({ data, onDelete }) => {
  const icon = iconMap[data?.page] || <FaHome />;
  const bgColor = colorMap[data?.title] || 'bg-blue-500';

  const navigate=useNavigate()

  return (
    <div className="w-full rounded-xl border shadow-md hover:shadow-xl transition duration-300 relative " onClick={()=>navigate(`/dashboard/cms/${data?.slug}`)}>
      <div className={`w-full p-6 text-white rounded-t-xl ${bgColor} flex items-center gap-3`}>
        <div className="text-xl">{icon}</div>
        <h2 className="text-lg font-semibold">{data?.name}</h2>
      </div>
      {/* <div className="p-4 text-sm text-gray-700 space-y-1">
        {data?.sections?.map((section, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-500">▹</span>
            <span>{section?.name}</span>
          </div>
        ))}
      </div> */}
      {/* <button
        className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm"
        onClick={() => onDelete(data?._id)}
      >
        Delete
      </button> */}
    </div>
  );
};

// ✅ Main Component
const WebsiteContent = () => {
  const { data: dynamicPage, isLoading, error } = useGetAllPagesQuery();
  const [createPage] = useCreatePageMutation();
  const [deletePage] = useDeletePageMutation();

  const [newPageName, setNewPageName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preData, setPreData] = useState();

  const handleAddMainParent = () => {
    setPreData({});
    setIsModalOpen(true);
  };

  const handleCreatePage = async () => {
    if (!newPageName.trim()) return;
    try {
      await createPage({ name: newPageName });
      setNewPageName('');
    } catch (err) {
      console.error('Error creating page:', err);
    }
  };

  const handleDeletePage = async (id) => {
    try {
      await deletePage({ id });
    } catch (err) {
      console.error('Error deleting page:', err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 py-6 px-4 md:px-12">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Content Manager Related To <span className="capitalize">Pages</span>
      </h1>

      {/* Add Page Form */}
      <div className="flex justify-center gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter page name"
          value={newPageName}
          onChange={(e) => setNewPageName(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 w-64"
        />
        <button
          onClick={handleCreatePage}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Page
        </button>
      </div>

      {/* Loading/Error States */}
      {isLoading && <p className="text-center text-gray-500">Loading pages…</p>}
      {error && (
        <p className="text-center text-red-500">
          Error loading pages: {error.error || 'Unknown error'}
        </p>
      )}

      {/* Content Cards */}
      <div className="grid items-center justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {dynamicPage?.map((data, index) => (
          <WebsiteContentCard key={data._id || index} data={data} onDelete={handleDeletePage} />
        ))}
      </div>
    </div>
  );
};

export default WebsiteContent;
