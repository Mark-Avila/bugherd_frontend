import {
  Box,
  List,
  ListItem,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import TicketListItem from "./TicketListItem";
import { TicketWithUser } from "../../types";
import dayjs from "dayjs";

interface Props {
  tickets?: TicketWithUser[];
}

function TicketList({ tickets }: Props) {
  return (
    <Paper variant="outlined">
      {tickets ? tickets.length !== 0 && (
          <List disablePadding>
            {tickets.map((ticket, index) => (
              <TicketListItem
                key={index}
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
      ) : (
        <List>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <ListItem divider key={item * index}>
              <Stack>
                <Skeleton
                  variant="text"
                  width={120}
                  height={24}
                />
                <Skeleton
                  variant="text"
                  width={300}
                  height={24}
                />
              </Stack>
            </ListItem>
          ))}
        </List>
      )}
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
