import { Grid, Stack } from "@mui/material";
import { ProfileInfo, ProjectList, TicketList } from "../components";
import PageSection from "../components/stateless/PageSection";
import { useGetTicketsOfCurrentUserQuery } from "../api/ticketApiSlice";
import { useGetCurrentProjectQuery } from "../api/projectApiSlice";
import { ProjectWithUser } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { setBreadcrumbs } from "../slices/breadSlice";

function Profile() {
  const tickets = useGetTicketsOfCurrentUserQuery({ limit: 10, offset: 0 });
  const projects = useGetCurrentProjectQuery();
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: user ? `${user.fname} ${user.lname}` : "...",
          to: "/profile",
        },
      ])
    );
  }, [user]);

  return (
    <Stack width="100%" direction="column">
      <Grid container width="100%" spacing={2}>
        <Grid item lg={4}>
          <PageSection title="User Details" width="100%">
            <ProfileInfo user={user} />
          </PageSection>
        </Grid>
        <Grid item lg={8}>
          <Stack spacing={4}>
            <PageSection title="Projects Assigned">
              <ProjectList
                projects={
                  projects.data && (projects.data.data as ProjectWithUser[])
                }
              />
            </PageSection>
            <PageSection title="Tickets created">
              {<TicketList tickets={tickets.data && tickets.data.data} />}
            </PageSection>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default Profile;
