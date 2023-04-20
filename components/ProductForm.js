import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BiUpload } from "react-icons/bi";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: assignedCategory,
}) {
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [isUploading, setIsUploading] = useState(false);
    const [category, setCategory] = useState(assignedCategory || '');
    const [categories, setCategories] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        const data = {title, description, price, images, category};
        if (_id) {
            //update
            await axios.put('/api/products', {...data,_id});
            router.push('/products');
        } else {
            await axios.post('/api/products', data);
            router.push('/products');
        }
    }
    
    async function uploadImages(e) {
        // console.log(e);
        const files = e.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }

    function updateImagesOrder(images) {
        // console.log(images);
        setImages(images);
    }

    useEffect(()=> {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }, []);

    useEffect(() => {
        router.prefetch('/products');
    }, [router]);
    
    return (
        <form onSubmit={handleSubmit}>
            <label>Product name</label>
            <input 
                type="text" 
                placeholder="Product name" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
            />
            <label>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">Uncategorized</option>
                {categories?.length > 0 && categories.map(category=> (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
            <label>Images</label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable 
                    list={images} 
                    setList={updateImagesOrder}
                    className="flex flex-wrap gap-1"
                >
                    {!!images?.length && images.map(link => (
                        <div key={link} className="h-24">
                            <img src={link} alt="" className="rounded-lg"/>
                        </div>
                    ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 p-1 flex items-center">
                        <Spinner />
                    </div>
                )}
                <label className="w-24 h-24 flex flex-col gap-1 items-center justify-center text-gray-500 rounded-lg cursor-pointer bg-gray-200">
                    <BiUpload />
                    <span className="text-sm">Upload</span>
                    <input type="file" onChange={uploadImages}className="hidden"/> 
                </label>
            </div>
            <label>Description</label>
            <textarea 
                placeholder="Product description" 
                value={description}
                onChange={e => setDescription(e.target.value)}
            ></textarea>
            <label>Price ($ USD)</label>
            <input 
                type="number" 
                placeholder="Price" 
                value={price}
                onChange={e => setPrice(e.target.value)}
            />
            <button type="submit" className="btn-primary">Save</button>
        </form>
    );
}
