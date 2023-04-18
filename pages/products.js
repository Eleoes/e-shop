/* eslint-disable react/jsx-key */
import Layout from "@/components/Layout";
import Link from "next/link";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiEdit } from "react-icons/bi";

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
            <Link href="/products/new" className="bg-blue-900 text-white rounded-md py-1 px-2">Add Product</Link>
            <table className="basic my-2">
                <thead>
                    <tr>
                        <td>Product name</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr>
                            <td>{product.title}</td>
                            <td>
                                <Link href={'/products/edit/'+product._id}>
                                    <BiEdit />
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}