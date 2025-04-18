import React from 'react';
import { Card } from 'components/layout/Cards/card';
import { CardContent } from 'components/layout/Cards/cardContent';
import { CalendarDays, CheckSquare, Zap, Repeat } from 'lucide-react';
import { Button } from 'components/layout/Buttons/button';
import { Progress } from 'components/layout/Progress/progress';

import PerformanceHeader from 'components/layout/Header/PerformanceHeader';

const friends = [
  { name: 'Ahmed', streak: 12, hours: 32.1, progress: 90, comparison: '+13%', trend: 'up' },
  { name: 'Yusuf', streak: 15, hours: 30.5, progress: 85, comparison: '+7%', trend: 'up' },
  { name: 'You', streak: 10, hours: 28.5, progress: 70, comparison: '-', trend: 'same' },
  { name: 'Khaled', streak: 8, hours: 24.3, progress: 60, comparison: '-15%', trend: 'down' },
  { name: 'Omar', streak: 5, hours: 18.7, progress: 45, comparison: '-34%', trend: 'down' },
];

export default function PerformanceDashboard() {
  return (
    <div className="p-6 space-y-6 bg-[#f8fafc]">
      <PerformanceHeader/>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <CalendarDays className="text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Study Hours</p>
              <p className="text-xl font-semibold">28.5h <span className="text-green-500 text-sm">+12%</span></p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <CheckSquare className="text-purple-500" />
            <div>
              <p className="text-sm text-muted-foreground">Tasks Completed</p>
              <p className="text-xl font-semibold">42 <span className="text-green-500 text-sm">+8%</span></p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <Zap className="text-orange-500" />
            <div>
              <p className="text-sm text-muted-foreground">Focus Score</p>
              <p className="text-xl font-semibold">76% <span className="text-green-500 text-sm">+5%</span></p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <Repeat className="text-emerald-500" />
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-xl font-semibold">14 days <span className="text-green-500 text-sm">+5</span></p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Friend Comparison */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Compare with Friends</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-muted-foreground border-b">
                <tr>
                  <th className="py-2">Rank</th>
                  <th>Name</th>
                  <th>Study Hours</th>
                  <th>Progress</th>
                  <th>Comparison</th>
                </tr>
              </thead>
                <tbody>
                {friends.map((friend, index) => (
                  <tr
                    key={index}
                    className={`
                      border-b transition-colors
                      ${friend.name === 'You' ? 'bg-orange-50' : ''}
                      hover:bg-blue-100
                    `}
                  >
                    <td className="py-2">{index + 1}</td>
                    <td>
                      <div className="font-medium">{friend.name}</div>
                      <div className="text-xs text-muted-foreground">{friend.streak} day streak</div>
                    </td>
                    <td>{friend.hours}h</td>
                    <td className="w-48"><Progress value={friend.progress} /></td>
                    <td
                      className={`
                        text-sm
                        ${friend.trend === 'up' ? 'text-red-500' : friend.trend === 'down' ? 'text-green-500' : 'text-muted-foreground'}
                      `}
                    >
                      {friend.comparison}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Quick Insights */}
          <div className="mt-4 text-sm text-muted-foreground">
            <p>• Alex Kim is leading with 32.1h of study time.</p>
            <p>• The group average is 26.8h of study time.</p>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold">Key Insights</h2>
          <div className="space-y-2">
            <div>
              <p className="font-medium">📈 Consistent Progress</p>
              <p className="text-sm text-muted-foreground">Your study hours have increased by 12% compared to last week, showing consistent improvement.</p>
            </div>
            <div>
              <p className="font-medium">⚡ Task Efficiency</p>
              <p className="text-sm text-muted-foreground">You're completing more tasks in less time compared to the group average, indicating improved efficiency.</p>
            </div>
            <div>
              <p className="font-medium">📚 Subject Balance</p>
              <p className="text-sm text-muted-foreground">Your study time is well-distributed across subjects, with a healthy balance between different areas.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
