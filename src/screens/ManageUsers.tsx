import {
  Divider,
  Grid,
  IconButton,
  List,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PageSection from "../components/stateless/PageSection";
import { ManageUsersForm, ManageUsersItem } from "../components";
import { Search } from "@mui/icons-material";
// import { useGetUsersQuery } from "../api/userApiSlice";

function SearchField() {
  return (
    <Stack direction="row" spacing={2} useFlexGap>
      <TextField placeholder="Search User" size="small" />
      <IconButton>
        <Search />
      </IconButton>
    </Stack>
  );
}

function ManageUsers() {
  return (
    <>
      <PageSection
        title="Manage Users"
        primaryTypographyProps={{ fontSize: 32 }}
      >
        <Typography fontSize="small">Modify organization users</Typography>
      </PageSection>
      <Divider sx={{ marginY: 4 }} />
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <PageSection title="Users" action={<SearchField />}>
            <Paper variant="outlined">
              <List disablePadding>
                <ManageUsersItem
                  name="Mark Avila"
                  email="markavila@gmail.com"
                />
                <ManageUsersItem
                  name="Mark Avila"
                  email="markavila@gmail.com"
                />
                <ManageUsersItem
                  name="Mark Avila"
                  email="markavila@gmail.com"
                />
                <ManageUsersItem
                  name="Mark Avila"
                  email="markavila@gmail.com"
                />
                <ManageUsersItem
                  name="Mark Avila"
                  email="markavila@gmail.com"
                />
              </List>
            </Paper>
          </PageSection>
        </Grid>
        <Grid item xs={6}>
          <PageSection title="User Information">
            <ManageUsersForm />
            {/* <Stack>
              <Typography variant="h3" color="text.disabled">
                No user selected
              </Typography>
            </Stack> */}
          </PageSection>
        </Grid>
      </Grid>
    </>
  );
}

export default ManageUsers;
