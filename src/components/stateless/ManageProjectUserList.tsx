import { List, Paper, Stack, Typography, useTheme } from "@mui/material";
import { User } from "../../types";
import { ManageProjectUserItem } from "..";

interface Props {
  users: User[];
  onItemClick: (user: User) => void;
}

function ManageProjectUserList({ users, onItemClick }: Props) {
  const theme = useTheme();
  return (
    <Paper
      variant="outlined"
      sx={{
        maxHeight: 300,
        overflowY: "auto",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <List disablePadding>
        {users.length >= 1 ? (
          users.map((assignedMember) => (
            <ManageProjectUserItem
              key={assignedMember.id}
              name={`${assignedMember.fname} ${assignedMember.lname}`}
              role={assignedMember.role}
              onClick={() => onItemClick(assignedMember)}
            />
          ))
        ) : (
          <Stack spacing={1} padding={3}>
            <Typography color="text.disabled">No assigned Members</Typography>
          </Stack>
        )}
      </List>
    </Paper>
  );
}

export default ManageProjectUserList;
