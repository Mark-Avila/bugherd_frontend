import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import TicketItemChips from "./TicketItemChips";

function TicketListItem() {
  return (
    <ListItem disablePadding divider secondaryAction={<TicketItemChips />}>
      <ListItemButton>
        <ListItemText
          primary="Authentication system does not work"
          secondary="#123 - Mark Christian Avila - opened on September 30, 2023"
          secondaryTypographyProps={{
            fontSize: "small",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default TicketListItem;
