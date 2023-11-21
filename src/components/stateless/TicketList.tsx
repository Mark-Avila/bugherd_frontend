import { Box, List, Paper, Typography } from "@mui/material";
import TicketListItem from "./TicketListItem";
import { TicketWithUser } from "../../types";
import dayjs from "dayjs";

interface Props {
  tickets: TicketWithUser[];
}

function TicketList({ tickets }: Props) {
  return (
    <Paper variant="outlined">
      {tickets.length !== 0 && (
        <List disablePadding>
          {tickets.map((ticket) => (
            <TicketListItem
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              number={(ticket.num as number).toString()}
              created={dayjs(ticket.created_at).format("LL")}
              author={`${ticket.fname} ${ticket.lname}`}
              priority={ticket.priority}
              status={ticket.status}
            />
          ))}
        </List>
      )}
      {tickets.length === 0 && (
        <Box sx={{ p: 4, height: 200 }}>
          <Typography variant="h5" color="InactiveCaptionText">
            No Tickets Yet
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

export default TicketList;
