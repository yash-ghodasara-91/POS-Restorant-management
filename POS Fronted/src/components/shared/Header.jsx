import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
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
        onSuccess: (data) => {
            console.log(data);
            dispatch(removeUser());
            navigate("/auth");
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const hanleLogout = () => {
        logoutMutation.mutate();
    }

    return (
        <header className="flex items-center justify-between py-4 lg:px-8 md:px-4 bg-[#1a1a1a]">
            {/* Logo or Brand Name */}
            <div className="flex items-center gap-2">
                <img src={logo} className='h-8 w-8' alt="restorant logo" />
                <h1 className="text-lg font-semibold text-[#f5f5f5]">RestroOrder</h1>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-2 bg-[#1f1f1f] rounded-[15px] px-5 py-2 lg:w-[555px] md:w-[200px] sm:w-[250px]">
                <FaSearch className="text-[#f5f5f5]" />
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-[#1f1f1f] outline-none  text-[#f5f5f5] lg:w-[500px] md:w-[135px] sm:w-[100px] "
                />
            </div>

            {/* Logged User Details */}
            <div className="flex items-center ml-3 gap-4 md:gap-2">
                {
                    userData.role === 'Admin' && (
                        <div onClick={() => navigate("/dashboard")} className="bg-[#1f1f1f] p-3 rounded-[15px] cursor-pointer">
                            <MdDashboard className="text-[#f5f5f5] text-2xl" />
                        </div>
                    )
                }

                <div className="bg-[#1f1f1f] p-3 rounded-[15px] cursor-pointer">
                    <FaBell className="text-[#f5f5f5] text-2xl" />
                </div>

                <div className="flex items-center gap-3 cursor-pointer">
                    <FaUserCircle className="text-[#f5f5f5] text-4xl" />
                    <div className="flex flex-col items-strart">
                        <h1 className="text-md text-[#f5f5f5] font-semibold">{userData.name || "TEST USER"}</h1>
                        <p className="text-xs text-[#ababab] font-medium">{userData.role || "Role"}</p>
                    </div>
                    <IoLogOut onClick={hanleLogout} className="text-[#f5f5f5] ml-2" size={40} />
                </div>
            </div>
        </header>
    )
}

export default Header