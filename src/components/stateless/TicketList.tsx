import { Box, List, Paper, Skeleton, Typography } from "@mui/material";
import TicketListItem from "./TicketListItem";
import { TicketWithUser } from "../../types";
import dayjs from "dayjs";

interface Props {
  tickets?: TicketWithUser[];
}

function TicketList({ tickets }: Props) {
  return (
    <Paper variant="outlined">
      {tickets
        ? tickets.length !== 0 && (
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
          )
        : [1, 2, 3, 4, 5].map((item, index) => (
            <Skeleton
              key={item * index}
              variant="rounded"
              width="100%"
              height={48}
              sx={{ marginTop: 1 }}
            />
          ))}
      {tickets && tickets.length === 0 && (
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
