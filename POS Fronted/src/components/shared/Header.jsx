import React from 'react'
import { FaSearch, FaUserCircle, FaBell } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import logo from '../../assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../../https';
import { removeUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';

const Header = () => {

    const userData = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutMutation = useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            dispatch(removeUser());
            navigate("/auth");
        }
    });

    const hanleLogout = () => {
        logoutMutation.mutate();
    }

    return (
        <header className="flex flex-wrap items-center justify-between gap-3 py-3 px-5 lg:px-8 bg-[#1a1a1a] cursor-pointer">

            {/* Logo */}
            <div onClick={() => navigate("/")} className="flex items-center gap-2">
                <img src={logo} className="h-9 w-9" alt="logo" />
                <h1 className="text-lg font-semibold text-[#f5f5f5]">RestroOrder</h1>
            </div>

            {/* Search Bar */}
            <div className="order-3 w-full lg:order-none lg:w-auto flex items-center gap-2 bg-[#1f1f1f] rounded-[15px] px-4 py-2 sm:px-5 sm:w-full md:w-full ">
                <FaSearch className="text-[#f5f5f5]" />
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none text-[#f5f5f5] w-99"
                />
            </div>


            {/* Right Section */}
            <div className="flex items-center gap-3 sm:gap-4">

                {userData.role === 'Admin' && (
                    <div
                        onClick={() => navigate("/dashboard")}
                        className="bg-[#1f1f1f] p-2 sm:p-3 rounded-[15px] cursor-pointer"
                    >
                        <MdDashboard className="text-[#f5f5f5] text-xl sm:text-2xl" />
                    </div>
                )}

                <div className="bg-[#1f1f1f] p-2 sm:p-3 rounded-[15px] cursor-pointer">
                    <FaBell className="text-[#f5f5f5] text-xl sm:text-2xl" />
                </div>

                {/* User Info */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <FaUserCircle className="text-[#f5f5f5] text-3xl sm:text-4xl" />

                    {/* Name hide on very small screens */}
                    <div className="hidden sm:flex flex-col">
                        <h1 className="text-sm sm:text-md text-[#f5f5f5] font-semibold">
                            {userData.name || "TEST USER"}
                        </h1>
                        <p className="text-xs text-[#ababab] font-medium">
                            {userData.role || "Role"}
                        </p>
                    </div>

                    <IoLogOut
                        onClick={hanleLogout}
                        className="text-[#f5f5f5] cursor-pointer"
                        size={32}
                    />
                </div>
            </div>
        </header>
    )
}

export default Header
