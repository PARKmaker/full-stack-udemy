import links from "@/utils/links.jsx";
import { NavLink } from "react-router-dom";
import { useDashboardContext } from "@/hooks/useDashboardContenxt.jsx";

// eslint-disable-next-line react/prop-types
export default function NavLinks({ isBigSidebar }) {
  const { user, toggleSidebar } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (path === "admin" && role !== "admin") {
          return;
        }
        return (
          <NavLink
            to={path}
            key={text}
            className={"nav-link"}
            onClick={isBigSidebar ? null : toggleSidebar}
            end={true}
          >
            <span className={"icon"}>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}
