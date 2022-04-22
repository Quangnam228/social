import "./online.css";

export default function online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_ASSETS;

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          src={PF + user.profilePicture}
          alt=""
          className="rightbarProfileImg"
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUserName">{user.username}</span>
    </li>
  );
}
