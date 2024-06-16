import Wrapper from "@/assets/wrappers/BigSidebar.js";
import Logo from "./logo.jsx";
import { useDashboardContext } from "@/hooks/useDashboardContenxt.jsx";
import NavLinks from "@/components/nav-links.jsx";
export default function BigSidebar() {
  const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className={"content"}>
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar={true} />
        </div>
      </div>
    </Wrapper>
  );
}
