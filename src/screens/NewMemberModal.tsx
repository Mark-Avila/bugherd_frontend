import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { ModalWrapper } from "../components";
import { Add } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "../hooks";
import { useGetUsersQuery } from "../api/userApiSlice";
import { User } from "../types";
import getRole from "../utils/getRole";

interface Props {
  open: boolean;
  onClose: VoidFunction;
  onClick?: (user: User) => void;
}

function NewMemberModal({ open, onClose, onClick }: Props) {
  //Search string used for searching users
  const [search, setSearch] = useState<string>("");

  //Debouce value of search to reduce search queries
  const debouncedSearch = useDebounce(search, 500);

  //RTK query's and mutations
  const users = useGetUsersQuery({
    name: debouncedSearch,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <ModalWrapper
      title="New Member"
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <Stack height={500}>
        <Box mb={1}>
          <TextField
            size="small"
            onChange={handleSearch}
            placeholder="Search User"
            fullWidth
          />
        </Box>
        <Paper
          sx={{
            flexGrow: 1,
            overflow: "auto",
            height: "0px",
          }}
          variant="outlined"
        >
          <List disablePadding>
            {users.data &&
              users.isSuccess &&
              !users.isFetching &&
              !users.isLoading &&
              users.data.data.map((user) => (
                <ListItem
                  key={user.id}
                  divider
                  secondaryAction={
                    <Tooltip title="Add member">
                      <IconButton
                        onClick={() => (onClick ? onClick(user) : {})}
                      >
                        <Add />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemText
                    primaryTypographyProps={{ fontSize: 14 }}
                    secondaryTypographyProps={{ fontSize: 12 }}
                    primary={`${user.fname} ${user.lname}`}
                    secondary={getRole(user.role)}
                  />
                </ListItem>
              ))}
          </List>
        </Paper>
      </Stack>
    </ModalWrapper>
  );
}

export default NewMemberModal;
