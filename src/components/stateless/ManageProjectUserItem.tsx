import { Delete } from "@mui/icons-material";
import { IconButton, ListItem, ListItemText, Tooltip } from "@mui/material";

interface Props {
  name: string;
  role: number;
  onClick: VoidFunction;
}

function ManageProjectUserItem({ name, role, onClick }: Props) {
  let role_str = "Developer";

  if (role === 1) {
    role_str = "Project Manager";
  } else if (role === 2) {
    role_str = "Administrator";
  }

  return (
    <ListItem
      divider
      secondaryAction={
        <Tooltip title="Remove user from Project">
          <IconButton onClick={onClick}>
            <Delete />
          </IconButton>
        </Tooltip>
      }
    >
      <ListItemText primary={name} secondary={role_str} />
    </ListItem>
  );
}

export default ManageProjectUserItem;
