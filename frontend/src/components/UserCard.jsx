import { useEffect, useState } from "react";
import UserApi from "../api/UserApi";
import ProfileApi from "../api/ProfileApi";
import Lady from "../assets/images/profile/profile-photo.png";

export default function UserCard({ profileInfo }) {
  const { name, surname, countryFrom, liveIn, bio, mentorArea } = profileInfo;
  const [toggleInfo, setToggleInfo] = useState(false);

  return (
    <section className="userCard" onClick={() =>
      toggleInfo ? setToggleInfo(false) : setToggleInfo(true)
    }>
      <img src={Lady} className="userCard__avatar" />
        <p className="userCard__full-name">{name} {surname}</p>
      <p className="userCard__origin">
        I'm from {countryFrom}. 
        My home now is in {liveIn}
      </p>
      {toggleInfo && 
      <div className="userCard__info">
      {/* <p className="userCard__email">{email}</p> */}
      <p className="userCard__mentorship">
        I can mentor others in {mentorArea}
      </p>
      <br/>
      <p className="userCard__bio"> Bio: </p>
      <p>{bio}</p>
      </div>}
    </section>
  );
}
