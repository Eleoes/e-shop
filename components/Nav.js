import { BiStore, BiHomeAlt, BiCog, BiListUl, BiPackage, BiCategory, BiLogOut } from "react-icons/bi";
import  Link  from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export default function Nav() {
    const inactiveLink = 'flex gap-2 p-1 items-center';
    const activeLink = inactiveLink + ' bg-white text-blue-900 rounded-l-lg';
    const router = useRouter();
    // console.log({router});
    const {pathname} = router;

    async function logOut() {
        await router.push('/');
        await signOut();
    }

    return (
        <aside className="text-white p-4 pr-0">
            <Link href="/" className="flex items-center gap-2 mb-4 mr-4">
                <BiStore />
                <span className="">E-ShopAdmin</span>
            </Link>
            <nav className="flex flex-col gap-2">
                <Link href="/" className={pathname === '/' ? activeLink : inactiveLink}>
                    <BiHomeAlt />
                    Dashboard
                </Link>
                <Link href="/products" className={pathname.includes('/products') ? activeLink : inactiveLink}>
                    <BiPackage />
                    Products
                </Link>
                <Link href="/categories" className={pathname.includes('/categories') ? activeLink : inactiveLink}>
                    <BiCategory />
                    Categories
                </Link>
                <Link href="/orders" className={pathname.includes('/orders') ? activeLink : inactiveLink}>
                    <BiListUl />
                    Orders
                </Link>
                <Link href="/settings" className={pathname.includes('/settings') ? activeLink : inactiveLink}>
                    <BiCog />
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