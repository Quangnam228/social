import "./post.css";
import { MoreVert, Reply } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.like.length);
  const [isLike, setIsLike] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_ASSETS;
  const { user: currentUser } = useContext(AuthContext);

  const handleLikeClick = async () => {
    try {
      axios.put("http://localhost:8800/api/posts/" + post._id + "/like", {
        userId: currentUser.user._id,
      });
    } catch (error) {}
    setLike(isLike ? like - 1 : like + 1);
    setIsLike(!isLike);
  };
  useEffect(() => {
    setIsLike(post.like.includes(currentUser.user._id));
  }, [currentUser.user._id, post.like]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={PF + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}/like.png`}
              onClick={handleLikeClick}
              alt=""
              className="likeIcon"
            />
            <img
              src={`${PF}/heart.png`}
              onClick={handleLikeClick}
              alt=""
              className="likeIcon"
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomCenter">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
          <div className="postBottomRight">
            <button className="postButtonShare">
              <span>
                <Reply />
              </span>
              share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
