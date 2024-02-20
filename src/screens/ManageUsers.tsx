import { Divider, Grid, List, Paper, Stack, Typography } from "@mui/material";
import PageSection from "../components/stateless/PageSection";
import {
  ConfirmDialog,
  ManageUsersForm,
  ManageUsersItem,
  PageBreadcrumbs,
  SearchField,
} from "../components";
import {
  useLazyGetUsersQuery,
  useUpdateUserArchiveMutation,
  useUpdateUserMutation,
} from "../api/userApiSlice";
import { BreadItem, InputData, ResponseBody, User } from "../types";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import dayjs, { Dayjs } from "dayjs";
import { useSnackError } from "../hooks";
import { useSnackbar } from "notistack";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
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
  const { snackbarError } = useSnackError();
  const { enqueueSnackbar } = useSnackbar();

  const [currUser, setCurrUser] = useState<User | null>(null);
  const [updateUserArchive] = useUpdateUserArchiveMutation();
  const [getUsers, users] = useLazyGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();

  const [confArchDialog, setConfArchDialog] = useState<boolean>(false);
  const [confUnArchDialog, setConfUnArchDialog] = useState<boolean>(false);

  useEffect(() => {
    getUsers({
      name: "",
    }).unwrap();
  }, []);

  useEffect(() => {
    if (!users.isLoading && users.isSuccess && users.data) {
      setUserData(users.data.data);
    }
  }, [users.data]);

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
      if (!currUser) {
        return;
      }

      const payload = {
        ...values,
        bday: bday.value?.toISOString(),
        contact: contact.value.replace(/\s+/g, ""),
      };

      updateUser({ userId: currUser.id, payload })
        .unwrap()
        .then((res: ResponseBody<unknown>) => {
          if (res.success) {
            enqueueSnackbar("Successfully updated user", {
              variant: "success",
            });
          }
        })
        .catch((err) => {
          snackbarError(err);
        });

      resetBday();
      resetContact();
      formik.resetForm();
    },
  });

  const handleSelectUser = (user: User) => {
    setCurrUser(user);

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

  const onConfArchClose = () => setConfArchDialog(false);
  const onConfArchOpen = () => setConfArchDialog(true);
  const onConfUnArchClose = () => setConfUnArchDialog(false);
  const onConfUnArchOpen = () => setConfUnArchDialog(true);

  const resetContact = () => {
    setContact({
      value: "",
      helper: "",
      isError: false,
      label: "Contact",
    });
  };

  const resetBday = () => {
    setBday({
      value: null,
      helper: "",
      isError: false,
      label: "Contact",
    });
  };

  const handleUserArchive = (archive: boolean) => {
    if (!currUser) {
      return;
    }

    updateUserArchive({ userId: currUser.id, archive: archive })
      .unwrap()
      .then((res: ResponseBody<unknown>) => {
        if (res.success) {
          enqueueSnackbar(`Successfully ${archive ? "" : "un"}archived user`, {
            variant: "success",
          });
        }
      })
      .finally(() => {
        resetBday();
        resetContact();
        setCurrUser(null);
        formik.resetForm();
        onConfUnArchClose();
        onConfArchClose();
        getUsers({
          name: "",
        }).unwrap();
      })
      .catch((err: FetchBaseQueryError) => {
        snackbarError(err);
      });
  };

  const breadItems: BreadItem[] = [
    {
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      label: "Manage Users",
      to: "/manage/users",
    },
  ];

  return (
    <>
      <ConfirmDialog
        open={confUnArchDialog}
        title="Unarchive user"
        descr="Are you sure you want to unarchive this user?"
        onClose={onConfUnArchClose}
        onNo={onConfUnArchOpen}
        onYes={() => handleUserArchive(false)}
      />
      <ConfirmDialog
        open={confArchDialog}
        title="Archive user"
        descr="Are you sure you want to archive this user?"
        onClose={onConfArchClose}
        onNo={onConfArchClose}
        onYes={() => handleUserArchive(true)}
      />
      <PageBreadcrumbs items={breadItems} />
      <PageSection
        title="Manage Users"
        primaryTypographyProps={{ fontSize: 32 }}
      >
        <Typography fontSize="small">Modify organization users</Typography>
      </PageSection>
      <Divider sx={{ marginY: 4 }} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <PageSection
            title="Users"
            action={<SearchField label="Search User" />}
          >
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
        <Grid item xs={12} md={6}>
          <PageSection title="User Information">
            {currUser && formik.values.fname !== "" ? (
              <ManageUsersForm
                formik={formik}
                contact={contact}
                bday={bday}
                isArchived={currUser.archived!}
                onArchive={onConfArchOpen}
                onUnArchive={onConfUnArchOpen}
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
