import { useState } from "react"
import { Zap, Clock, TrendingUp } from "lucide-react"

export default function FocusStats() {
    const [currentStreak, setCurrentStreak] = useState(14)
    const [focusTime, setFocusTime] = useState(3.5)
    const [focusTimeChange, setFocusTimeChange] = useState(15)

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const thisWeekActivity = [3.2, 4.5, 2.8, 3.5, 0, 0, 0]
    const maxValue = Math.max(...thisWeekActivity) * 1.2 || 5

    return (
        <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-sm">
            <div className="p-6 border-b border-[#e2e8f0]">
                <h2 className="text-lg font-semibold text-[#0f172a]">Focus Stats</h2>
            </div>

            <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-center mb-4 md:mb-0">
                        <div className="bg-[#fff7ed] p-3 rounded-lg mr-4">
                            <Zap className="w-6 h-6 text-[#f97316]" />
                        </div>
                        <div>
                            <p className="text-sm text-[#64748b]">Current Streak</p>
                            <p className="text-2xl font-bold text-[#0f172a]">{currentStreak} days</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="bg-[#f0f9ff] p-3 rounded-lg mr-4">
                            <Clock className="w-6 h-6 text-[#07b0ed]" />
                        </div>
                        <div>
                            <p className="text-sm text-[#64748b]">Focus Time Today</p>
                            <div className="flex items-baseline">
                                <p className="text-2xl font-bold text-[#0f172a]">{focusTime}h</p>
                                <span className="ml-2 text-xs font-medium text-green-500 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />+{focusTimeChange}%
                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-sm font-medium text-[#64748b] mb-4">This Week's Focus Time</h3>
                    <div className="h-40 flex items-end justify-between">
                        {weekDays.map((day, index) => (
                            <div key={day} className="flex flex-col items-center">
                                <div
                                    className={`w-8 rounded-t-md ${thisWeekActivity[index] > 0 ? "bg-[#07b0ed]" : "bg-[#e2e8f0]"}`}
                                    style={{
                                        height: `${(thisWeekActivity[index] / maxValue) * 100}%`,
                                        minHeight: thisWeekActivity[index] > 0 ? "4px" : "0",
                                    }}
                                ></div>
                                <div className="text-xs text-[#64748b] mt-2">{day}</div>
                                <div className="text-xs font-medium text-[#0f172a]">
                                    {thisWeekActivity[index] > 0 ? `${thisWeekActivity[index]}h` : "-"}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
