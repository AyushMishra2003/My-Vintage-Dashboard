import React, { useState, useEffect } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import axios from 'axios';
import { useGetAllBrandNameQuery } from '@/Rtk/brandTagApi';
import { useGetAllThemeTagQuery } from '@/Rtk/packageApi';
import { useGetAllLabTestTagQuery } from '@/Rtk/labTestTag';
import { useAddProductMutation } from '@/Rtk/productApi';
import { data } from 'autoprefixer';

const Product = () => {
    const [formData, setFormData] = useState({
        name: '',
        rate: '',
        discount: '',
        categoryType: '',
        categoryId: '',
        subCategory: '',
        description: '',
        faq: '',
        contact: ''
    });

    const { data: brandData, isLoading: isBrandLoading } = useGetAllBrandNameQuery()
    const { data: themeData, isLoading: isThemeLoading } = useGetAllThemeTagQuery()
    const { data: productCMainData, isLoading: isProductCMainData } = useGetAllLabTestTagQuery()

    const [addProduct, { isLoading, isError, isSuccess }] = useAddProductMutation();

    const [mainPhoto, setMainPhoto] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [tab, setTab] = useState('description');
    const [step, setStep] = useState("one")
    const [selectedProductCategory, setSelectedProductCategory] = useState(null);

    const [selectCategory, setSelectCategory] = useState(null)

    useEffect(() => {
        const fetchCategories = async () => {
            if (!formData.categoryType) return;
            const url =
                formData.categoryType === 'product'
                    ? '/api/product-category'
                    : formData.categoryType === 'brand'
                        ? '/api/brand-category'
                        : '/api/theme-category';

            try {
                const res = await axios.get(url);
                setCategoryOptions(res.data.categories || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCategories();
    }, [formData.categoryType]);

    useEffect(() => {
        if (formData.categoryType === 'product') {
            const selected = categoryOptions.find(cat => cat._id === formData.categoryId);
            setSubCategories(selected?.subCategory || []);
        } else {
            setSubCategories([]);
        }
    }, [formData.categoryId, categoryOptions, formData.categoryType]);

    const handleChange = (e) => {
        const { name, value } = e.target




        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        // When product category changes
        if (name === "categoryId" && selectCategory === "product") {
            const found = productCMainData.find((cat) => cat._id === value);
            setSelectedProductCategory(found || null);
        }

        if (selectCategory === "theme") {
            setFormData(prev => ({
                ...prev,
                subCategory: ""
            }));
        }
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append('name', formData.name);
        data.append('rate', formData.rate);
        data.append('discount', formData.discount);
        data.append('categoryType', formData.categoryType);
        data.append('categoryId', formData.categoryId);
        if (formData.subCategory) data.append('subCategory', formData.subCategory);
        data.append('description', formData.description);
        data.append('faq', formData.faq);
        data.append('contact', formData.contact);
        if (mainPhoto) data.append('photo', mainPhoto);
        photos.forEach(file => data.append('photos', file));

        console.log('Sending form data...');

        const response = await addProduct(data).unwrap()
        // await axios.post('/api/product', data);
    };


    console.log("form data is ", formData);




    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-2 text-center">Add New Product</h1>

            <div className="flex gap-6 mb-4">
                <button
                    onClick={() => setStep("one")}
                    className={`
      relative px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 
      transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 
      ${step === "one"
                            ? 'bg-[#06425F] text-white shadow-[#06425F] focus:ring-[#06425F]'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300'
                        }
    `}
                >
                    <span className="flex items-center gap-2">
                        <span className={`
        w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold
        ${step === "one" ? 'bg-white text-black' : 'bg-white text-black'}
      `}>
                            1
                        </span>
                        Step One
                    </span>
                    {step === "one" && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#06425F]"></div>
                    )}
                </button>
                
                <button
                    onClick={() => setStep("two")}
                    className={`
      relative px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 
      transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4
      ${step === "two"
                            ? 'bg-[#06425F] text-white shadow-[#06425F] focus:ring-[#06425F]'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300'
                        }
    `}
                >
                    <span className="flex items-center gap-2">
                        <span className={`
        w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold
        ${step === "one" ? 'bg-white text-black' : 'bg-white text-black'}
      `}>
                            2
                        </span>
                        Step Two
                    </span>
                    {step === "two" && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#06425F]"></div>
                    )}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">

                {/* Step 1 */}
                {
                    step === "one" &&
                    <div>
                        <div className="bg-white p-6 rounded-xl shadow border space-y-6">
                            <h2 className="text-xl font-semibold text-indigo-700">Step 1: Required Fields</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-1 font-medium">Product Title</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" required />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Rate (₹)</label>
                                    <input type="number" name="rate" value={formData.rate} onChange={handleChange} className="w-full border p-2 rounded" required />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Discount (%)</label>
                                    <input type="number" name="discount" value={formData.discount} onChange={handleChange} className="w-full border p-2 rounded" required />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Main Photo</label>
                                    <input type="file" accept="image/*" onChange={(e) => setMainPhoto(e.target.files[0])} className="w-full border p-2 rounded" required />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Multiple Photos</label>
                                    <input type="file" accept="image/*" multiple onChange={(e) => setPhotos([...e.target.files])} className="w-full border p-2 rounded" />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Category Type</label>
                                    <select
                                        name="categoryType"
                                        value={formData?.categoryType}
                                        onChange={(e) => {
                                            handleChange(e); // to update formData
                                            setSelectCategory(e.target.value); // to update category type state
                                        }}
                                        className="w-full border p-2 rounded"
                                    >
                                        <option value="">Select Category Type</option>
                                        <option value="product">Product Category</option>
                                        <option value="brand">Brand Category</option>
                                        <option value="theme">Theme Category</option>
                                    </select>

                                </div>

                                {selectCategory === "brand" &&

                                    <div>
                                        <label className="block mb-1 font-medium">Category</label>
                                        <select name="categoryId" value={formData?.categoryId} onChange={handleChange} className="w-full border p-2 rounded" required>
                                            <option value="">Select Category</option>
                                            {Array.isArray(brandData) && brandData && brandData.map((cat) => (
                                                <option key={cat?._id} value={cat?._id}>{cat?.brandName}</option>
                                            ))}
                                        </select>
                                    </div>

                                }



                                {selectCategory === "theme" &&

                                    <div>
                                        <label className="block mb-1 font-medium">Category</label>
                                        <select name="categoryId" value={formData?.categoryId} onChange={handleChange} className="w-full border p-2 rounded" required>
                                            <option value="">Select Category</option>
                                            {Array.isArray(themeData) && themeData && themeData.map((cat) => (
                                                <option key={cat?._id} value={cat?._id}>{cat?.themeName}</option>
                                            ))}
                                        </select>
                                    </div>

                                }

                                {selectCategory === 'product' && (

                                    <div>
                                        <label className="block mb-1 font-medium">Category</label>
                                        <select name="categoryId" value={formData?.categoryId} onChange={handleChange} className="w-full border p-2 rounded" required>
                                            <option value="">Select Category</option>
                                            {Array.isArray(productCMainData) && productCMainData && productCMainData.map((cat) => (
                                                <option key={cat?._id} value={cat?._id}>{cat?.category}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Show Subcategory Dropdown if Available */}
                                {selectCategory === "product" &&
                                    selectedProductCategory?.subCategory?.length > 0 && (
                                        <div className="mb-4">
                                            <label className="block mb-1 font-medium">Sub Category</label>
                                            <select
                                                name="subCategory"
                                                value={formData.subCategory}
                                                onChange={handleChange}
                                                className="w-full border p-2 rounded"
                                            >
                                                <option value="">Select Sub Category</option>
                                                {selectedProductCategory.subCategory.map((sub, idx) => (
                                                    <option key={idx} value={sub}>
                                                        {sub}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}





                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button onClick={() => setStep("two")} className="bg-indigo-600 text-white px-6 py-2 rounded shadow hover:bg-indigo-700">
                                Next
                            </button>
                        </div>
                    </div>

                }





                {/* Step 2 - Tabs */}

                {step === "two" &&
                    <div>


                        <div className="bg-gray-50 p-6 rounded-xl shadow border">
                            <h2 className="text-xl font-semibold text-green-700 mb-4">
                                Step 2: Additional Content
                            </h2>

                            {/* Tabs */}
                            <div className="flex gap-4 mb-4">
                                {['description', 'faq', 'contact'].map((key) => (
                                    <button
                                        type="button"
                                        key={key}
                                        className={`px-4 py-2 rounded ${tab === key ? 'bg-green-600 text-white' : 'bg-white border'
                                            }`}
                                        onClick={() => setTab(key)}
                                    >
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </button>
                                ))}
                            </div>

                            {/* Editor Area */}
                            <div className="bg-white p-4 rounded border">
                                <label className="font-medium block mb-2 capitalize">{tab}</label>
                                <SunEditor
                                    key={tab} // 🔑 This ensures a new editor is mounted when tab changes
                                    setOptions={{ height: 200 }}
                                    defaultValue={formData[tab] || ""}
                                    onChange={(content) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [tab]: content,
                                        }))
                                    }
                                />
                            </div>
                        </div>


                        <div className="text-center">
                            <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded shadow hover:bg-indigo-700">
                                Submit Product
                            </button>
                        </div>

                    </div>

                }



                {/* Submit */}

            </form >
        </div >
    );
};

export default Product;
