import { Form, redirect, useOutletContext } from "react-router-dom";
import Wrapper from "@/assets/wrappers/DashboardFormPage.js";
import { FormRow, FormRowSelect } from "@/components/index.js";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants.js";
import customFetch from "@/utils/custom-fetch.js";
import { toast } from "react-toastify";
import SubmitBtn from "@/components/submit-btn.jsx";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/jobs", data);
    toast.success("job.jsx added successfully");
    return redirect("all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export default function AddJob() {
  const { user } = useOutletContext() || {};

  if (!user) {
    return;
  }
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText={"job status"}
            name={"jobStatus"}
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            labelText={"job type"}
            name={"jobType"}
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn={true} />
        </div>
      </Form>
    </Wrapper>
  );
}
