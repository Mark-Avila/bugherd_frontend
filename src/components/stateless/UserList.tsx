import { List, Paper, useTheme } from "@mui/material";
import UserListItem from "./UserListItem";
import { User } from "../../types";

interface Props {
  isButton?: boolean;
  users: User[];
  lead?: number;
}

function UserList({ isButton, users, lead }: Props) {
  const theme = useTheme();
  return (
    <Paper
      variant="outlined"
      sx={{ backgroundColor: theme.palette.background.paper }}
      elevation={0}
    >
      <List sx={{ overflow: "auto" }} disablePadding>
        {users &&
          users.map((user) => (
            <UserListItem
              key={user.id as number}
              isButton={isButton}
              isLead={Boolean(lead) && user.id === lead}
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
