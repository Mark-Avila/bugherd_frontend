import { Stack, TextField } from "@mui/material";
import { FormikProps } from "formik";

interface Props {
  formik: FormikProps<{
    title: string;
    description: string;
  }>;
}

function ManageProjectsForm({ formik }: Props) {
  return (
    <Stack spacing={2}>
      <TextField
        variant="outlined"
        label="Title"
        fullWidth
        size="small"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.title && formik.errors.title}
        error={formik.touched.title && Boolean(formik.errors.title)}
      />
      <TextField
        variant="outlined"
        label="Description"
        fullWidth
        size="small"
        name="description"
        rows={3}
        multiline
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.description && formik.errors.description}
        error={formik.touched.description && Boolean(formik.errors.description)}
      />
    </Stack>
  );
}

export default ManageProjectsForm;
