import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function ProductForm({
    title: existingTitle,
    description: existingDescription,
    price: existingPrice
}) {
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');

    async function handleSubmit(e) {
        e.preventDefault();
        if (_id) {
            //update
        }
        const data = {title, description, price};
        axios.post('/api/products', data);
        router.push('/products');
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
