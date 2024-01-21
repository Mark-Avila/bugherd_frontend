import { ListItemButton, ListItemText } from "@mui/material";

function ManageProjectsItem() {
  return (
    <ListItemButton divider>
      <ListItemText
        primary="Project title"
        secondary="Description Description Description Description"
      />
    </ListItemButton>
  );
}

export default ManageProjectsItem;
