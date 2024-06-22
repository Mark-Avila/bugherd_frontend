import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import { CommentSection, TicketDetails, TicketHeader } from "../components";
import PageSection from "../components/stateless/PageSection";
import TicketDescription from "../components/stateless/TicketDescription";
import { useGetTicketByIdQuery } from "../api/ticketApiSlice";
import { useParams } from "react-router-dom";
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

function Ticket() {
  const [ticketData, setTicketData] = useState<TicketType | null>(null);
  const [commentsData, setComments] = useState<Comment[]>([]);
  const [editModal, setEditModal] = useState(false);
  const { ticket_id } = useParams();

  const auth = useSelector((state: RootState) => state.auth);
  const ticket = useGetTicketByIdQuery(ticket_id!);
  const comments = useGetCommentsByTicketIdQuery(ticket_id!);

  const [updateComments] = useLazyGetCommentsByTicketIdQuery();

  const dispatch = useDispatch();

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

  return (
    <>
      <EditTicketModal
        open={editModal}
        onClose={closeEditModal}
        ticket={ticketData as TicketType}
        projectId={ticketData?.project_id as number}
      />
      <Box>
        <Box component="header">
          {ticketData && ticketData.num && (
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
            />
          )}
        </Box>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={9}>
            <TicketDescription
              description={ticketData ? ticketData.descr : ""}
            />
          </Grid>
          <Grid item xs={3}>
            <Box>
              {ticketData && (
                <TicketDetails
                  status={ticketData.status}
                  type={ticketData.issue_type}
                  time={ticketData.est}
                  priority={ticketData.priority}
                />
              )}
            </Box>
          </Grid>
        </Grid>
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
      </Box>
    </>
  );
}

export default Ticket;
