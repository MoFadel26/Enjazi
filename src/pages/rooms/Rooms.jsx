import React, { useState, useEffect } from "react";

export default function Rooms() {
  const [view, setView] = useState("myRooms"); // myRooms, roomContent, leaderboard, publicRooms, createRoom
  const [currentRoom, setCurrentRoom] = useState(null);
  const [roomMessages, setRoomMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");


  const [newRoomData, setNewRoomData] = useState({
    name: "",
    description: "",
    category: "Education",
    isPublic: true,
    image: null
  });

  const [enrolledRooms, setEnrolledRooms] = useState([]);
  const [publicRooms, setPublicRooms] = useState([]);


  // for image preview in create room form
  const [imagePreview, setImagePreview] = useState(null);

  // per-room leaderboard data
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
  useEffect(() => {
    const controller = new AbortController();

    async function fetchEnrolledRooms() {
      try {
        const res = await fetch("http://localhost:5000/api/rooms/enrolled", {
          method: "GET",
          credentials: "include",
          signal: controller.signal
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not load enrolled rooms");
        setEnrolledRooms(data);
      } catch (err) {
        if (err.name !== "AbortError") console.error("Enrolled rooms error:", err);
      }
    }

    async function fetchPublicRooms() {
      try {
        const res = await fetch("http://localhost:5000/api/rooms/public", {
          method: "GET",
          credentials: "include",
          signal: controller.signal
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not load public rooms");
        setPublicRooms(data);
      } catch (err) {
        if (err.name !== "AbortError") console.error("Public rooms error:", err);
      }
    }

    fetchEnrolledRooms();
    fetchPublicRooms();
    return () => controller.abort();
  }, []);


  //  oom content for demo
  const roomContent = {
    1: {
      name: "Study Group",
      description: "A place to focus on studying together",
      tasks: ["Complete math homework", "Read chapter 5", "Prepare for quiz"],
      announcements: ["Quiz on Friday!", "New study materials uploaded"],
      image: "/api/placeholder/800/400"
    },
    2: {
      name: "Fitness Challenge",
      description: "30-day fitness challenge group",
      tasks: ["Daily workout", "Log water intake", "Share progress photo"],
      announcements: ["New challenge starts Monday!", "Congratulations to last week's winners"],
      image: "/api/placeholder/800/400"
    },
    3: {
      name: "Book Club",
      description: "Monthly book discussions",
      tasks: ["Read chapters 1-5", "Post discussion questions", "Vote on next book"],
      announcements: ["Meeting this Thursday at 7PM", "New book selections posted"],
      image: "/api/placeholder/800/400"
    }
  };

  //room selection
  const selectRoom = (roomId) => {
    setCurrentRoom(roomId);
    setEditedName(roomContent[roomId]?.name || "");
    setEditedDescription(roomContent[roomId]?.description || "");
    setView("roomContent");
  };

  //leaderboard for current room
  const showLeaderboard = () => {
    if (currentRoom) {
      setView("leaderboard");
    }
  };

  //create room view
  const showCreateRoomForm = () => {
    setView("createRoom");
    //Reset img preview
    setImagePreview(null);
  };

  //andle creae room form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewRoomData({
      ...newRoomData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageObj = {
      userId: "currentUser",
      username: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setRoomMessages(prev => ({
      ...prev,
      [currentRoom]: [...(prev[currentRoom] || []), messageObj]
    }));

    setNewMessage("");
  };


  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {

      // For demo purposes, i'll use a local URL, but in a real app, i would get a URL back from the server
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setNewRoomData({
        ...newRoomData,
        image: file // in real app, this would be a URL after upload
      });
    }
  };

  // handle room creation form submission
  const handleCreateRoom = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: newRoomData.name,
        description: newRoomData.description,
        isPublic: newRoomData.isPublic
      };

      const res = await fetch("http://localhost:5000/api/rooms", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const room = await res.json();
      if (!res.ok) throw new Error(room.error || "Room creation failed");

      setEnrolledRooms(prev => [...prev, room]);
      if (room.isPublic) setPublicRooms(prev => [...prev, room]);
      setView("myRooms");
    } catch (err) {
      console.error("Create room error:", err);
      alert(err.message);
    }
  };


  // Funct to update the room content state
  const setRoomContent = (updatedContent) => {
    Object.keys(updatedContent).forEach(roomId => {
      roomContent[roomId] = updatedContent[roomId];
    });
  };

  // Join a public room
  const joinRoom = async (roomId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/rooms/${roomId}/join`, {
        method: "PATCH",
        credentials: "include"
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to join room");
      setEnrolledRooms(prev => [...prev, data]);
      setPublicRooms(prev => prev.filter(room => room._id !== roomId));
    } catch (err) {
      console.error("Join room error:", err);
      alert(err.message);
    }
  };


  <button
    onClick={() => setView("editRoom")}
    className="px-4 py-2 bg-yellow-500 text-white rounded w-full sm:w-auto mt-2 sm:mt-0">
    Edit Room
  </button>


  const leaveRoom = async () => {
    if (!currentRoom) return;
    try {
      const res = await fetch(`http://localhost:5000/api/rooms/${currentRoom}/leave`, {
        method: "PATCH",
        credentials: "include"
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to leave room");
      }

      setEnrolledRooms(prev => prev.filter(r => r._id !== currentRoom));
      setView("myRooms");
      setCurrentRoom(null);
    } catch (err) {
      console.error("Leave room error:", err);
      alert(err.message);
    }
  };



  // add CSS for mobile responsiveness
  useEffect(() => {
    // add media query styles to document head
    const style = document.createElement('style');
    style.innerHTML = `
      @media (max-width: 768px) {
        .rooms-nav-buttons {
          flex-direction: column;
          width: 100%;
        }
        .rooms-nav-buttons button {
          margin-bottom: 8px;
          width: 100%;
        }
        .mobile-full-width {
          width: 100%;
        }
        .table-container {
          overflow-x: auto;
        }
        .stats-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
      @media (max-width: 480px) {
        .stats-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="rooms-container p-4 pt-28 md:pt-32"> {/*last padding for adjusted mobile view, maybe unneeded but leave it for now*/}
      {/* Navigation Bar for mobile*/}
      {/* Full-width gray border background */}
      <div className="fixed top-0 left-0 w-full bg-white border-b border-[#e2e8f0] z-10">
        <div className="ml-64 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-[#0f172a]">Rooms</h1>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto rooms-nav-buttons">
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
      </div>



      {/* My Rooms*/}
      {view === "myRooms" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Enrolled Rooms</h2>

          {enrolledRooms.length === 0 ? (
            <p className="text-gray-500">You haven't joined any rooms yet. Check out the public rooms!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledRooms.map(room => (
                <div
                  key={room._id}
                  className="border rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer mobile-full-width"
                  onClick={() => selectRoom(room._id)}
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={room.image || "/api/placeholder/300/200"}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{room.title || room.name}</h3>
                    <p className="text-gray-600">Category: {room.category}</p>
                    <p className="text-gray-600">Members: {room.memberCount}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* public rooms*/}
      {view === "publicRooms" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Public Rooms</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {publicRooms.map(room => (
              <div key={room._id} className="border rounded overflow-hidden shadow-sm mobile-full-width">
                <div className="h-40 overflow-hidden">
                  <img
                    src={room.image || "/api/placeholder/300/200"}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{room.title || room.name}</h3>

                  <p className="text-gray-600">Category: {room.category}</p>
                  <p className="text-gray-600">Members: {room.memberCount}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent triggering parent's onClick
                      joinRoom(room.id);
                    }}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    Join Room
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* create oom view */}
      {view === "createRoom" && (
        <div className="max-w-md mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md">
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

            {/* img upload section */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomImage">
                Room Image
              </label>
              <div className="flex flex-wrap items-center">
                <input
                  id="roomImage"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="roomImage"
                  className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 md:mb-0"
                >
                  Choose Image
                </label>
                <span className="ml-0 md:ml-3 text-sm text-gray-600 w-full md:w-auto">
                  {newRoomData.image ? newRoomData.image.name : "No file chosen"}
                </span>
              </div>

              {/* img preview */}
              {imagePreview && (
                <div className="mt-3">
                  <p className="text-sm text-gray-700 mb-1">Preview:</p>
                  <div className="border rounded overflow-hidden h-40">
                    <img
                      src={imagePreview}
                      alt="Room preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
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

            <div className="flex flex-col sm:flex-row items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto mb-2 sm:mb-0"
              >
                Create Room
              </button>
              <button
                type="button"
                onClick={() => setView("myRooms")}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {view === "editRoom" && currentRoom && (
        <div className="max-w-md mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <button
              onClick={() => setView("roomContent")}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              ← Back to Room
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-6">Edit Room Details</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              const updatedContent = {
                ...roomContent,
                [currentRoom]: {
                  ...roomContent[currentRoom],
                  name: editedName,
                  description: editedDescription
                }
              };

              setRoomContent(updatedContent);
              setView("roomContent");
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Room Name
              </label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setView("roomContent")}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}


      {/* room content  */}
      {view === "roomContent" && currentRoom && (
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <button
              onClick={() => setView("myRooms")}
              className="px-3 py-1 bg-gray-200 rounded mb-2 sm:mb-0 w-full sm:w-auto"
            >
              ← Back to Rooms
            </button>
            <button
              onClick={showLeaderboard}
              className="px-4 py-2 bg-purple-500 text-white rounded w-full sm:w-auto"
            >
              Leaderboard
            </button>
            <button onClick={() => setView("editRoom")} className="px-4 py-2 bg-yellow-500 text-white rounded w-full sm:w-auto mt-2 sm:mt-0">Edit Room</button>
            <button
              onClick={leaveRoom}
              className="px-4 py-2 bg-red-500 text-white rounded w-full sm:w-auto mt-2 sm:mt-0"
            >
              Leave Room
            </button>

          </div>

          {/* room header with img */}
          <div className="mb-6">
            <div className="rounded-lg overflow-hidden shadow-md mb-4 h-40 md:h-60">
              <img
                src={roomContent[currentRoom]?.image || "/api/placeholder/800/400"}
                alt={roomContent[currentRoom]?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold">{roomContent[currentRoom]?.name}</h2>
            <p className="text-gray-600">{roomContent[currentRoom]?.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded p-4">
              <h3 className="font-semibold text-lg mb-2">Tasks</h3>
              {roomContent[currentRoom]?.tasks.length === 0 ? (
                <p className="text-gray-500">No tasks yet. Get started by adding your first task!</p>
              ) : (
                <ul className="list-disc pl-5">
                  {roomContent[currentRoom]?.tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              )}
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
          <div className="border rounded p-4 mt-6">
            <h3 className="font-semibold text-lg mb-2">Text Chat</h3>
            <div className="h-40 overflow-y-auto border p-2 mb-3 bg-gray-50 rounded">
              {(roomMessages[currentRoom] || []).map((msg, idx) => (
                <div key={idx} className="mb-1">
                  <span className="font-semibold text-sm">{msg.username}</span>: {msg.content}
                  <span className="text-xs text-gray-500 ml-2">{msg.timestamp}</span>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                className="flex-grow border rounded-l px-3 py-1 focus:outline-none"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-1 rounded-r"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {view === "roomContent" && currentRoom && (
        <div>
          {/* existing content... */}

          {/* Voice Chat Section - for display only */}
          <div className="border rounded p-4 mt-6">
            <h3 className="font-semibold text-lg mb-2">Voice Channel</h3>
            <div className="bg-gray-100 p-4 rounded shadow-sm">
              <p className="text-gray-700">🎧 General Voice Room</p>
              <div className="flex items-center space-x-3 mt-2">
                <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center text-white font-bold">Y</div>
                <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-white font-bold">A</div>
                <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center text-white font-bold">S</div>
              </div>
              <p className="text-xs text-gray-500 mt-2">3 members connected</p>
              <button className="mt-3 bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded">
                🔇 Mute
              </button>
            </div>
          </div>
        </div>
      )}

      {/* lederboard View per room*/}
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

          <div className="overflow-x-auto table-container">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 stats-grid">
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