import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BiUpload } from "react-icons/bi";


export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images,
}) {
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');

    async function handleSubmit(e) {
        e.preventDefault();
        const data = {title, description, price};
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
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            console.log(res.data);
        }
    }

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
            <label>Images</label>
            <div className="mb-2">
                <label className="w-24 h-24 flex flex-col gap-1 items-center justify-center text-gray-500 rounded-lg cursor-pointer bg-gray-200">
                    <BiUpload />
                    <span className="text-sm">Upload</span>
                    <input type="file" onChange={uploadImages}className="hidden"/> 
                </label>
                {!images?.length && (
                    <div>No images in this product</div>
                )}
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
