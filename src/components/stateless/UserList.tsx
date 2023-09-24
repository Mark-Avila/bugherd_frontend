import { List } from "@mui/material";
import UserListItem from "./UserListItem";

interface Props {
  isButton?: boolean;
}

function UserList({ isButton }: Props) {
  return (
    <List sx={{ overflow: "auto" }}>
      <UserListItem isButton={isButton} name="Mark Avila" isLead />
      <UserListItem isButton={isButton} name="Harvey Alonday" />
      <UserListItem isButton={isButton} name="John Remmon Castor" />
      <UserListItem isButton={isButton} name="Neilmathew Lacsamana" />
    </List>
  );
}

export default UserList;
