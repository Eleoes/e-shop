import { BiStore, BiHomeAlt, BiCog, BiListUl, BiPackage, BiCategory, BiLogOut } from "react-icons/bi";
import  Link  from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Logo from "@/components/Logo";

export default function Nav({show}) {
    const inactiveLink = "flex gap-2 p-1 items-center";
    const activeLink = inactiveLink + " bg-highlight text-black rounded-md";
    const inactiveIcon = "";
    const activeIcon = inactiveIcon + " text-primary";
    const router = useRouter();
    // console.log({router});
    const {pathname} = router;

    async function logOut() {
        await router.push('/');
        await signOut();
    }

    return (
        <aside className={(show ? "left-0" : "-left-full") + " top-0 text-gray-500 p-4 fixed w-full bg-bgGray h-full md:static md:w-auto transition-all"}>
            <div className="mb-4 mr-4">
                <Logo />    
            </div>
            <nav className="flex flex-col gap-2">
                <Link href="/" className={pathname === '/' ? activeLink : inactiveLink}>
                    <BiHomeAlt className={pathname === '/' ? activeIcon : inactiveIcon}/>
                    Dashboard
                </Link>
                <Link href="/products" className={pathname.includes('/products') ? activeLink : inactiveLink}>
                    <BiPackage className={pathname.includes('/products') ? activeIcon : inactiveIcon}/>
                    Products
                </Link>
                <Link href="/categories" className={pathname.includes('/categories') ? activeLink : inactiveLink}>
                    <BiCategory className={pathname.includes('/categories') ? activeIcon : inactiveIcon}/>
                    Categories
                </Link>
                <Link href="/orders" className={pathname.includes('/orders') ? activeLink : inactiveLink}>
                    <BiListUl className={pathname.includes('/orders') ? activeIcon : inactiveIcon}/>
                    Orders
                </Link>
                <Link href="/settings" className={pathname.includes('/settings') ? activeLink : inactiveLink}>
                    <BiCog className={pathname.includes('/settings') ? activeIcon : inactiveIcon}/>
                    Settings
                </Link>
                <button onClick={logOut} className={inactiveLink}>
                    <BiLogOut/>
                    Log Out
                </button>
            </nav>
        </aside>
    );
}