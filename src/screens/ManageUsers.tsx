import { Divider, Grid, List, Paper, Stack, Typography } from "@mui/material";
import PageSection from "../components/stateless/PageSection";
import { ManageUsersForm, ManageUsersItem, SearchField } from "../components";
import { useGetUsersQuery } from "../api/userApiSlice";
import { InputData, User } from "../types";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import dayjs, { Dayjs } from "dayjs";
// import { useGetUsersQuery } from "../api/userApiSlice";

const validationSchema = yup.object({
  fname: yup.string().min(2).max(50).required("Please enter a new first name"),
  lname: yup.string().min(2).max(50).required("Please enter a new last name"),
  email: yup.string().email().min(5).required("Please enter a new first name"),
  role: yup.number().oneOf([0, 1, 2]).required("Please select a role"),
});

const initialValues = {
  fname: "",
  lname: "",
  email: "",
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
  }, [users.isLoading]);

  const [contact, setContact] = useState<InputData<string>>({
    value: "",
    helper: "",
    isError: false,
    label: "Contact",
  });

  const [bday, setBday] = useState<InputData<Dayjs | null>>({
    value: dayjs("2023-01-01"),
    helper: "",
    isError: false,
    label: "Contact",
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handleSelectUser = (user: User) => {
    formik.setValues({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      role: user.role,
    });

    const birthDate = new Date(user.bday);
    const daysJsBday = dayjs(birthDate);
    handleBdayOnChange(daysJsBday);

    handleContactOnChange(user.contact);
  };

  const handleOnSubmit = () => formik.handleSubmit();

  const handleBdayOnChange = (new_bday: Dayjs | null) => {
    setBday((prev) => ({ ...prev, value: new_bday }));
  };

  const handleContactOnChange = (val: string) => {
    setContact((prev) => ({
      ...prev,
      value: val,
      isError: false,
    }));
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
            {formik.values.fname !== "" ? (
              <ManageUsersForm
                formik={formik}
                contact={contact}
                bday={bday}
                setBday={handleBdayOnChange}
                setContact={handleContactOnChange}
                onSubmit={handleOnSubmit}
              />
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
