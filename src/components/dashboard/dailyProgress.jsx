import React from "react";
import { useState } from "react"
import { CheckCircle, Clock, Zap } from "lucide-react";

export default function DailyProgress() {
    // In a real app, this would come from an API
    const [progress, setProgress] = useState(65)

    // Calculate the remaining tasks and hours
    const tasksCompleted = 5
    const totalTasks = 8
    const hoursStudied = 3.5
    const dailyGoal = 5

    return (
        <div className="bg-white border border-[#e2e8f0] rounded-lg p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#0f172a] mb-2 md:mb-0">Today's Progress</h2>

                <div className="flex space-x-6">
                    <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-[#07b0ed] mr-2" />
                        <div>
                            <p className="text-sm text-[#64748b]">Tasks</p>
                            <p className="text-lg font-semibold text-[#0f172a]">
                                {tasksCompleted}/{totalTasks}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <Clock className="w-5 h-5 text-[#6366f1] mr-2" />
                        <div>
                            <p className="text-sm text-[#64748b]">Study Time</p>
                            <p className="text-lg font-semibold text-[#0f172a]">
                                {hoursStudied}/{dailyGoal}h
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#64748b]">Overall Progress</span>
                    <span className="text-sm font-medium text-[#64748b]">{progress}%</span>
                </div>
                <div className="w-full bg-[#e2e8f0] rounded-full h-3">
                    <div
                        className="bg-gradient-to-r from-[#07b0ed] to-[#1949b2] h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {progress >= 50 ? (
                <div className="mt-4 flex items-center text-sm text-[#10b981]">
                    <Zap className="w-4 h-4 mr-1" />
                    <span>You're making great progress today!</span>
                </div>
            ) : (
                <div className="mt-4 flex items-center text-sm text-[#f97316]">
                    <Zap className="w-4 h-4 mr-1" />
                    <span>Keep going, you're almost halfway there!</span>
                </div>
            )}
        </div>
    )
}
