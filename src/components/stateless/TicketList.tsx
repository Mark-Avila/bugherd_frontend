import { List, Paper } from "@mui/material";
import TicketListItem from "./TicketListItem";

function TicketList() {
  return (
    <Paper variant="outlined">
      <List disablePadding>
        <TicketListItem />
        <TicketListItem />
        <TicketListItem />
        <TicketListItem />
        <TicketListItem />
        <TicketListItem />
        <TicketListItem />
      </List>
    </Paper>
  );
}

export default TicketList;
