import { List, Paper } from "@mui/material";
import UserListItem from "./UserListItem";
import { User } from "../../types";

interface Props {
  isButton?: boolean;
  users: User[];
}

function UserList({ isButton, users }: Props) {
  return (
    <Paper variant="outlined" elevation={0}>
      <List sx={{ overflow: "auto" }} disablePadding>
        {users &&
          users.map((user) => (
            <UserListItem
              key={user.id}
              isButton={isButton}
              name={`${user.fname} ${user.lname}`}
              email={user.email}
              contact={user.contact}
            />
          ))}
      </List>
    </Paper>
  );
}

export default UserList;
