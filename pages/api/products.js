import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
    const {method} = req;
    await mongooseConnect();

    if(method === 'GET') {
        if (req.query?.id) {
            const product = await Product.findOne({_id:req.query.id});
            return res.json(product);
        }
        const products = await Product.find();
        return res.json(products);
    }

    if(method === 'POST') {
        const {title,description,images,price,category} = req.body;
        const productDoc = await Product.create({
            title,
            description,
            images,
            price,
            category,
        })
        return res.json(productDoc);
    }
    
    if(method === 'PUT') {
        const {title,description,images,price,_id,category} = req.body;
        await Product.updateOne({_id}, {title,description,images,price,category});
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