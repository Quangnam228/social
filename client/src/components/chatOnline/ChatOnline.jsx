import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_ASSETS;
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/users/friends/" + currentId
      );
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);
  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/conversations/find/${currentId}/${user._id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((online) => (
        <div
          className="chatOnlineFriend"
          onClick={() => handleClick(online)}
          key={online.username}
        >
          <div className="chatOnlineImgContainer">
            <img
              src={
                online?.profilePicture
                  ? PF + online?.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <div className="chatOnlineName">{online.username}</div>
        </div>
      ))}
      {/* <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="chatOnlineImg"
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <div className="chatOnlineName">nam</div>
      </div> */}
    </div>
  );
}
