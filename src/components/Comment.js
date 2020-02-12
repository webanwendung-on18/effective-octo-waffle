import React from "react";
// import Moment from "react-moment";
import { Link } from "@reach/router";
import DefaultProfileImg from "../images/profile.jpg";

const Comment = ({ date, profileImage, message, username, messageId }) => (
  <div>
    <li className="row mb-4 message-area py-2">
      <div className="col-lg-2 d-flex align-items-center">
        <img
          src={profileImage || DefaultProfileImg}
          alt={username}
          height="100"
          width="100"
          className="timeline-image d-none d-lg-block"
        />
      </div>
      <div className="col-12 col-lg-10">
        <div className="w-100 d-flex mb-1">
          <Link className="username" to="/">
            {console.log("username", username)}@{username}{" "}
          </Link>
          {/* <span className="text-muted ml-auto">{date}</span> */}
        </div>
        <p className="message-body">{message}</p>
      </div>
    </li>
  </div>
);

export default Comment;
