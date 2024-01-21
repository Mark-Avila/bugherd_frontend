import { Delete } from "@mui/icons-material";
import { IconButton, ListItem, ListItemText, Tooltip } from "@mui/material";

function ManageProjectUserItem() {
  return (
    <ListItem
      divider
      secondaryAction={
        <Tooltip title="Remove user from Project">
          <IconButton>
            <Delete />
          </IconButton>
        </Tooltip>
      }
    >
      <ListItemText
        primary="Mark Christian Avila"
        secondary="Project Manager"
      />
    </ListItem>
  );
}

export default ManageProjectUserItem;
