import React from "react";
import DailyProgress from "components/dashboard/dailyProgress"
import PriorityTasks from "components/dashboard/PriorityTasks"
import UpcomingSchedule from "components/dashboard/UpcomingSchedule"
import FocusStats from "components/dashboard/FocusStats";

export default function Dashboard(){
    return (
        <>
            <div className="flex flex-col w-full min-h-screen bg-[#f8fafc] font-inter">
            <div className="flex-1 px-4 py-6 md:px-6 md:py-8">
                <h1 className="text-2xl font-bold text-[#0f172a] mb-2">Welcome back, {'{Name}'}</h1>
                <p className="text-[#64748b] mb-6">Here's an overview of your progress today</p>
                <DailyProgress />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    <div className="lg:col-span-2 space-y-6">
                        <PriorityTasks />
                        <FocusStats />
                    </div>
                        <UpcomingSchedule />
                </div>
            </div>
        </div>


        </>
    )
}
