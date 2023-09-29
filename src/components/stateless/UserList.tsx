import { List, Paper } from "@mui/material";
import UserListItem from "./UserListItem";

interface Props {
  isButton?: boolean;
}

function UserList({ isButton }: Props) {
  return (
    <Paper variant="outlined" elevation={0}>
      <List sx={{ overflow: "auto" }} disablePadding>
        <UserListItem isButton={isButton} name="Mark Avila" isLead />
        <UserListItem isButton={isButton} name="Harvey Alonday" />
        <UserListItem isButton={isButton} name="John Remmon Castor" />
        <UserListItem isButton={isButton} name="Neilmathew Lacsamana" />
      </List>
    </Paper>
  );
}

export default UserList;
