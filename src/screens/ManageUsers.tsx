import { Divider, Grid, List, Paper, Stack, Typography } from "@mui/material";
import PageSection from "../components/stateless/PageSection";
import { ManageUsersForm, ManageUsersItem, SearchField } from "../components";
import { useGetUsersQuery } from "../api/userApiSlice";
import { User } from "../types";
import { useEffect, useState } from "react";
// import { useGetUsersQuery } from "../api/userApiSlice";

function ManageUsers() {
  const [userData, setUserData] = useState<User[]>([] as User[]);
  const [userSelected, selectUser] = useState<User | null>(null);

  const users = useGetUsersQuery({
    name: "",
  });

  useEffect(() => {
    if (!users.isLoading && users.isSuccess && users.data) {
      setUserData(users.data.data);
    }
  }, [users.isSuccess]);

  const handleSelectUser = (user: User) => {
    selectUser(user);
  };

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
            <Paper
              variant="outlined"
              sx={{ maxHeight: 500, overflowY: "auto" }}
            >
              <List disablePadding>
                {userData.map((user) => (
                  <ManageUsersItem
                    key={user.id}
                    user={user}
                    onClick={handleSelectUser}
                  />
                ))}
              </List>
            </Paper>
          </PageSection>
        </Grid>
        <Grid item xs={6}>
          <PageSection title="User Information">
            {userSelected ? (
              <ManageUsersForm />
            ) : (
              <Stack>
                <Typography variant="h3" color="text.disabled">
                  No user selected
                </Typography>
              </Stack>
            )}
          </PageSection>
        </Grid>
      </Grid>
    </>
  );
}

export default ManageUsers;
