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
    <div className="bg-[#1f1f1f] min-h-[calc(100vh-4.5rem)] overflow-y-auto">

      {/* TOP SECTION */}
      <div className="w-full flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between py-14 px-6">

        {/* LEFT BUTTONS */}
        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {buttons.map(({ label, icon, action }) => (
            <button
              key={action}
              onClick={() => handleOpenModal(action)}
              className="px-5 py-2 md:px-8 md:py-3 rounded-lg bg-[#1a1a1a] hover:bg-[#262626] text-white flex items-center gap-2"
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* RIGHT TABS */}
        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 md:px-8 md:py-3 rounded-lg text-white font-semibold
                ${activeTab === tab
                  ? "bg-[#262626]"
                  : "bg-[#1a1a1a] hover:bg-[#262626]"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

      </div>

      {/* CONTENT */}
      {activeTab === "Metrics" && <Metrics />}
      {activeTab === "Orders" && <RecentOrders />}

      {/* MODAL */}
      {isTableModalOpen && (
        <Model setIsTableModalOpen={setIsTableModalOpen} />
      )}

    </div>
  )
}

export default Dashboard
