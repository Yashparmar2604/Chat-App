import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={
                user.photo
                  ? user.photo
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname)}&background=25D366&color=fff&rounded=true&size=128`
              }
              alt={user.fullname}
            />
          </div>
        </div>
        <div>
          {console.log(user)}
          <h1 className=" font-bold">{user.fullname}</h1>
          <span>{user.fullname}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
