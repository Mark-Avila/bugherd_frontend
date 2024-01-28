import { List, Paper, Stack, Typography } from "@mui/material";
import { User } from "../../types";
import { ManageProjectUserItem } from "..";

interface Props {
  users: User[];
}

function ManageProjectUserList({ users }: Props) {
  return (
    <Paper variant="outlined" sx={{ maxHeight: 500, overflowY: "auto" }}>
      <List disablePadding>
        {users.length >= 1 ? (
          users.map((assignedMember) => (
            <ManageProjectUserItem
              key={assignedMember.id}
              name={`${assignedMember.fname} ${assignedMember.lname}`}
              role={assignedMember.role}
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
