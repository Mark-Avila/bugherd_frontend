import { Divider, Grid, List, Paper, Stack, Typography } from "@mui/material";
import PageSection from "../components/stateless/PageSection";
import { ManageUsersForm, ManageUsersItem, SearchField } from "../components";
import { useGetUsersQuery } from "../api/userApiSlice";
import { User } from "../types";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
// import { useGetUsersQuery } from "../api/userApiSlice";

const validationSchema = yup.object({
  fname: yup.string().min(2).max(50).required("Please enter a new first name"),
  lname: yup.string().min(2).max(50).required("Please enter a new last name"),
  email: yup.string().email().min(5).required("Please enter a new first name"),
  contact: yup.string().email().min(11).required("Please enter contact"),
  bday: yup.date().required("Please enter a birthday"),
  role: yup.number().oneOf([0, 1, 2]).required("Please select a role"),
});

const initialValues: User = {
  fname: "",
  lname: "",
  email: "",
  contact: "",
  bday: "",
  role: 0,
};

function ManageUsers() {
  const [userData, setUserData] = useState<User[]>([] as User[]);

  const users = useGetUsersQuery({
    name: "",
  });

  useEffect(() => {
    if (!users.isLoading && users.isSuccess && users.data) {
      setUserData(users.data.data);
    }
  }, [users.isSuccess]);

  const handleSelectUser = (user: User) => {
    formik.setValues({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      contact: user.contact,
      bday: user.bday,
      role: user.role,
    });
  };

  const formik = useFormik<User>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handleOnSubmit = () => formik.handleSubmit();

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
            {formik.values.fname !== "" ? (
              <ManageUsersForm formik={formik} onSubmit={handleOnSubmit} />
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
