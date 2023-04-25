import  Link  from "next/link";
import { BiStore } from "react-icons/bi";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <BiStore />
            <span className="">E-ShopAdmin</span>
        </Link>
    );
}