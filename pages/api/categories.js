import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req,res) {
    const {method} = req;
    await mongooseConnect();

    if (method === 'GET'){
        const categories = await Category.find().populate('parent');
        return res.json(categories);
    }

    if (method === 'POST'){
        const {name, parentCategory, properties} = req.body;
        const categoryDoc = await Category.create({
            name,
            parent:parentCategory || undefined,
            properties,
        });
        return res.json(categoryDoc);
    }

    if (method === 'PUT'){
        const {name, parentCategory, _id, properties} = req.body;
        const categoryDoc = await Category.updateOne({_id},{
            name,
            parent:parentCategory || undefined,
            properties,
        });
        return res.json(categoryDoc);
    }

    if (method === 'DELETE') {
        const {_id} = req.query;
        await Category.deleteOne({_id});
        res.json('ok');
    }

    return res.status(404).send("Not found");
}