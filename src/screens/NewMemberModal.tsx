import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { ModalWrapper } from "../components";
import { Add, Close } from "@mui/icons-material";
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
    <ModalWrapper open={open} onClose={onClose}>
      <Box
        display="flex"
        flexDirection="column"
        overflow="auto"
        bgcolor="background.paper"
        padding={2}
        boxShadow={24}
        borderRadius={1}
        width={{
          xs: "95%",
          lg: 400,
        }}
        height={{
          lg: 450,
        }}
        mx={{
          xs: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" ml={2} fontSize="small">
            Add New Member
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider sx={{ my: 1 }} />
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
      </Box>
    </ModalWrapper>
  );
}

export default NewMemberModal;
