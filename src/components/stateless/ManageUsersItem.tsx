import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { User } from "../../types";

interface Props {
  user: User;
  onClick?: (arg: User) => void;
}

function ManageUsersItem({ user, onClick }: Props) {
  return (
    <ListItemButton divider onClick={onClick ? () => onClick(user) : () => {}}>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary={`${user.fname} ${user.lname}`}
        secondary={user.email}
        primaryTypographyProps={{ fontSize: "small" }}
        secondaryTypographyProps={{ fontSize: "small" }}
      />
    </ListItemButton>
  );
}

export default ManageUsersItem;
