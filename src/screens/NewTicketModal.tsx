import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  ModalWrapper,
  NewTicketDetails,
  NewTicketSelects,
} from "../components";
import { Close } from "@mui/icons-material";
import * as yup from "yup";
import { useFormik } from "formik";
import { FormikNewTicket } from "../types";

interface Props {
  onClose: VoidFunction;
  open: boolean;
}

const validationSchema = yup.object({
  title: yup.string().min(2).max(30).required(),
  description: yup.string().min(2).required(),
  type: yup.string().required(),
  status: yup.string().required(),
  priority: yup.string().oneOf(["low", "intermediate", "high"]).required(),
  hours: yup.number().min(1).required(),
});

/**
 * Modal UI component for creating a new ticket
 * @prop {VoidFunction} onClose Function to execute when the "close"
 */
function NewTicketModal({ onClose, open }: Props) {
  const formik = useFormik<FormikNewTicket>({
    initialValues: {
      title: "",
      description: "",
      type: "",
      status: "",
      priority: "",
      hours: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handleSubmit = () => formik.handleSubmit();
  const handleClear = () => formik.resetForm();

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <Paper variant="outlined">
        <Stack
          sx={{
            height: {
              lg: 600,
            },
          }}
          py={{
            xs: 2,
            lg: 4,
          }}
          px={{
            xs: 1,
            lg: 4,
          }}
          mx={{
            xs: 1,
          }}
          width={{
            lg: 900,
          }}
          height={{
            xs: "95%",
            lg: 600,
          }}
        >
          <Box display="flex" width="100%" justifyContent="space-between">
            <Typography component="header" variant="h6">
              Create new Ticket
            </Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3, mt: 1 }} />

          <Grid container spacing={2} flex={1}>
            <Grid item xs={12} md={8}>
              <NewTicketDetails formik={formik} />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTicketSelects formik={formik} />
            </Grid>
          </Grid>

          <Box display="flex" gap={2} marginTop={2} justifyContent="flex-end">
            <Button color="info" onClick={handleClear}>
              Clear
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Create
            </Button>
          </Box>
        </Stack>
      </Paper>
    </ModalWrapper>
  );
}

export default NewTicketModal;
