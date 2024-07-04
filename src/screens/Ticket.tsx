import { Box, Grid, IconButton, Skeleton, Stack, Tooltip } from "@mui/material";
import { CommentSection, TicketDetails, TicketHeader } from "../components";
import PageSection from "../components/stateless/PageSection";
import TicketDescription from "../components/stateless/TicketDescription";
import { useGetTicketByIdQuery } from "../api/ticketApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Comment, Ticket as TicketType } from "../types";
import {
  useGetCommentsByTicketIdQuery,
  useLazyGetCommentsByTicketIdQuery,
} from "../api/commentApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Refresh } from "@mui/icons-material";
import dayjs from "dayjs";
import EditTicketModal from "./EditTicketModal";
import { setBreadcrumbs } from "../slices/breadSlice";
import { useSnackbar } from "notistack";

function Ticket() {
  const { ticket_id } = useParams();
  const [ticketData, setTicketData] = useState<TicketType | null>(null);
  const [commentsData, setComments] = useState<Comment[]>([]);
  const [editModal, setEditModal] = useState(false);

  const auth = useSelector((state: RootState) => state.auth);
  const ticket = useGetTicketByIdQuery(ticket_id!);
  const comments = useGetCommentsByTicketIdQuery(ticket_id!);

  // const [ticketLoading, setTicketLoading] = useState(true);
  // const [commentsLoading, setcommentLoading] = useState(true);

  const [updateComments] = useLazyGetCommentsByTicketIdQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (ticket.isError) {
      enqueueSnackbar("Failed to retrieve project data", { variant: "error" });
      navigate("/dashboard");
    }
  }, [ticket]);

  useEffect(() => {
    if (ticket.data) {
      if (ticket.data.data.length === 0) {
        enqueueSnackbar("Ticket data not found", { variant: "error" });
        navigate("/dashboard");
      }
    }
  }, [ticket.data]);

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: ticketData ? ticketData.project_title! : "...",
          to: `/project/${ticketData?.project_id}`,
        },
        {
          label: ticketData ? ticketData.title : "...",
          to: `/ticket/${ticketData?.id}`,
        },
      ])
    );
  }, [ticketData]);

  useEffect(() => {
    if (!ticket.isLoading && ticket.data) {
      setTicketData(ticket.data.data[0]);
    }
  }, [ticket.isLoading]);

  useEffect(() => {
    if (comments.isSuccess && !comments.isError && !comments.isLoading) {
      setComments(comments.data.data);
    }
  }, [comments.isFetching]);

  const handleUpdateComments = () => {
    updateComments(ticket_id!);
  };

  const openEditModal = () => setEditModal(true);
  const closeEditModal = () => setEditModal(false);
  const isAuthor = auth.user!.id === ticketData?.user_id;

  return (
    <>
      {isAuthor && (
        <EditTicketModal
          open={editModal}
          onClose={closeEditModal}
          ticket={ticketData as TicketType}
          projectId={ticketData?.project_id as number}
        />
      )}
      <Box>
        <Box component="header">
          {ticketData && ticketData.num ? (
            <TicketHeader
              issueNumber={ticketData.num.toString()}
              issueProject={ticketData.project_title!.toString()}
              title={ticketData.title}
              author={`${ticketData.fname} ${ticketData.lname}`}
              createdAt={`Created ${dayjs(ticketData.created_at).format(
                "MMMM DD, YYYY"
              )}`}
              archived={ticketData.project_archived}
              onUpdateClick={
                auth.user!.role >= 1 || auth.user?.id === ticketData.user_id
                  ? openEditModal
                  : null
              }
              isAuthor={isAuthor}
            />
          ) : (
            <Stack>
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={500} height={50} />
              <Stack mt={1} direction="row" gap={1}>
                <Skeleton width={100} />
                <Skeleton width={100} />
              </Stack>
            </Stack>
          )}
        </Box>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} lg={9} order={{ xs: 1, lg: 0 }}>
            {ticketData ? (
              <TicketDescription description={ticketData.descr} />
            ) : (
              <Skeleton height={200} width="99%" variant="rounded" />
            )}
          </Grid>
          <Grid item xs={12} lg={3}>
            <Box>
              {ticketData ? (
                <TicketDetails
                  status={ticketData.status}
                  type={ticketData.issue_type}
                  time={ticketData.est}
                  priority={ticketData.priority}
                />
              ) : (
                <Stack>
                  <Skeleton variant="text" height={50} width="70%" />
                  <Skeleton variant="text" height={50} width="70%" />
                  <Skeleton variant="text" height={50} width="70%" />
                  <Skeleton variant="text" height={50} width="70%" />
                </Stack>
              )}
            </Box>
          </Grid>
        </Grid>
        {!comments.isLoading ? (
          <PageSection
            title="Comments"
            marginTop={3}
            action={
              <Tooltip title="Refresh comments">
                <IconButton onClick={handleUpdateComments}>
                  <Refresh />
                </IconButton>
              </Tooltip>
            }
          >
            {auth.user && auth.user.id && ticketData && (
              <CommentSection
                comments={commentsData}
                user_id={auth.user.id.toString()}
                ticket={ticketData}
                onSubmit={handleUpdateComments}
                archived={ticketData.project_archived}
              />
            )}
          </PageSection>
        ) : (
          <PageSection title="Comments" marginTop={3}>
            <Stack gap={1}>
              {[1, 2, 3].map((item) => (
                <Stack key={item} direction="row" alignItems="center" gap={1}>
                  <Skeleton variant="circular" height={48} width={48} />
                  <Stack>
                    <Skeleton variant="text" height={20} width={100} />
                    <Skeleton variant="text" height={20} width={400} />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </PageSection>
        )}
      </Box>
    </>
  );
}

export default Ticket;
