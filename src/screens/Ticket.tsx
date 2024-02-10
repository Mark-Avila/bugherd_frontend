import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import {
  CommentSection,
  PageBreadcrumbs,
  TicketDetails,
  TicketHeader,
} from "../components";
import PageSection from "../components/stateless/PageSection";
import TicketDescription from "../components/stateless/TicketDescription";
import { useGetTicketByIdQuery } from "../api/ticketApiSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BreadItem, Comment, Ticket as TicketType } from "../types";
import {
  useGetCommentsByTicketIdQuery,
  useLazyGetCommentsByTicketIdQuery,
} from "../api/commentApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Refresh } from "@mui/icons-material";

function Ticket() {
  const [ticketData, setTicketData] = useState<
    (TicketType & { fname: string; lname: string }) | null
  >(null);
  const [commentsData, setComments] = useState<Comment[]>([]);

  const auth = useSelector((state: RootState) => state.auth);
  const { ticket_id } = useParams();
  const ticket = useGetTicketByIdQuery(ticket_id!);
  const comments = useGetCommentsByTicketIdQuery(ticket_id!);
  const [updateComments] = useLazyGetCommentsByTicketIdQuery();

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

  const breadItems: BreadItem[] = [
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
  ];

  return (
    <Box>
      <PageBreadcrumbs items={breadItems} />
      <Box component="header">
        {ticketData && ticketData.num && (
          <TicketHeader
            issueNumber={ticketData.num.toString()}
            issueProject={ticketData.project_title!.toString()}
            title={ticketData.title}
            author={`${ticketData.fname} ${ticketData.lname}`}
            createdAt="3 days ago"
            archived={ticketData.project_archived}
          />
        )}
      </Box>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={9}>
          <TicketDescription description={ticketData ? ticketData.descr : ""} />
        </Grid>
        <Grid item xs={3}>
          <Box my={2}>
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
            ticket_id={(ticketData as TicketType).id as string}
            onSubmit={handleUpdateComments}
            archived={ticketData.project_archived}
          />
        )}
      </PageSection>
    </Box>
  );
}

export default Ticket;
