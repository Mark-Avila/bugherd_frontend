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

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: () => {},
  });

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
            action={<SearchField label="Search Project" />}
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
              action={<SearchField label="Add new User" icon={<Add />} />}
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
