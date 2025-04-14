import { useState } from "react"
import { Calendar, Clock, ArrowRight, Plus } from "lucide-react"

export default function UpcomingSchedule() {
    const [events, setEvents] = useState([
        {
            id: "1",
            title: "Math Class",
            time: "10:00 AM - 11:30 AM",
            type: "class",
        },
        {
            id: "2",
            title: "Study Group",
            time: "1:00 PM - 2:30 PM",
            type: "study",
        },
        {
            id: "3",
            title: "Project Meeting",
            time: "3:00 PM - 4:00 PM",
            type: "meeting",
        },
    ])

    const getEventTypeStyles = (type) => {
        switch (type) {
            case "class":
                return "border-blue-200 bg-blue-50"
            case "meeting":
                return "border-purple-200 bg-purple-50"
            case "study":
                return "border-green-200 bg-green-50"
            default:
                return "border-gray-200 bg-gray-50"
        }
    }

    const today = new Date()
    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    })

    return (
        <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-6 border-b border-[#e2e8f0]">
                <h2 className="text-lg font-semibold text-[#0f172a]">Today's Schedule</h2>
                <a href="/calendar" className="text-sm text-[#07b0ed] hover:underline flex items-center">
                    Calendar <ArrowRight className="w-4 h-4 ml-1" />
                </a>
            </div>

            <div className="p-4">
                <div className="flex items-center mb-4">
                    <Calendar className="w-5 h-5 text-[#64748b] mr-2" />
                    <span className="text-sm font-medium text-[#0f172a]">{formattedDate}</span>
                </div>

                {events.length > 0 ? (
                    <div className="space-y-3">
                        {events.map((event) => (
                            <div key={event.id} className={`p-3 rounded-lg border ${getEventTypeStyles(event.type)}`}>
                                <h3 className="text-sm font-medium text-[#0f172a]">{event.title}</h3>
                                <div className="flex items-center mt-1">
                                    <Clock className="w-3.5 h-3.5 text-[#64748b] mr-1" />
                                    <span className="text-xs text-[#64748b]">{event.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-[#64748b]">No events scheduled for today</p>
                    </div>
                )}

                <div className="mt-4">
                    <a
                        href="/calendar/new"
                        className="flex items-center justify-center w-full py-3 border border-dashed border-[#cbd5e1] rounded-md text-sm text-[#64748b] hover:border-[#07b0ed] hover:text-[#07b0ed] transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add Event
                    </a>
                </div>
            </div>
        </div>
    )
}
