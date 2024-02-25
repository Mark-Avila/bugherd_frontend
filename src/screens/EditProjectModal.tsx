import { Button, Stack, TextField } from "@mui/material";
import { ModalWrapper } from "../components";
import * as yup from "yup";
import { useFormik } from "formik";
import { useUpdateProjectMutation } from "../api/projectApiSlice";
import { useSnackError } from "../hooks";
import { useSnackbar } from "notistack";
import { ResponseBody } from "../types";

interface Props {
  open: boolean;
  onClose: VoidFunction;
  project_id: string;
  title: string;
  description: string;
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

function EditProjectModal({
  open,
  onClose,
  project_id,
  title,
  description,
}: Props) {
  const [updateProject] = useUpdateProjectMutation();
  const { snackbarError } = useSnackError();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      title: title,
      description: description,
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        project_id: project_id,
        title: values.title,
        descr: values.description,
      };

      await updateProject(payload)
        .unwrap()
        .then((res: ResponseBody<unknown>) => {
          if (res.success) {
            enqueueSnackbar("Successfully updated user", {
              variant: "success",
            });
          }
        })
        .finally(() => onClose())
        .catch((err) => {
          snackbarError(err);
        });
    },
  });

  return (
    <ModalWrapper
      title="Edit Project"
      open={open}
      fullWidth
      maxWidth="sm"
      onClose={onClose}
    >
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
          helperText={formik.touched.description && formik.errors.description}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          multiline
          rows={5}
          fullWidth
        />
      </Stack>
      <Stack mt={2} direction="row" justifyContent="flex-end">
        <Button variant="contained" onClick={() => formik.handleSubmit()}>
          Submit
        </Button>
      </Stack>
    </ModalWrapper>
  );
}

export default EditProjectModal;
