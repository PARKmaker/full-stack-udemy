import Wrapper from "../assets/wrappers/LandingPage.js";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components/index.js";
export default function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className={"container page"}>
        <div className={"info"}>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
            corporis illum impedit maxime provident quos repudiandae sunt,
            temporibus. Ab accusantium cupiditate in iusto maxime saepe suscipit
            totam ullam vitae voluptate?
          </p>
          <Link to={"/register"} className={"btn register-link"}>
            Register
          </Link>
          <Link to={"/login"} className={"btn"}>
            login / Demo User
          </Link>
        </div>
        <img src={main} alt={"job hunt"} className={"img main-img"} />
      </div>
    </Wrapper>
  );
}
