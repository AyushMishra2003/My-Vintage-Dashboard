import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaEye } from 'react-icons/fa';
import TextEditor from './TextEditor';
import { useGetSectionsByPageQuery } from '@/Rtk/dynamicApi'; 

const SectionManager = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preData, setPreData] = useState();

  const {
    data: sections = [],
    isLoading: loading,
    isError,
    error,
    refetch,
  } = useGetSectionsByPageQuery(name);



  

  const handleAddMainParent = () => {
    setPreData({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    refetch(); // Fetch latest data
    setIsModalOpen(false);
  };

  const truncateDescription = (htmlString, maxLength = 50) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    const plainText = tempElement.textContent || tempElement.innerText || '';
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  const handleAddNew = (section) => {
    setPreData({
      _id: section._id,
      title: section.title,
      content: section.description,
      category: section.category || 'Azolla Benefits',
      customField1: section.customField1 || '',
      meta_description: section.meta_description,
      meta_title: section.meta_title,
      meta_url: section.meta_url,
      photo: section?.photo,
    });
    console.log(preData);
    
    setIsModalOpen(true);
  };

  const handleView = (section) => {
    navigate('/website-content/child', { state: { section } });
  };

  const renderSections = () => {
    if (loading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error?.data?.message || 'Something went wrong'}</p>;
    if (sections.length === 0) return <p>No Description Data</p>;

    return sections.map((section, index) => (
      <tr key={index} className="border-b">
        <td className="px-4 py-2 text-center">{index + 1}</td>
        <td className="px-4 py-2">{section.title}</td>
        <td className="px-4 py-2">
          {section.description
            ? truncateDescription(section.description, 100)
            : 'No Description'}
        </td>
        <td className="px-4 py-2 text-center">
          {section?.photo ? (
            <img
              src={section?.photo?.secure_url}
              alt={section.title}
              className="w-20 h-20 object-cover"
            />
          ) : (
            <p>No Image</p>
          )}
        </td>
        <td className="px-4 py-2 text-center flex gap-3">
          <button
            className="bg-[#22C55E] text-white px-2 py-1 rounded"
            onClick={() => handleAddNew(section)}
          >
            <FaEdit />
          </button>
          <button
            className="bg-[#22C55E] text-white px-2 py-1 rounded"
            onClick={() => handleView(section)}
          >
            <FaEye />
          </button>
        </td>
      </tr>
    ));
  };

  return (

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Content Manager Related To {name.toUpperCase()}
        </h1>
        <div className="flex justify-end mb-4">
          <button
            className="bg-[#22C55E] text-white px-4 py-2 rounded"
            onClick={handleAddMainParent}
          >
            + Add New Section
          </button>
        </div>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Sr. No.</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>{renderSections()}</tbody>
        </table>

        {isModalOpen && (
          <TextEditor
            onClose={closeModal}
            initialData={preData}
            page={name}
          />
        )}
      </div>
    
  );
};

export default SectionManager;
