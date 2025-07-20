import React, { useState, useEffect } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import axios from 'axios';
import { useGetAllBrandNameQuery } from '@/Rtk/brandTagApi';
import { useGetAllThemeTagQuery } from '@/Rtk/packageApi';
import { useGetAllLabTestTagQuery } from '@/Rtk/labTestTag';
import { useAddProductMutation, useEditProductMutation, useGetProductDetailQuery } from '@/Rtk/productApi';
import { data } from 'autoprefixer';
import { X } from 'lucide-react'; // Or use any close icon you prefer
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../Loading/SpinLoading';

const Product = () => {

    const { id } = useParams()
    const { data: brandData, isLoading: isBrandLoading } = useGetAllBrandNameQuery()
    const { data: themeData, isLoading: isThemeLoading } = useGetAllThemeTagQuery()
    const { data: productCMainData, isLoading: isProductCMainData } = useGetAllLabTestTagQuery()
    const { data: productDetailData, isLoading: isProductDetailLoading } = useGetProductDetailQuery(id, {
        skip: !id,
    })

    const [addProduct, { isLoading, isError, isSuccess }] = useAddProductMutation();
    const [selectedCategoryTypes, setSelectedCategoryTypes] = useState([]);
    const [editProduct] = useEditProductMutation();

    const [loading, setLoading] = useState(false)



    const [formData, setFormData] = useState({
        name: '',
        rate: '',
        discount: '',
        categoryType: '',
        categoryId: '',
        subCategory: '',
        description: '',
        faq: '',
        contact: '',
        productId: "",
        brandId: "",
        themeId: "",
    });

    const [mainPhoto, setMainPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [tab, setTab] = useState('description');
    const [step, setStep] = useState("one")
    const [selectedProductCategory, setSelectedProductCategory] = useState(null);
    const [dltMainPhoto, setDltMainPhoto] = useState(false)

    const navigate = useNavigate()

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
        if (name === "productId" && selectedCategoryTypes.includes("product")) {
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


    // Handle multi-category type selection
    const handleCategoryTypeChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map((opt) => opt.value);
        setSelectedCategoryTypes(selectedOptions);
    };



    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        const newPhotos = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));



        setPhotos(prev => [...prev, ...newPhotos]);
    };

    const removePhoto = (index) => {
        const updatedPhotos = [...photos];
        updatedPhotos.splice(index, 1);
        setPhotos(updatedPhotos);
    };


    const handleMainPhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMainPhoto(file);
            setPreview(URL.createObjectURL(file));
        }
        setDltMainPhoto(false)
    };

    const removeMainPhoto = () => {
        setMainPhoto(null);
        setPreview(null);
        setDltMainPhoto(true)
    };





    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const data = new FormData();
            setLoading(true);

            console.log(formData);
            

            data.append('name', formData.name);
            data.append('rate', formData.rate);
            data.append('discount', formData.discount || 0);
            data.append('productId', formData?.productId)
            data.append('themeId', formData?.themeId)
            data.append('brandId', formData?.brandId)
            // data.append('categoryType', formData.categoryType);
            // data.append('categoryId', formData.categoryId);
            if (formData?.subCategory) data.append('subCategory', formData?.subCategory);
            data.append('description', formData.description);
            data.append('faq', formData.faq);
            data.append('contact', formData.contact);
            if (mainPhoto) data.append('photo', mainPhoto);
            if (dltMainPhoto) data.append('mainPhotoDeleted', 'true')
            const photoMeta = photos.map(p => ({
                isExisting: p.isExisting,
                public_id: p.public_id,
                preview: p.preview,
            }));

            data.append("photos", JSON.stringify(photoMeta));

            // photos.forEach(photo => {

            //     data.append('photos', photo.file); // append only the File, not the object
            // });

            photos.forEach(photo => {
                if (photo.file) {
                    data.append('photos', photo.file);
                }
            });

            let response;

            if (id) {
                response = await editProduct({ data, id }).unwrap();
            } else {
                response = await addProduct(data).unwrap();
            }


            setLoading(false);


            if (response?.success) {
                setFormData({
                    name: '',
                    rate: '',
                    discount: '',
                    categoryType: '',
                    categoryId: '',
                    subCategory: '', // If needed, set this from productDetailData
                    description: '',
                    faq: '',
                    contact: ''
                });

                setPhotos([])
                setPreview(null)
                setMainPhoto(null)

                setCategoryOptions([])
                setSubCategories([])
                setStep("one")
                setSelectedProductCategory(null)
                setSelectedCategoryTypes([])

            }

        } catch (error) {
            console.error('Submission failed:', error);
            setLoading(false);
        }
    };


    // When productDetailData arrives, update formData
    useEffect(() => {
        if (productDetailData) {
            setFormData({
                name: productDetailData?.title || '',
                rate: productDetailData?.rate || '',
                discount: productDetailData?.discount || '',
                categoryType: productDetailData?.categoryType || '',
                categoryId: productDetailData?.categoryId || '',
                subCategory: productDetailData?.subCategory || '', // ✅ Set subCategory here
                description: productDetailData?.description || '',
                faq: productDetailData?.faq || '',
                contact: productDetailData?.contact || '',
                productId: productDetailData?.productId,
                themeId: productDetailData?.themeId,
                brandId: productDetailData?.brandId
            });

            const selectedTypes = [];

            if (productDetailData?.productId) {
                selectedTypes.push("product");
            }

            if (productDetailData?.brandId) {
                selectedTypes.push("brand");
            }

            if (productDetailData?.themeId) {
                selectedTypes.push("theme");
            }

            setSelectedCategoryTypes(selectedTypes);

            // Set main photo + preview
            if (productDetailData.mainPhoto) {
                setMainPhoto(null);
                setPreview(productDetailData?.mainPhoto?.secure_url);
            }

            // Set multiple photos
            if (productDetailData.photos) {
                const existingPhotos = productDetailData?.photos.map(photo => ({
                    preview: photo?.secure_url,
                    public_id: photo?.public_id,
                    isExisting: true
                }));
                setPhotos(existingPhotos);
            }

            // ✅ Set selected product category for subCategory options
            if (productDetailData?.productId && selectedTypes.includes("product")) {
                const found = productCMainData?.find((cat) => cat._id === productDetailData.productId);
                setSelectedProductCategory(found || null);
            }
        }
    }, [productDetailData, productCMainData]);






    return (
        <div className=" mx-auto px-4 py-2">
            <div className="flex items-center justify-between mb-2 mt-2">
                <h1 className="text-2xl font-bold mb-2 text-center">{id ? "Edit New Product" : "Add New Product"}</h1>
                <button
                    className="bg-[#06425F] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    onClick={() => navigate("/dashboard/products/all")}
                >
                    View Product
                </button>
            </div>


            <div className="flex gap-6 mb-4 max-w-5xl">
                <button
                    onClick={() => setStep("one")}
                    className={` relative px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300  transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4  ${step === "one"
                        ? 'bg-[#06425F] text-white shadow-[#06425F] focus:ring-[#06425F]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300'
                        }`}
                >
                    <span className="flex items-center gap-2">
                        <span className={`   w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${step === "one" ? 'bg-white text-black' : 'bg-white text-black'}
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
                                    {preview ? (
                                        <div className="relative w-32 h-32 mb-4">
                                            <img
                                                src={preview}
                                                alt="Main Preview"
                                                className="w-full h-full object-cover rounded"
                                            />
                                            <button
                                                onClick={removeMainPhoto}
                                                className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleMainPhotoChange}
                                            className="w-full border p-2 rounded"
                                            required
                                        />
                                    )}
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Multiple Photos</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handlePhotoChange}
                                        className="w-full border p-2 rounded mb-4"
                                    />

                                    <div className="flex flex-wrap gap-4">
                                        {photos.map((photo, index) => (
                                            <div key={index} className="relative w-24 h-24">
                                                <img
                                                    src={photo.preview}
                                                    alt="preview"
                                                    className="w-full h-full object-cover rounded"
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault(); // 🛑 stop accidental submit
                                                        removePhoto(index);
                                                    }}
                                                    type="button"  // ✅ Add this line
                                                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                {/* Multi-select Category Type */}
                                <div>
                                    <label className="block mb-1 font-medium">Category Types</label>
                                    <div className="border p-3 rounded space-y-2">
                                        {["product", "brand", "theme"].map((type) => (
                                            <label key={type} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    value={type}
                                                    checked={selectedCategoryTypes.includes(type)}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        setSelectedCategoryTypes((prev) =>
                                                            e.target.checked
                                                                ? [...prev, value]
                                                                : prev.filter((v) => v !== value)
                                                        );
                                                    }}
                                                    className="form-checkbox h-4 w-4 text-blue-600"
                                                />
                                                <span className="capitalize">{type} Category</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>


                                {/* Product Category Dropdown */}
                                {selectedCategoryTypes.includes("product") && (
                                    <div>
                                        <label className="block mb-1 font-medium">Product Category</label>
                                        <select
                                            name="productId"
                                            value={formData.productId}
                                            onChange={handleChange}
                                            className="w-full border p-2 rounded"
                                            required
                                        >
                                            <option value="">Select Product</option>
                                            {productCMainData?.map((cat) => (
                                                <option key={cat._id} value={cat._id}>{cat.category}</option>
                                            ))}
                                        </select>

                                        {/* Subcategory if available */}
                                        {selectedProductCategory?.subCategory?.length > 0 && (
                                            <div className="mt-2">
                                                <label className="block mb-1 font-medium">Sub Category</label>
                                                <select
                                                    name="subCategory"
                                                    value={formData.subCategory}
                                                    onChange={handleChange}
                                                    className="w-full border p-2 rounded"
                                                >
                                                    <option value="">Select Sub Category</option>
                                                    {selectedProductCategory.subCategory.map((sub, idx) => (
                                                        <option key={idx} value={sub}>{sub}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Brand Category Dropdown */}
                                {selectedCategoryTypes.includes("brand") && (
                                    <div>
                                        <label className="block mb-1 font-medium">Brand Category</label>
                                        <select
                                            name="brandId"
                                            value={formData.brandId}
                                            onChange={handleChange}
                                            className="w-full border p-2 rounded"
                                            required
                                        >
                                            <option value="">Select Brand</option>
                                            {brandData?.map((cat) => (
                                                <option key={cat._id} value={cat._id}>{cat.brandName}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Theme Category Dropdown */}
                                {selectedCategoryTypes.includes("theme") && (
                                    <div>
                                        <label className="block mb-1 font-medium">Theme Category</label>
                                        <select
                                            name="themeId"
                                            value={formData.themeId}
                                            onChange={handleChange}
                                            className="w-full border p-2 rounded"
                                            required
                                        >
                                            <option value="">Select Theme</option>
                                            {themeData?.map((cat) => (
                                                <option key={cat._id} value={cat._id}>{cat.themeName}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}


                                {/* <div>
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

                                </div> */}

                                {/* {selectCategory === "brand" &&

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
                                    )} */}

                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button onClick={() => setStep("two")} className="bg-[#06425F] text-white px-6 py-2 rounded shadow hover:bg-indigo-700">
                                Next
                            </button>
                        </div>
                    </div>

                }





                {/* Step 2 - Tabs */}

                {step === "two" &&
                    <div>


                        <div className="bg-gray-50 p-6 rounded-xl shadow border">
                            <h2 className="text-xl font-semibold text-[#06425F] mb-4">
                                Step 2: Additional Content
                            </h2>

                            {/* Tabs */}
                            <div className="flex gap-4 mb-4">
                                {['description', 'faq', 'contact'].map((key) => (
                                    <button
                                        type="button"
                                        key={key}
                                        className={`px-4 py-2 rounded ${tab === key ? 'bg-[#06425F] text-white' : 'bg-white border'
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


                        <div className="text-center flex items-center justify-center">
                            {loading ? <Spinner /> :
                                <button type="submit" className="bg-[#06425F] text-white mt-4 px-6 py-2 rounded shadow hover:bg-indigo-700">
                                    {id ? "Save Product " : "Submit Product"}
                                </button>
                            }
                        </div>

                    </div>

                }



                {/* Submit */}

            </form >
        </div >
    );
};

export default Product;
