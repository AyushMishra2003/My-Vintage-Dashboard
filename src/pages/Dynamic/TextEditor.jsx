import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {
  useCreateSectionMutation,
  useUpdateSectionMutation
}  from '@/Rtk/dynamicApi'; 

const TextEditor = ({ onClose, initialData, page }) => {
  const [editorContent, setEditorContent] = useState(initialData?.content || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || '');
  const [metaUrl, setMetaUrl] = useState(initialData?.meta_url || '');
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || '');
  const [category, setCategory] = useState(initialData?.category || 'Tille');
  const [customField1, setCustomField1] = useState(initialData?.customField1 || '');
  const [attachment, setAttachment] = useState(null);
  const [spinLoading, setSpinLoading] = useState(false);
  const [createSection] = useCreateSectionMutation();
  const [updateSection] = useUpdateSectionMutation();

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('page', page);
    formData.append('description', editorContent);
    formData.append('customField1', customField1);
    formData.append('meta_description', metaDescription);
    formData.append('meta_title', metaTitle);
    formData.append('meta_url', metaUrl);
    if (attachment) formData.append('photo', attachment);

    setSpinLoading(true);

    try {
      if (initialData?._id) {
        await updateSection({
          sectionId: initialData._id,
          formData,
        });
      } else {
        await createSection(formData);
      }
      onClose();
    } catch (err) {
      console.error('Error saving section:', err);
    } finally {
      setSpinLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[60%] relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Description</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded bg-white"
          >
            <option value="page">{page}</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Custom Field</label>
          <input
            type="text"
            value={customField1}
            onChange={(e) => setCustomField1(e.target.value)}
            placeholder="Enter Custom Field"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Meta Description</label>
          <input
            type="text"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder="Enter Meta Description"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Meta Title</label>
          <input
            type="text"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            placeholder="Enter Meta Title"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Meta URL</label>
          <input
            type="text"
            value={metaUrl}
            onChange={(e) => setMetaUrl(e.target.value)}
            placeholder="Enter Meta URL"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4 border border-blue-500">
          <label className="block text-gray-700 mb-2">Attachment (JPG/PNG/WEBP)</label>
          <input
            type="file"
            accept="image/png, image/jpeg image/webp"
            onChange={(e) => setAttachment(e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>

        <SunEditor
          setContents={editorContent}
          onChange={(content) => setEditorContent(content)}
          className="border border-red-500 min-h-[40rem]"
          setOptions={{
            height: '400px',
            minHeight: '300px',
            buttonList: [
              ['undo', 'redo'],
              ['bold', 'underline', 'italic', 'strike'],
              ['font', 'fontSize', 'formatBlock'],
              ['fontColor', 'hiliteColor'],
              ['align', 'list', 'lineHeight'],
              ['table'],
              ['link'],
              ['image', 'video'],
              ['codeView'],
            ],
            linkProtocol: '',
            addTagsWhitelist: 'a[href]',
            sanitize: false,
            defaultTag: 'div',
          }}
        />

        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center"
            disabled={spinLoading}
          >
            {spinLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                Saving...
              </div>
            ) : (
              'Save'
            )}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
