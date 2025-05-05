import { useState, useEffect } from "react"
import { Calendar, Clock, ArrowRight, Plus, X, Dot, BookOpen, Users, Video, Briefcase, Code, Coffee, Music, Utensils } from "lucide-react"
import { Link } from "react-router-dom"
import { format } from "date-fns"

// Priority indicator components
const LowPriorityIcon = () => <Dot className="text-blue-500" />;
const MedPriorityIcon = () => <Dot className="text-amber-500" />;
const HighPriorityIcon = () => <Dot className="text-red-500" />;

// Render priority indicator
export const renderPriority = (priorityType) => {
  if (priorityType === 'Low') return <LowPriorityIcon />;
  if (priorityType === 'Medium') return <MedPriorityIcon />;
  if (priorityType === 'High') return <HighPriorityIcon />;
  return null;
};

// Simple clean color styles
const colorMap = {
    red: {bg: "bg-white", border: "border-red-400", icon: <Video className="w-4 h-4 text-red-500 mr-2" />},
    blue: {bg: "bg-white", border: "border-blue-400", icon: <BookOpen className="w-4 h-4 text-blue-500 mr-2" />},
    green: {bg: "bg-white", border: "border-green-400", icon: <Users className="w-4 h-4 text-green-500 mr-2" />},
    purple: {bg: "bg-white", border: "border-purple-400", icon: <Code className="w-4 h-4 text-purple-500 mr-2" />},
    yellow: {bg: "bg-white", border: "border-amber-400", icon: <Briefcase className="w-4 h-4 text-amber-500 mr-2" />},
    orange: {bg: "bg-white", border: "border-orange-400", icon: <Coffee className="w-4 h-4 text-orange-500 mr-2" />},
    pink: {bg: "bg-white", border: "border-pink-400", icon: <Music className="w-4 h-4 text-pink-500 mr-2" />},
    gray: {bg: "bg-white", border: "border-gray-400", icon: <Utensils className="w-4 h-4 text-gray-500 mr-2" />},
    indigo: {bg: "bg-white", border: "border-indigo-400", icon: <Calendar className="w-4 h-4 text-indigo-500 mr-2" />},
    teal: {bg: "bg-white", border: "border-teal-400", icon: <Clock className="w-4 h-4 text-teal-500 mr-2" />}
};

