import Wrapper from "@/assets/wrappers/Navbar.js";
import { FaAlignLeft } from "react-icons/fa";
import { Logo } from "@/components/index.js";
import { useDashboardContext } from "@/hooks/useDashboardContenxt.jsx";
import LogoutContainer from "@/components/logout-container.jsx";
import ThemeToggle from "@/components/theme-toggle.jsx";
export default function NavBar() {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className={"nav-center"}>
        <button
          type={"button"}
          className={"toggle-btn"}
          onClick={toggleSidebar}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className={"logo-text"}>dashboard</h4>
        </div>
        <div className={"btn-container"}>
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
}
