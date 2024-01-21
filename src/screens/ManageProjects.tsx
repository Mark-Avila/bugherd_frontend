import {
  Button,
  Divider,
  Grid,
  List,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import PageSection from "../components/stateless/PageSection";
import {
  ManageProjectUserItem,
  ManageProjectsForm,
  ManageProjectsItem,
  SearchField,
} from "../components";
import { useFormik } from "formik";
import * as yup from "yup";
import { Add } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "../hooks";
import { useGetUsersQuery } from "../api/userApiSlice";
import { User } from "../types";

const validationSchema = yup.object({
  title: yup
    .string()
    .min(2, "Title is too short")
    .max(30, "Title is too long")
    .required("Please enter a title"),
  description: yup
    .string()
    .min(2, "Description is too short")
    .required("Please enter a description"),
});

function ManageProjects() {
  // const [projectId, setProjectId] = useState<number | null>(null);
  // const [selectedUser, setSelectedUser] = useState<number | null>(123);

  //Search string used for searching users
  const [userSearch, setUserSearch] = useState<string>("");

  //Debouce value of search to reduce search queries
  const debouncedSearch = useDebounce(userSearch, 500);

  //RTK query's and mutations
  const searchedUsers = useGetUsersQuery({
    name: debouncedSearch,
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: () => {},
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setUserSearch(e.target.value);
  };

  const handleSearchBlur = () => {
    setUserSearch("");
  };

  return (
    <PageSection
      title="Manage Projects"
      primaryTypographyProps={{ fontSize: 32 }}
    >
      <Typography fontSize="small">Modify organization projects</Typography>
      <Divider sx={{ my: 4 }} />
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <PageSection
            title="Projects"
            action={<SearchField value="" label="Search Project" />}
          >
            <Paper
              variant="outlined"
              sx={{ maxHeight: 500, overflowY: "auto" }}
            >
              <List disablePadding>
                <ManageProjectsItem />
                <ManageProjectsItem />
                <ManageProjectsItem />
                <ManageProjectsItem />
                <ManageProjectsItem />
              </List>
            </Paper>
          </PageSection>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <PageSection title="Project Information">
              <ManageProjectsForm formik={formik} />
            </PageSection>
            <PageSection
              title="Project Members"
              action={
                <SearchField
                  value={userSearch}
                  options={searchedUsers.data?.data}
                  getOptionLabel={(item: unknown) =>
                    `#${(item as User).id} - ${(item as User).fname} ${
                      (item as User).lname
                    }`
                  }
                  onChange={handleSearch}
                  label="Add new User"
                  icon={<Add />}
                  onBlur={handleSearchBlur}
                />
              }
            >
              <Stack spacing={2}>
                <Paper
                  variant="outlined"
                  sx={{ maxHeight: 500, overflowY: "auto" }}
                >
                  <List disablePadding>
                    <ManageProjectUserItem />
                    <ManageProjectUserItem />
                    <ManageProjectUserItem />
                    <ManageProjectUserItem />
                    <ManageProjectUserItem />
                    <ManageProjectUserItem />
                  </List>
                </Paper>
                <Stack direction="row" justifyContent="space-between">
                  <Button variant="outlined" color="error">
                    Delete Project
                  </Button>
                  <Button variant="contained">Edit</Button>
                </Stack>
              </Stack>
            </PageSection>
          </Stack>
        </Grid>
      </Grid>
    </PageSection>
  );
}

export default ManageProjects;
