import { Stack, TextField } from "@mui/material";
import { FormikProps } from "formik";
import { FormikNewTicket } from "../../types";

interface Props {
  formik: FormikProps<FormikNewTicket>;
}

function NewTicketDetails({ formik }: Props) {
  return (
    <Stack spacing={2}>
      <TextField
        id="ticket-title"
        label="Title"
        size="small"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        fullWidth
      />
      <TextField
        id="ticket-title"
        label="Description"
        size="small"
        rows={14}
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        multiline
        fullWidth
      />
    </Stack>
  );
}

export default NewTicketDetails;
