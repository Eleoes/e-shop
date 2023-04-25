/* eslint-disable react/jsx-key */
import Layout from "@/components/Layout";
import Link from "next/link";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiEdit, BiTrash } from "react-icons/bi";

export default function Products() {
    const [products, setProducts] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('/api/products').then(response => {
            setProducts(response.data)
        });
    }, []);

    // if (isLoading) return <p>Loading...</p>
    if (!products) return <p>No products data</p>

    return (
        <Layout>
            <Link href="/products/new" className="btn-primary">Add Product</Link>
            <table className="basic my-2">
                <thead>
                    <tr>
                        <td>Product name</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.title}</td>
                            <td>
                                <Link 
                                    href={'/products/edit/'+product._id}
                                    className="btn-default">
                                    <BiEdit />
                                    Edit
                                </Link>
                                <Link 
                                    href={'/products/delete/'+product._id}
                                    className="btn-red">
                                    <BiTrash />
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}