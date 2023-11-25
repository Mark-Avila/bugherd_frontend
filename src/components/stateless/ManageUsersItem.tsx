import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

interface Props {
  name: string;
  email: string;
}

function ManageUsersItem({ name, email }: Props) {
  return (
    <ListItemButton divider>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={email}
        primaryTypographyProps={{ fontSize: "small" }}
        secondaryTypographyProps={{ fontSize: "small" }}
      />
    </ListItemButton>
  );
}

export default ManageUsersItem;
