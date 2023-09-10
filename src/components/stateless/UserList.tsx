import { Divider, List, Paper } from "@mui/material";
import UserListItem from "./UserListItem";

function UserList() {
  return (
    <Paper sx={{ height: "100%" }} variant="outlined">
      <List sx={{ height: "100%", overflow: "auto" }}>
        <UserListItem name="Mark Avila" isLead />
        <Divider />
        <UserListItem name="Harvey Alonday" />
        <Divider />
        <UserListItem name="John Remmon Castor" />
        <Divider />
        <UserListItem name="Neilmathew Lacsamana" />
        <Divider />
        <UserListItem name="Mark Avila" isLead />
        <Divider />
        <UserListItem name="Harvey Alonday" />
        <Divider />
        <UserListItem name="John Remmon Castor" />
        <Divider />
        <UserListItem name="Neilmathew Lacsamana" />
      </List>
    </Paper>
  );
}

export default UserList;
