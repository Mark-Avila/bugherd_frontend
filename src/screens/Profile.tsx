import { Box, Grid, Pagination, Stack } from "@mui/material";
import { ProfileInfo, ProjectList, TicketList } from "../components";
import PageSection from "../components/stateless/PageSection";
import { useLazyGetTicketsOfCurrentUserQuery } from "../api/ticketApiSlice";
import { useGetCurrentProjectQuery } from "../api/projectApiSlice";
import { ProjectWithUser } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { setBreadcrumbs } from "../slices/breadSlice";

interface Props {
  viewMode?: "tickets" | "projects";
}

/**
 * TODO: Upload profile picture UI
 */

function Profile({ viewMode }: Props) {
  const [getTickets, tickets] = useLazyGetTicketsOfCurrentUserQuery();
  const projects = useGetCurrentProjectQuery();
  const { user } = useSelector((state: RootState) => state.auth);

  //Ticket Pagination
  const [maxPage, setMaxPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const TICKET_LIMIT = 5;

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      getTickets({ limit: TICKET_LIMIT, offset: 0 })
        .unwrap()
        .then((res) => {
          const pages: number = (res.count as number) / TICKET_LIMIT;
          setMaxPage(Math.round(pages));
        });
    }
  }, []);

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value <= maxPage && value >= 0) {
      setCurrPage(value);
      getTickets({ offset: (value - 1) * TICKET_LIMIT, limit: TICKET_LIMIT });
    }
  };

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
        {!viewMode && (
          <Grid item lg={4}>
            <PageSection title="User Details" width="100%">
              <ProfileInfo user={user} />
            </PageSection>
          </Grid>
        )}
        <Grid item lg={viewMode ? 12 : 8}>
          <Stack spacing={4}>
            {(!viewMode || viewMode === "projects") && (
              <PageSection title="Projects Assigned">
                <ProjectList
                  projects={
                    projects.data && (projects.data.data as ProjectWithUser[])
                  }
                />
              </PageSection>
            )}
            {(!viewMode || viewMode === "tickets") && (
              <PageSection title="Tickets created">
                {<TicketList tickets={tickets.data && tickets.data.data} />}
                <Box mt={2}>
                  <Pagination
                    count={maxPage}
                    onChange={handlePagination}
                    page={currPage}
                  />
                </Box>
              </PageSection>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default Profile;
