import React, { useState, useEffect } from "react";

export default function Rooms() {
  const [view, setView] = useState("myRooms"); // myRooms, roomContent, leaderboard, publicRooms
  const [currentRoom, setCurrentRoom] = useState(null);
  const [enrolledRooms, setEnrolledRooms] = useState([
    //example
    { id: 1, name: "Study Group", memberCount: 24, category: "Education" },
    { id: 2, name: "Fitness Challenge", memberCount: 16, category: "Health" },
    { id: 3, name: "Book Club", memberCount: 8, category: "Hobbies" }
  ]);
  const [publicRooms, setPublicRooms] = useState([
    { id: 4, name: "Coding Bootcamp", memberCount: 56, category: "Technology" },
    { id: 5, name: "Language Exchange", memberCount: 38, category: "Education" },
    { id: 6, name: "Mindfulness Group", memberCount: 19, category: "Wellness" }
  ]);
  const [leaderboardData, setLeaderboardData] = useState([
    { userId: "user1", username: "AlexProgress", points: 850, streak: 12, hours: 42, rank: 1 },
    { userId: "user2", username: "SamStudious", points: 720, streak: 8, hours: 36, rank: 2 },
    { userId: "currentUser", username: "You", points: 685, streak: 6, hours: 32, rank: 3 },
    { userId: "user3", username: "JayFocus", points: 540, streak: 4, hours: 28, rank: 4 },
    { userId: "user4", username: "TaylorTime", points: 490, streak: 3, hours: 25, rank: 5 }
  ]);
  
  //  room content for demo
  const roomContent = {
    1: {
      name: "Study Group",
      description: "A place to focus on studying together",
      tasks: ["Complete math homework", "Read chapter 5", "Prepare for quiz"],
      announcements: ["Quiz on Friday!", "New study materials uploaded"]
    },
    2: {
      name: "Fitness Challenge",
      description: "30-day fitness challenge group",
      tasks: ["Daily workout", "Log water intake", "Share progress photo"],
      announcements: ["New challenge starts Monday!", "Congratulations to last week's winners"]
    },
    3: {
      name: "Book Club",
      description: "Monthly book discussions",
      tasks: ["Read chapters 1-5", "Post discussion questions", "Vote on next book"],
      announcements: ["Meeting this Thursday at 7PM", "New book selections posted"]
    }
  };

  //  room selection
  const selectRoom = (roomId) => {
    setCurrentRoom(roomId);
    setView("roomContent");
  };

  //  leaderboard for current room
  const showLeaderboard = () => {
    if (currentRoom) {
      setView("leaderboard");
    }
  };

  // Create new room function
  const createRoom = () => {
    // This would open a modal or form in a real implementation
    alert("Create room form would open here");
  };

  // Join a public room
  const joinRoom = (roomId) => {
    const roomToJoin = publicRooms.find(room => room.id === roomId);
    if (roomToJoin) {
      setEnrolledRooms([...enrolledRooms, roomToJoin]);
      setPublicRooms(publicRooms.filter(room => room.id !== roomId));
      alert(`You've joined ${roomToJoin.name}!`);
    }
  };

  return (
    <div className="rooms-container p-4">
      {/* Navigation Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rooms</h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => setView("myRooms")}
            className={`px-4 py-2 rounded ${view === "myRooms" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            My Rooms
          </button>
          <button 
            onClick={() => setView("publicRooms")}
            className={`px-4 py-2 rounded ${view === "publicRooms" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Public Rooms
          </button>
          <button 
            onClick={createRoom}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Create Room
          </button>
        </div>
      </div>

      {/* My Rooms View */}
      {view === "myRooms" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Enrolled Rooms</h2>
          
          {enrolledRooms.length === 0 ? (
            <p className="text-gray-500">You haven't joined any rooms yet. Check out the public rooms!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledRooms.map(room => (
                <div 
                  key={room.id} 
                  className="border rounded p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => selectRoom(room.id)}
                >
                  <h3 className="font-semibold text-lg">{room.name}</h3>
                  <p className="text-gray-600">Category: {room.category}</p>
                  <p className="text-gray-600">Members: {room.memberCount}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Public Rooms View */}
      {view === "publicRooms" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Public Rooms</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {publicRooms.map(room => (
              <div key={room.id} className="border rounded p-4">
                <h3 className="font-semibold text-lg">{room.name}</h3>
                <p className="text-gray-600">Category: {room.category}</p>
                <p className="text-gray-600">Members: {room.memberCount}</p>
                <button 
                  onClick={() => joinRoom(room.id)}
                  className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Join Room
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Room Content View */}
      {view === "roomContent" && currentRoom && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={() => setView("myRooms")}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              ← Back to Rooms
            </button>
            <button 
              onClick={showLeaderboard}
              className="px-4 py-2 bg-purple-500 text-white rounded"
            >
              Leaderboard
            </button>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">{roomContent[currentRoom]?.name}</h2>
          <p className="text-gray-600 mb-6">{roomContent[currentRoom]?.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded p-4">
              <h3 className="font-semibold text-lg mb-2">Tasks</h3>
              <ul className="list-disc pl-5">
                {roomContent[currentRoom]?.tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
            </div>
            <div className="border rounded p-4">
              <h3 className="font-semibold text-lg mb-2">Announcements</h3>
              <ul className="list-disc pl-5">
                {roomContent[currentRoom]?.announcements.map((announcement, index) => (
                  <li key={index}>{announcement}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard View */}
      {view === "leaderboard" && currentRoom && (
        <div>
          <div className="mb-4">
            <button 
              onClick={() => setView("roomContent")}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              ← Back to Room
            </button>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">{roomContent[currentRoom]?.name} Leaderboard</h2>
          <p className="text-gray-600 mb-6">See how you rank among other members</p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Rank</th>
                  <th className="border p-2 text-left">Member</th>
                  <th className="border p-2 text-left">Points</th>
                  <th className="border p-2 text-left">Streak</th>
                  <th className="border p-2 text-left">Hours</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user) => (
                  <tr key={user.userId} className={user.userId === "currentUser" ? "bg-blue-50" : ""}>
                    <td className="border p-2">{user.rank}</td>
                    <td className="border p-2 font-semibold">{user.username}</td>
                    <td className="border p-2">{user.points}</td>
                    <td className="border p-2">{user.streak} days</td>
                    <td className="border p-2">{user.hours} hrs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
            <h3 className="font-semibold text-lg mb-2">Your Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600">Rank</p>
                <p className="text-2xl font-bold">3rd</p>
              </div>
              <div>
                <p className="text-gray-600">Points</p>
                <p className="text-2xl font-bold">685</p>
              </div>
              <div>
                <p className="text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold">6 days</p>
              </div>
              <div>
                <p className="text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold">32 hrs</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}