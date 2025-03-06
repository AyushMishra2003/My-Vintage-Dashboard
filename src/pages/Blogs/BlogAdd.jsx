import { useAddBlogMutation } from "@/Rtk/blogApi";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Spinner from "../Loading/SpinLoading";

const BlogAdd = () => {
    const [title, setTitle] = useState("");
    const [blogName, setBlogName] = useState("");
    const [photo, setPhoto] = useState(null);
    const [editorContent, setEditorContent] = useState("");
    const [addBlog] = useAddBlogMutation()
    const dispatch = useDispatch()
    const [spinLoading, setSpinLoading] = useState(false)

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };


    const handleSubmit = async () => {
        setSpinLoading(true)
        const formData = new FormData()
        formData.append("blogName", blogName)
        formData.append("blogDetail", editorContent)
        formData.append("blogPhoto", photo)
        const response = await (addBlog(formData)).unwrap()
        console.log(response);
        
        if (response?.success) {
            setTitle("")
            setBlogName("")
            setPhoto(null)
            setEditorContent(null)
        }

        setSpinLoading(false)


    }






    return (
        <div className="p-4 max-w-4xl mx-auto border border-black rounded-md shadow-md ">
            <h2 className="text-xl font-bold mb-4">Add Blog</h2>

            {/* <label className="block mb-2">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-black rounded-md mb-4"
      /> */}

            <label className="block mb-2">Blog Name</label>
            <input
                type="text"
                value={blogName}
                onChange={(e) => setBlogName(e.target.value)}
                className="w-full p-2 border border-black rounded-md mb-4"
            />

            <label className="block mb-2">Photo</label>
            <input
                type="file"
                onChange={handlePhotoChange}
                className="w-full p-2 border border-black rounded-md mb-4"
            />

            <label className="block mb-2">Description</label>
            <div className="border border-black overflow-y-auto">
                <SunEditor
                    setContents={editorContent}
                    onChange={setEditorContent}
                    setOptions={{
                        minHeight: "100px",
                        maxHeight: "100px",
                        buttonList: [
                            ["undo", "redo"],
                            ["bold", "underline", "italic", "strike"],
                            ["font", "fontSize", "formatBlock"],
                            ["fontColor", "hiliteColor"],
                            ["align", "list", "lineHeight"],
                            ["table"],
                            ["link"],
                            ["image", "video"],
                            ["codeView"],
                        ],
                        linkProtocol: "",
                        addTagsWhitelist: "a[href]",
                        sanitize: false,
                        defaultTag: "div",
                    }}
                />
            </div>
            {spinLoading ? <Spinner /> :
                <button className="mt-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={() => handleSubmit
                    ()
                }>
                    Submit Blog
                </button>
            }
        </div>
    );
};

export default BlogAdd;