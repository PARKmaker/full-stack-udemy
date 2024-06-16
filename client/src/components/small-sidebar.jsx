import Wrapper from "@/assets/wrappers/SmallSidebar.js";
import { useDashboardContext } from "@/hooks/useDashboardContenxt.jsx";
import { FaTimes } from "react-icons/fa";
import { Logo } from "@/components";
import NavLinks from "@/components/nav-links.jsx";
export default function SmallSidebar() {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className={"content"}>
          <button
            type={"button"}
            className={"close-btn"}
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
}
