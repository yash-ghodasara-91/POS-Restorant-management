import React, { useState } from 'react'
import { BiSolidDish } from 'react-icons/bi'
import { MdCategory, MdTableBar } from 'react-icons/md'
import Metrics from '../components/dashboard/Metrics'
import RecentOrders from '../components/dashboard/RecentOrders'
import Model from '../components/dashboard/Model'

const buttons = [
    { label: "Add Table", icon: <MdTableBar />, action: "table" },
    { label: "Add Category", icon: <MdCategory />, action: "category" },
    { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
]

const tabs = ["Metrics", "Orders", "Payments"]

const Dashboard = () => {
    const [isTableModalOpen, setIsTableModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("Metrics")

    const handleOpenModal = (action) => {
        if (action === "table") {
            setIsTableModalOpen(true)
        }
    }

    return (
        <div className='bg-[#1f1f1f] h-[calc(100vh-5rem)]'>

            <div className="container mx-auto flex items-center justify-between py-14 px-6">

                {/* LEFT BUTTONS */}
                <div className="flex items-center gap-4 flex-shrink-1 flex-wrap  whitespace-nowrap scrollbar-hide">
                    {buttons.map(({ label, icon, action }) => (
                        <button
                            key={action}
                            onClick={() => handleOpenModal(action)}
                            className="px-8 py-3 rounded-lg bg-[#1a1a1a] hover:bg-[#262626] text-white flex items-center gap-2"
                        >
                            {icon}
                            {label}
                        </button>
                    ))}
                </div>

                {/* RIGHT TABS */}
                <div className="flex items-center gap-4  flex-wrap whitespace-nowrap scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`px-8 py-3 rounded-lg text-white font-semibold
                ${activeTab === tab ? "bg-[#262626]" : "bg-[#1a1a1a] hover:bg-[#262626]"}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

            </div>

            {activeTab === "Metrics" && <Metrics />}
            {activeTab === "Orders" && <RecentOrders />}

            {isTableModalOpen && (
                <Model onClose={() => setIsTableModalOpen(false)} />
            )}

        </div>
    )
}

export default Dashboard
