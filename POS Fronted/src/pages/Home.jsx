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
    <section
      className="bg-[#1f1f1f]  pb-22 flex flex-col md:flex-row gap-3 overflow-hidden">
      {/* Left Section */}
      <div className="md:flex-[3] w-full ">
        <Greetings />

        <div className="flex flex-col sm:flex-row items-center w-full px-4 sm:px-8 mt-6 sm:mt-8 gap-3">
          <MiniCard
            title="Total Earnings"
            icon={<BsCashCoin />}
            number={512}
            foterNum={1.6}
          />
          <MiniCard
            title="In Process"
            icon={<GrInProgress />}
            number={16}
            foterNum={3.6}
          />
        </div>

        <RecentOrder />
      </div>

      {/* Right Section */}
      <div className="md:flex-[2] w-full px-4 md:px-6 sm:px-10 lg:px-7 ">
        <PopularDishes />
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </section>
  )
}

export default Home
