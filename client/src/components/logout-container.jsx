import { useState } from "react";
import { useDashboardContext } from "@/hooks/useDashboardContenxt.jsx";
import Wrapper from "@/assets/wrappers/LogoutContainer.js";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";

export default function LogoutContainer() {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();

  return (
    <Wrapper>
      <button
        className={"btn logout-btn"}
        type={"button"}
        onClick={() => setShowLogout((prevState) => !prevState)}
      >
        {user.avatar ? (
          <img src={user.avatar} alt={"avatar"} className={"img"} />
        ) : (
          <FaUserCircle />
        )}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button type={"button"} className={"dropdown-btn"} onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
}
