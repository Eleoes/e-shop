import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

function Categories({swal}) {
    const [isEditing, setIsEditing] = useState(null);
    const [name, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }

    async function saveCategory(e) {
        e.preventDefault();
        const data = {
            name, 
            parentCategory, 
            properties: properties.map(p => ({
                name:p.name, 
                values:p.values.split(','),
            })),
        };

        if (isEditing) {
            data._id = isEditing._id;
            await axios.put('/api/categories', data);
            setIsEditing(null);
        } else {
            await axios.post('/api/categories',data);
        }
        setName('');
        setParentCategory('');
        setProperties([]);
        fetchCategories();
    }

    function editCategory(category) {
        setIsEditing(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
        setProperties(
            category.properties.map(({name, values}) => ({
                name,
                values: values.join(','),
            })));
    }

    function deleteCategory(category){
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if (result.isConfirmed) {
            const {_id} = category;
            await axios.delete('/api/categories?_id='+_id);
            fetchCategories();
            }
        });
    }

    function addProperty(){
        setProperties(prev => {
            return [...prev, {name:'',values:'',properties}];
        });
    }

    function handlePropertyNameChange(index, property, newName) {
        // console.log({index, property, newName});
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        });
    }

    function handlePropertyValuesChange(index, property, newValues) {
        // console.log({index, property, newValues});
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties;
        });
    }
    
    function removeProperty(indexToRemove) {
        setProperties(prev => {
            return [...prev].filter((p, pIndex) => {
                return pIndex !== indexToRemove;
            });
        })
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>{isEditing ? `Edit category ${isEditing.name}` : 'Create new category'}</label>
            <form onSubmit={saveCategory}className="">
                <div className="flex gap-1">
                    <input 
                        className="" 
                        type="text" 
                        placeholder={'Category name'}
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                    <select 
                        className="" 
                        onChange={e => setParentCategory(e.target.value)}
                        value={parentCategory}
                        >
                        <option value="">No parent category</option>
                        {categories.length > 0 && categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button 
                        type="button" 
                        className="btn-default text-sm mb-2"
                        onClick={addProperty}
                    >
                        Add new property
                    </button>
                    {properties.length > 0 && properties.map((property, index) => (
                        <div key={property._id} className="flex gap-1 mb-2">
                            <input 
                                type="text" 
                                value={property.name}
                                className="mb-0" 
                                onChange={e => handlePropertyNameChange(index, property, e.target.value)}
                                placeholder="Property name (example: color)" 
                            />
                            <input 
                                type="text" 
                                value={property.values} 
                                className="mb-0" 
                                onChange={e => handlePropertyValuesChange(index, property, e.target.value)}
                                placeholder="Values, comma separated" 
                            />
                            <button 
                                className="btn-default"
                                type="button"
                                onClick={() => removeProperty(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-1">
                    {isEditing && (
                        <button 
                            className="btn-default"
                            type="button"
                            onClick={() => {
                                setIsEditing(null);
                                setName('');
                                setParentCategory('');
                                setProperties([]);
                            }}
                        >
                            Cancel
                        </button>
                    )}
                    <button 
                        type="submit" 
                        className="btn-primary"
                    >
                        Save
                    </button>
                </div>
            </form>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Category name</td>
                        <td>Parent category</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            <td>
                                <button 
                                    onClick={() => editCategory(category)}
                                    className="btn-primary mr-1"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={()=> deleteCategory(category)}
                                    className="btn-primary">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
};

export default withSwal(({swal}, ref) => (
    <Categories swal={swal} />
));