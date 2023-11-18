import { Stack, Avatar, TextField, Box, Button } from "@mui/material";
import { FormikProps } from "formik";

interface Props {
  formik: FormikProps<{
    message: string;
  }>;
}

function CommentInput({ formik }: Props) {
  return (
    <Stack direction="column">
      <Stack
        direction="row"
        alignItems="start"
        gap={2}
        sx={{ padding: 2, paddingBottom: 1 }}
      >
        <div>
          <Avatar alt="markavila-pic" />
        </div>
        <Box sx={{ width: "100%" }}>
          <TextField
            variant="outlined"
            multiline
            rows={3}
            placeholder="Enter Comment"
            fullWidth
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.message && formik.errors.message}
            error={formik.touched.message && Boolean(formik.errors.message)}
          />
        </Box>
      </Stack>
      <Box
        sx={{ paddingX: 2 }}
        width="100%"
        display="flex"
        justifyContent="end"
      >
        <Button onClick={() => formik.handleSubmit()}>Comment</Button>
      </Box>
    </Stack>
  );
}

export default CommentInput;
