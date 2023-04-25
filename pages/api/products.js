import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    const {method} = req;
    await mongooseConnect();
    await isAdminRequest(req,res);

    if(method === 'GET') {
        if (req.query?.id) {
            const product = await Product.findOne({_id:req.query.id});
            return res.json(product);
        }
        const products = await Product.find();
        return res.json(products);
    }

    if(method === 'POST') {
        const {title,description,images,price,category, properties} = req.body;
        const productDoc = await Product.create({
            title,
            description,
            images,
            price,
            category,
            properties,
        })
        return res.json(productDoc);
    }
    
    if(method === 'PUT') {
        const {title,description,images,price,_id,category, properties} = req.body;
        await Product.updateOne({_id}, {title,description,images,price,category, properties});
        return res.json(true);
    }

    if(method === 'DELETE') {
        if (req.query?.id){
            await Product.deleteOne({_id:req.query?.id});
            return res.json(true);
        }
    }

    return res.status(404).send("Not found");
}