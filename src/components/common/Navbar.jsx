import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { ProfileDropDown } from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { BsChevronDown } from 'react-icons/bs'

// const subLinks = [
//     {
//         title: "Python",
//         link: "/catalog/python"
//     }
//     , {
//         title: "web dev",
//         link: "/catalog/web-development"
//     }
// ];

export const Navbar = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing Sublinks result: ", result);
            setSubLinks(result.data.categories);
        } catch (error) {
            console.log("Could not fetch the category list");
            console.log(error);
        }

    }
    useEffect(() => {
        fetchSubLinks();
    }, []);

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }
    return (
        <div className='flex h-14 items-center justify-center border-b border-richblack-700'>

            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                {/* Image */}
                <Link to={"/"}>
                    <img src={logo} width={160} height={42} loading='lazy' />
                </Link>

                {/* Nav Links */}
                <nav>

                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === 'Catalog' ? (
                                            <div className='flex items-center gap-2 group relative'>

                                                <p>{link.title}</p>
                                                <BsChevronDown />
                                                
                                                <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[5%] top-[50%] flex
                                                flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                                opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] z-50'>

                                                    <div className='absolute left-[50%] top-[-5%] h-6 w-6 rotate-45 rounded bg-richblack-5 translate-x-[86%] z-50'>

                                                    </div >

                                                    {
                                                        subLinks.length > 0 ? (

                                                            subLinks.map((subLi, index) => {
                                                                return (
                                                                    <Link to={`/catalog/${subLi.name}`} key={index}>
                                                                        {subLi.name}
                                                                    </Link>
                                                                );
                                                            })
                                                        ) : (<div>No Sublinks Avialable</div>)
                                                    }

                                                </div>



                                            </div>
                                        )
                                            :
                                            (<Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>)
                                    }
                                </li>
                            ))
                        }

                    </ul>

                </nav>

                {/* Login/SignUp/Dashboard */}
                <div className='flex gap-x-4 items-center'>

                    {
                        user && user?.accountType != 'Instructor' && (

                            <Link to={"/dashboard/cart"} className='relative'>
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/login"}>

                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-2 text-richblack-100 rounded-md'>
                                    Log In
                                </button>

                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/signup"}>

                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-2 text-richblack-100 rounded-md'>
                                    Sign Up
                                </button>

                            </Link>
                        )
                    }
                    {
                        token != null && <ProfileDropDown />
                    }


                </div>



            </div>

        </div>
    )
}
