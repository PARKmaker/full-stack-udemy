import { Form, Link, redirect, useNavigation } from "react-router-dom";
import Wrapper from "@/assets/wrappers/RegisterAndLoginPage.js";
import { Logo } from "@/components/index.js";
import FormRow from "../components/form-row.jsx";
import customFetch from "@/utils/custom-fetch.js";
import { toast } from "react-toastify";
import SubmitBtn from "@/components/submit-btn.jsx";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    return error;
  }
};

export default function Register() {
  return (
    <Wrapper>
      <Form method={"post"} className={"form"}>
        <Logo />
        <h4>Register</h4>
        <FormRow type={"text"} name={"name"} />
        <FormRow
          type={"text"}
          name={"lastName"}
          defaultValue={"박"}
          labelText={"last name"}
        />
        <FormRow type={"text"} name={"location"} />
        <FormRow type={"text"} name={"email"} />
        <FormRow type={"password"} name={"password"} />
        <SubmitBtn />
        <p>
          Already a member?
          <Link to={"/login"} className={"member-btn"}>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}
