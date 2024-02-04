import { Box, Grid, List, ListItem, Skeleton, Stack } from "@mui/material";
import { ProfileInfo, ProjectList, TicketList } from "../components";
import PageSection from "../components/stateless/PageSection";
import { useGetTicketsOfCurrentUserQuery } from "../api/ticketApiSlice";
import { useGetCurrentProjectQuery } from "../api/projectApiSlice";
import { ProjectWithUser } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function Profile() {
  const tickets = useGetTicketsOfCurrentUserQuery({ limit: 10, offset: 0 });
  const projects = useGetCurrentProjectQuery();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Box display="flex" width="100%" justifyContent="center">
      <Grid container width="100%" spacing={2}>
        <Grid item lg={4}>
          <PageSection title="User Details" width="100%">
            <ProfileInfo user={user} />
          </PageSection>
        </Grid>
        <Grid item lg={8}>
          <Stack spacing={4}>
            <PageSection title="Projects Assigned">
              {projects.data && !projects.isLoading && !projects.isFetching && (
                <ProjectList
                  projects={projects.data.data as ProjectWithUser[]}
                />
              )}
            </PageSection>
            <PageSection title="Tickets created">
              {tickets.data && <TicketList tickets={tickets.data.data} />}
              <List>
                {(tickets.isLoading || tickets.isFetching) &&
                  [2, 4, 6, 8, 10].map((item, index) => (
                    <ListItem>
                      <Skeleton
                        key={item * index}
                        variant="rounded"
                        width="100%"
                        height={64}
                      />
                    </ListItem>
                  ))}
              </List>
            </PageSection>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
