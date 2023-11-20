import { CheckCircle } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import { User } from "../../types";

interface Props {
  search: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  users: User[];
  handleAddAssigned: (user: User) => void;
  handleIsAssigned: (userId: number) => boolean;
}

function SelectMembers({
  search,
  handleSearch,
  users,
  handleAddAssigned,
  handleIsAssigned,
}: Props) {
  return (
    <Stack spacing={2} height="100%">
      <Typography fontSize={12}>Assign members</Typography>
      <TextField
        value={search}
        onChange={handleSearch}
        variant="filled"
        size="small"
        label="Search"
        id="project-search"
      />
      <Paper
        variant="outlined"
        sx={{
          flexGrow: 1,
          overflow: "auto",
          height: "0px",
        }}
      >
        {users && (
          <List>
            {users.map((user: User, index) => (
              <ListItemButton
                onClick={() => handleAddAssigned(user)}
                key={index + 100}
                divider
              >
                <ListItemText
                  primaryTypographyProps={{ fontSize: 12 }}
                  primary={`${user.fname} ${user.lname}`}
                />
                {handleIsAssigned(user.id as number) && (
                  <ListItemSecondaryAction>
                    <CheckCircle color="success" />
                  </ListItemSecondaryAction>
                )}
              </ListItemButton>
            ))}
          </List>
        )}
      </Paper>
    </Stack>
  );
}

export default SelectMembers;
