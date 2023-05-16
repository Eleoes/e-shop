import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req,res) {
    //connect to db
    await mongooseConnect();
    res.json(await Order.find().sort({createdAt:-1}));
}