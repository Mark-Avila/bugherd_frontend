import { Divider, List, Paper } from "@mui/material";
import UserListItem from "./UserListItem";

interface Props {
  isButton?: boolean;
}

function UserList({ isButton }: Props) {
  return (
    <List sx={{ overflow: "auto" }}>
      <UserListItem isButton={isButton} name="Mark Avila" isLead />
      <Divider />
      <UserListItem isButton={isButton} name="Harvey Alonday" />
      <Divider />
      <UserListItem isButton={isButton} name="John Remmon Castor" />
      <Divider />
      <UserListItem isButton={isButton} name="Neilmathew Lacsamana" />
      <Divider />
      <UserListItem isButton={isButton} name="Mark Avila" isLead />
      <Divider />
      <UserListItem isButton={isButton} name="Harvey Alonday" />
      <Divider />
      <UserListItem isButton={isButton} name="John Remmon Castor" />
      <Divider />
      <UserListItem isButton={isButton} name="Neilmathew Lacsamana" />
    </List>
  );
}

export default UserList;
