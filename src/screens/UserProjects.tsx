import { useGetProjectsQuery } from "../api/projectApiSlice";
import { ProjectList } from "../components";
import PageSection from "../components/stateless/PageSection";

function UserProjects() {
  const projects = useGetProjectsQuery();

  return (
    <>
      <PageSection title="Projects">
        {projects.isSuccess && !projects.isLoading && (
          <ProjectList projects={projects.data?.data} />
        )}
      </PageSection>
    </>
  );
}

export default UserProjects;
