import React, { useState, useEffect } from "react";
import { CheckCircle, Clock, Zap } from "lucide-react";

export default function DailyProgress() {
    const [progress, setProgress] = useState(0);
    const [tasksCompleted, setTasksCompleted] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);
    const [hoursStudied, setHoursStudied] = useState(0);
    const [dailyGoal, setDailyGoal] = useState(5); // Default daily goal
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                
                // Fetch user data, including tasks and settings
                const res = await fetch('http://localhost:5000/api/users/me', {
                    method: 'GET',
                    credentials: 'include'
                });
                
                if (!res.ok) {
                    throw new Error('Failed to fetch user data');
                }
                
                const userData = await res.json();
                
                // Get tasks
                const userTasks = Array.isArray(userData.tasks) ? userData.tasks : [];
                
                // Filter for today's tasks
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                const todaysTasks = userTasks.filter(task => {
                    if (!task.dueDate) return false;
                    const taskDate = new Date(task.dueDate);
                    taskDate.setHours(0, 0, 0, 0);
                    return taskDate.getTime() === today.getTime();
                });
                
                // Calculate task statistics
                const completedTasks = todaysTasks.filter(task => task.completed);
                const totalTaskCount = todaysTasks.length;
                const completedTaskCount = completedTasks.length;
                
                // Get productivity settings (if available)
                const productivitySettings = userData.settings?.productivity || {};
                const userDailyGoal = productivitySettings.focusHours || 5;
                
                // Calculate study hours (based on completed tasks duration)
                let studyHours = 0;
                completedTasks.forEach(task => {
                    if (task.startTime && task.endTime) {
                        const startTime = new Date(task.startTime);
                        const endTime = new Date(task.endTime);
                        const durationHours = (endTime - startTime) / (1000 * 60 * 60);
                        studyHours += durationHours;
                    }
                });
                
                // Round study hours to 1 decimal place
                studyHours = Math.round(studyHours * 10) / 10;
                
                // Calculate overall progress
                let overallProgress = 0;
                
                if (totalTaskCount > 0) {
                    const taskProgressWeight = 0.6; // 60% weight to tasks
                    const studyProgressWeight = 0.4; // 40% weight to study hours
                    
                    const taskProgress = totalTaskCount > 0 ? (completedTaskCount / totalTaskCount) * 100 : 0;
                    const studyProgress = userDailyGoal > 0 ? Math.min((studyHours / userDailyGoal) * 100, 100) : 0;
                    
                    overallProgress = Math.round(
                        (taskProgress * taskProgressWeight) + 
                        (studyProgress * studyProgressWeight)
                    );
                }
                
                // Update state with fetched data
                setTasksCompleted(completedTaskCount);
                setTotalTasks(totalTaskCount);
                setHoursStudied(studyHours);
                setDailyGoal(userDailyGoal);
                setProgress(overallProgress);
                
            } catch (err) {
                console.error('Error fetching progress data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="bg-white border border-[#e2e8f0] rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-center py-10">
                    <p className="text-[#64748b]">Loading progress data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white border border-[#e2e8f0] rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-center py-6">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </div>
        );
    }

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
