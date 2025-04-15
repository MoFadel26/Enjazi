import React, { useState, useEffect } from "react";

export default function Rooms() {
  const [view, setView] = useState("myRooms"); // myRooms, roomContent, leaderboard, publicRooms, createRoom
  const [currentRoom, setCurrentRoom] = useState(null);
  const [newRoomData, setNewRoomData] = useState({
    name: "",
    description: "",
    category: "Education",
    isPublic: true
  });
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
  
  // Per-room leaderboard data
  const [leaderboardData, setLeaderboardData] = useState({
    1: [
      { userId: "user1", username: "AlexProgress", points: 850, streak: 12, hours: 42, rank: 1 },
      { userId: "user2", username: "SamStudious", points: 720, streak: 8, hours: 36, rank: 2 },
      { userId: "currentUser", username: "You", points: 685, streak: 6, hours: 32, rank: 3 },
      { userId: "user3", username: "JayFocus", points: 540, streak: 4, hours: 28, rank: 4 },
      { userId: "user4", username: "TaylorTime", points: 490, streak: 3, hours: 25, rank: 5 }
    ],
    2: [
      { userId: "user5", username: "FitnessFreak", points: 920, streak: 15, hours: 45, rank: 1 },
      { userId: "currentUser", username: "You", points: 780, streak: 9, hours: 38, rank: 2 },
      { userId: "user6", username: "GymBuddy", points: 650, streak: 7, hours: 30, rank: 3 },
      { userId: "user7", username: "HealthyHabit", points: 520, streak: 5, hours: 25, rank: 4 }
    ],
    3: [
      { userId: "user8", username: "BookWorm", points: 890, streak: 14, hours: 40, rank: 1 },
      { userId: "user9", username: "LitLover", points: 740, streak: 10, hours: 35, rank: 2 },
      { userId: "user10", username: "PageTurner", points: 680, streak: 8, hours: 32, rank: 3 },
      { userId: "currentUser", username: "You", points: 510, streak: 4, hours: 22, rank: 4 }
    ]
  });
  
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

  // Create room view
  const showCreateRoomForm = () => {
    setView("createRoom");
  };

  // Handle create room form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewRoomData({
      ...newRoomData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle room creation form submission
  const handleCreateRoom = (e) => {
    e.preventDefault();
    
    // Create a new room with a unique ID
    const newId = Math.max(...[...enrolledRooms, ...publicRooms].map(room => room.id)) + 1;
    const newRoom = {
      id: newId,
      name: newRoomData.name,
      category: newRoomData.category,
      memberCount: 1 // Starting with just the creator
    };
    
    // Add room content
    const newRoomContentData = {
      name: newRoomData.name,
      description: newRoomData.description,
      tasks: [],
      announcements: ["Welcome to the new room!"]
    };
    
    // Initialize leaderboard for the new room
    const newLeaderboard = [
      { userId: "currentUser", username: "You", points: 100, streak: 1, hours: 0, rank: 1 }
    ];
    
    // Update state
    if (newRoomData.isPublic) {
      setPublicRooms([...publicRooms, newRoom]);
    } else {
      setEnrolledRooms([...enrolledRooms, newRoom]);
    }
    
    // Update room content
    setRoomContent(prev => ({ ...prev, [newId]: newRoomContentData }));
    
    // Initialize leaderboard
    setLeaderboardData(prev => ({ ...prev, [newId]: newLeaderboard }));
    
    // Reset form and go back to rooms view
    setNewRoomData({
      name: "",
      description: "",
      category: "Education",
      isPublic: true
    });
    
    setView("myRooms");
  };

  // Join a public room
  const joinRoom = (roomId) => {
    const roomToJoin = publicRooms.find(room => room.id === roomId);
    if (roomToJoin) {
      // Update room with increased member count
      const updatedRoom = { ...roomToJoin, memberCount: roomToJoin.memberCount + 1 };
      
      // Add to enrolled rooms
      setEnrolledRooms([...enrolledRooms, updatedRoom]);
      
      // Remove from public rooms
      setPublicRooms(publicRooms.filter(room => room.id !== roomId));
      
      // If the room doesn't have a leaderboard entry yet, add one
      if (!leaderboardData[roomId]) {
        const newMemberData = { 
          userId: "currentUser", 
          username: "You", 
          points: 0, 
          streak: 0, 
          hours: 0, 
          rank: 1 
        };
        
        setLeaderboardData(prev => ({
          ...prev,
          [roomId]: [newMemberData]
        }));
      }
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
            onClick={showCreateRoomForm}
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

      // Create Room View 
      {view === "createRoom" && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <button 
              onClick={() => setView("myRooms")}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              ← Back to Rooms
            </button>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Create a New Room</h2>
          
          <form onSubmit={handleCreateRoom}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomName">
                Room Name
              </label>
              <input
                id="roomName"
                name="name"
                type="text"
                value={newRoomData.name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter room name"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomDescription">
                Description
              </label>
              <textarea
                id="roomDescription"
                name="description"
                value={newRoomData.description}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Describe the purpose of your room"
                rows="3"
                required
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomCategory">
                Category
              </label>
              <select
                id="roomCategory"
                name="category"
                value={newRoomData.category}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Technology">Technology</option>
                <option value="Hobbies">Hobbies</option>
                <option value="Wellness">Wellness</option>
                <option value="Professional">Professional</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={newRoomData.isPublic}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-gray-700 text-sm">Make this room public</span>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create Room
              </button>
              <button
                type="button"
                onClick={() => setView("myRooms")}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
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

      {/* Leaderboard View - Now Per Room */}
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
                {leaderboardData[currentRoom]?.map((user) => (
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
              {leaderboardData[currentRoom]?.map(user => {
                if (user.userId === "currentUser") {
                  return (
                    <React.Fragment key={user.userId}>
                      <div>
                        <p className="text-gray-600">Rank</p>
                        <p className="text-2xl font-bold">{user.rank}{user.rank === 1 ? 'st' : user.rank === 2 ? 'nd' : user.rank === 3 ? 'rd' : 'th'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Points</p>
                        <p className="text-2xl font-bold">{user.points}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Current Streak</p>
                        <p className="text-2xl font-bold">{user.streak} days</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total Hours</p>
                        <p className="text-2xl font-bold">{user.hours} hrs</p>
                      </div>
                    </React.Fragment>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}