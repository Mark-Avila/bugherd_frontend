import { Close } from "@mui/icons-material";
import {
  Stack,
  Box,
  Typography,
  TextField,
  IconButton,
  Divider,
  Chip,
  Grid,
  Button,
} from "@mui/material";
import { UserList } from "..";
import * as yup from "yup";
import { useFormik } from "formik";

interface Props {
  onClose: VoidFunction;
}

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

function NewProjectModal({ onClose }: Props) {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
    },
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" ml={2} fontSize="small">
          New Project
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} lg={6}>
          <Stack spacing={2}>
            <TextField
              size="small"
              label="Title"
              id="project-title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.title && formik.errors.title}
              error={formik.touched.title && Boolean(formik.errors.title)}
              fullWidth
            />
            <TextField
              size="small"
              label="Description"
              id="project-desc"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.description && formik.errors.description
              }
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              multiline
              rows={5}
            />

            <Typography fontSize={12}>Assigned</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1, gap: 1 }}>
              <Chip label="Mark Christian Avila" />
              <Chip label="Mark Christian Avila" />
              <Chip label="Mark Christian Avila" />
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Stack spacing={2}>
            <Typography fontSize={12}>Assign members</Typography>
            <TextField
              variant="filled"
              size="small"
              label="Search"
              id="project-search"
            />
            <Box sx={{ height: 200 }}>
              <UserList isButton />
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => formik.handleSubmit()} variant="contained">
          SUBMIT
        </Button>
      </Box>
    </>
  );
}

export default NewProjectModal;
