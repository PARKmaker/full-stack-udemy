import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Wrapper from "@/assets/wrappers/ThemeToggle";
import { useDashboardContext } from "@/hooks/useDashboardContenxt.jsx";

export default function ThemeToggle() {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className="toggle-icon" />
      ) : (
        <BsFillMoonFill className="toggle-icon" />
      )}
    </Wrapper>
  );
}
