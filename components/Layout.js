import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";
import { BiMenu } from "react-icons/bi";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({children}) {
    const [showNav, setShowNav] = useState(false);
    const { data: session } = useSession();

    if(!session) {
        return (
        <div className="bg-bgGray w-screen h-screen flex items-center">
            <div className="text-center w-full">
                <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg">Login with Google</button>
            </div>
        </div>
        );
    }
    
    return (
        <div className="bg-bgGray min-h-screen">
            <div className="block md:hidden flex items-center p-4 text-lg">
                <button onClick={() => setShowNav(true)}>
                    <BiMenu />
                </button>
                <div className="flex grow justify-center mr-6">
                    <Logo />
                </div>
            </div>
            <div className="flex">
                <Nav show={showNav}/>
                <div className="flex-grow rounded-lg p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}