export default function UpcomingSchedule() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editEvent, setEditEvent] = useState(null);

    // Fetch today's events for the current user
    useEffect(() => {
        const abortController = new AbortController();
        
        const fetchEvents = async () => {
            try {
                const res = await fetch(
                    'http://localhost:5000/api/users/me',
                    {
                        method: 'GET',
                        credentials: 'include',
                        signal: abortController.signal
                    }
                );
                
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Could not load events');
                
                // Get events from the response
                const userEvents = Array.isArray(data.events) ? data.events : [];
                
                // Filter for today's events and format them
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                const todayEvents = userEvents
                    .filter(event => {
                        const eventDate = new Date(event.startTime);
                        eventDate.setHours(0, 0, 0, 0);
                        return eventDate.getTime() === today.getTime();
                    })
                    .map(event => ({
                        id: event._id,
                        title: event.title,
                        time: `${format(new Date(event.startTime), "h:mm a")} - ${format(new Date(event.endTime), "h:mm a")}`,
                        color: event.colour,
                        priority: event.priority,
                        startTime: new Date(event.startTime),
                        endTime: new Date(event.endTime),
                        description: event.description
                    }))
                    .sort((a, b) => a.startTime - b.startTime);
                
                setEvents(todayEvents);
            } catch (err) {
                if (err.name !== 'AbortError') setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchEvents();
        
        return () => abortController.abort();
    }, []);

    // Event modal handlers
    const openAddModal = () => {
        setEditEvent(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddEvent = async (event) => {
        try {
            const formattedEvent = {
                title: event.title,
                description: event.description,
                priority: event.priority,
                startTime: event.startTime,
                endTime: event.endTime,
                colour: event.colour
            };

            const res = await fetch("http://localhost:5000/api/events", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedEvent)
            });
            
            const newEvent = await res.json();
            if (!res.ok) throw new Error(newEvent.error || "Add failed");
            
            // Check if the new event is for today
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const eventDate = new Date(newEvent.startTime);
            eventDate.setHours(0, 0, 0, 0);
            
            if (eventDate.getTime() === today.getTime()) {
                // Add the new event to the list
                setEvents(prevEvents => [
                    ...prevEvents,
                    {
                        id: newEvent._id,
                        title: newEvent.title,
                        time: `${format(new Date(newEvent.startTime), "h:mm a")} - ${format(new Date(newEvent.endTime), "h:mm a")}`,
                        color: newEvent.colour,
                        priority: newEvent.priority,
                        startTime: new Date(newEvent.startTime),
                        endTime: new Date(newEvent.endTime),
                        description: newEvent.description
                    }
                ].sort((a, b) => a.startTime - b.startTime));
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const handleSave = (event) => {
        handleAddEvent(event);
        closeModal();
    };

    const handleDelete = async (id) => {
        // Not needed for adding events, but required for the modal component
    };

    const today = new Date()
    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    })

    if (loading) {
        return (
            <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-sm">
                <div className="flex items-center justify-between p-6 border-b border-[#e2e8f0]">
                    <h2 className="text-lg font-semibold text-[#0f172a]">Today's Schedule</h2>
                </div>
                <div className="p-6 text-center">
                    <p className="text-[#64748b]">Loading events...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-sm">
                <div className="flex items-center justify-between p-6 border-b border-[#e2e8f0]">
                    <h2 className="text-lg font-semibold text-[#0f172a]">Today's Schedule</h2>
                </div>
                <div className="p-6 text-center">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-6 border-b border-[#e2e8f0]">
                <h2 className="text-lg font-semibold text-[#0f172a]">Today's Schedule</h2>
                <Link to="/calendar" className="text-sm text-[#07b0ed] hover:underline flex items-center">
                    Calendar <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
            </div>

            <div className="p-4">
                <div className="flex items-center mb-4">
                    <Calendar className="w-5 h-5 text-[#64748b] mr-2" />
                    <span className="text-sm font-medium text-[#0f172a]">{formattedDate}</span>
                </div>

                {events.length > 0 ? (
                    <div className="space-y-3">
                        {events.map((event) => {
                            const eventStyle = colorMap[event.color] || colorMap.blue;
                            return (
                                <div 
                                    key={event.id} 
                                    className={`p-3 rounded-lg border-l-4 ${eventStyle.border} bg-white shadow-sm hover:shadow-md transition-shadow`}
                                >
                                    <div className="flex items-center">
                                        {eventStyle.icon}
                                        <h3 className="text-sm font-medium text-[#0f172a] flex items-center">
                                            {renderPriority(event.priority)}
                                            {event.title}
                                        </h3>
                                    </div>
                                    <div className="flex items-center mt-1 ml-6">
                                        <Clock className="w-3.5 h-3.5 text-[#64748b] mr-1" />
                                        <span className="text-xs text-[#64748b]">{event.time}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-[#64748b]">No events scheduled for today</p>
                    </div>
                )}

                <div className="mt-4">
                    <button
                        onClick={openAddModal}
                        className="flex items-center justify-center w-full py-3 border border-dashed border-[#cbd5e1] rounded-md text-sm text-[#64748b] hover:border-[#07b0ed] hover:text-[#07b0ed] transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add Event
                    </button>
                </div>
            </div>

            {/* Event Modal */}
            {isModalOpen && (
                <div className="bg-black flex items-center justify-center bg-opacity-30 fixed inset-0 backdrop-blur-sm z-50 transition-opacity">
                    <div className="bg-white max-w-md rounded-lg shadow-lg">
                        <EventForm
                            event={editEvent}
                            onSave={handleSave}
                            onDelete={handleDelete}
                            onCancel={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

// Event form component for adding/editing events
function EventForm({event, onSave, onDelete, onCancel}) {
    const [title, setTitle] = useState(event?.title || "");
    const [description, setDescription] = useState(event?.description || "");
    const [priority, setPriority] = useState(event?.priority || "Medium");
    const [colour, setColour] = useState(event?.colour || "blue");
    
    // Prepare date in YYYY-MM-DD format
    const today = new Date();
    const [date, setDate] = useState(
        event ? format(event.startTime, "yyyy-MM-dd") : format(today, "yyyy-MM-dd")
    );
    
    const [startTime, setStartTime] = useState(
        event ? format(event.startTime, "HH:mm") : "09:00"
    );
    
    const [endTime, setEndTime] = useState(
        event ? format(event.endTime, "HH:mm") : "10:00"
    );

    // Update color when priority changes for new events
    useEffect(() => {
        if (!event) {
            if (priority === "High") setColour("red");
            else if (priority === "Medium") setColour("yellow");
            else if (priority === "Low") setColour("blue");
        }
    }, [priority, event]);

    function handleSubmit(e) {
        e.preventDefault();
        
        // Parse times
        const [startH, startM] = startTime.split(":").map(Number);
        const [endH, endM] = endTime.split(":").map(Number);
        const [year, month, day] = date.split("-").map(Number);
        
        // Create Date objects
        const start = new Date(year, month - 1, day, startH, startM);
        const end = new Date(year, month - 1, day, endH, endM);
        
        // Validate times
        if (start >= end) {
            alert("Start time must be before end time.");
            return;
        }
        
        // Create event object
        const newEvent = {
            id: event?.id,
            title,
            description,
            priority,
            startTime: start,
            endTime: end,
            colour
        };
        
        onSave(newEvent);
    }

    // Calculate duration
    function durationHours() {
        const [sh, sm] = startTime.split(":").map(Number);
        const [eh, em] = endTime.split(":").map(Number);
        const diff = eh * 60 + em - (sh * 60 + sm);
        return Math.max(diff / 60, 0);
    }

    // Simple color selection with icons
    const colorOptions = [
        { color: "blue", label: "Class", icon: <BookOpen className="w-4 h-4" /> },
        { color: "green", label: "Meeting", icon: <Users className="w-4 h-4" /> },
        { color: "red", label: "Video", icon: <Video className="w-4 h-4" /> },
        { color: "yellow", label: "Work", icon: <Briefcase className="w-4 h-4" /> },
        { color: "purple", label: "Coding", icon: <Code className="w-4 h-4" /> }
    ];

    return (
        <div className="relative max-w-md mx-auto shadow-xl rounded-xl border-t-8">
            <header className="px-6 py-4 flex items-center justify-between">
                <h2 className="font-semibold text-lg truncate">{event ? "Edit Event" : "Create Event"}</h2>
                <button onClick={onCancel} className="p-1 rounded-full hover:bg-slate-200">
                    <X className="w-4 h-4" />
                </button>
            </header>
            
            <form className="space-y-4 p-6" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                    <label className="text-sm font-medium">Title <span className="text-red-500">*</span></label>
                    <input
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Event title"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Start Time</label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">End Time</label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Duration</label>
                    <div className="text-sm py-2 px-3 bg-gray-50 rounded-lg border border-slate-200">
                        {durationHours().toFixed(1)} hours
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Event Type</label>
                    <div className="grid grid-cols-5 gap-2">
                        {colorOptions.map((option) => (
                            <button
                                key={option.color}
                                type="button"
                                onClick={() => setColour(option.color)}
                                className={`flex flex-col items-center justify-center p-2 rounded-lg border ${
                                    colour === option.color 
                                        ? `border-${option.color}-500 bg-${option.color}-50 ring-2 ring-${option.color}-500 ring-opacity-50` 
                                        : "border-gray-200 hover:bg-gray-50"
                                }`}
                                title={option.label}
                            >
                                <div className={`text-${option.color}-500`}>
                                    {option.icon}
                                </div>
                                <span className="text-xs mt-1">{option.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description (optional)"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    />
                </div>
                
                <div className="flex space-x-2 justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border rounded"
                    >
                        Cancel
                    </button>
                    
                    <button
                        type="submit"
                        className="bg-blue-600 px-4 py-2 hover:bg-blue-700 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
