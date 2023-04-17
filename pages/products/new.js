import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';

export default function NewProduct() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const data = {title, description, price};
        axios.post('/api/products', data);
        router.push('/products');
    }
    
    useEffect(() => {
        router.prefetch('/products');
    }, [router]);
    
    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <h1>New Product</h1>

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
        </Layout>
    );
}