import { useAllJobsContext } from "@pages/all-jobs.jsx";
import Wrapper from "@/assets/wrappers/JobsContainer.js";
import Job from "@/components/job.jsx";
import PageBtnContainer from "@/components/page-btn-container.jsx";

export default function JobsContainer() {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages } = data;

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
}
