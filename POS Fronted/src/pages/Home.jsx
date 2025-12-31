 import React from 'react'
import BottomNav from '../components/shared/BottomNav'
import Greetings from '../components/Home/Greetings'
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import MiniCard from '../components/Home/MiniCard';
import RecentOrder from '../components/Home/RecentOrder';
import PopularDishes from '../components/Home/PopularDishes';

 
 const Home = () => {
   return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-3">
      {/* Left Div */}
      <div className="flex-[3] ">
      <Greetings />
      <div className="flex items-center w-full px-8 mt-8 gap-3">
        <MiniCard title="Total Earnings" icon={<BsCashCoin />} number = {512} foterNum={1.6} />
        <MiniCard title="In Process" icon={<GrInProgress />} number = {16} foterNum={3.6} />
      </div>
        <RecentOrder />
      </div>
      {/* Right Div */}
      <div className="flex-[2]">
        <PopularDishes />
      </div>
      <BottomNav />
    </section>
   )
 }
 
 export default Home