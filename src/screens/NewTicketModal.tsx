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
import {
  FormikNewTicket,
  Priority,
  ResponseBody,
  Ticket,
  Type,
} from "../types";
import { useCreateTicketMutation } from "../api/ticketApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useSnackbar } from "notistack";
import { logout } from "../slices/authSlice";
import { useSnackError } from "../hooks";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

interface Props {
  onClose: VoidFunction;
  open: boolean;
  project_id: number;
}

const validationSchema = yup.object({
  title: yup.string().min(2).max(30).required(),
  description: yup.string().min(2).required(),
  type: yup.string().required(),
  status: yup.boolean().required(),
  priority: yup.number().oneOf([1, 2, 3]).required(),
  hours: yup.number().min(1).required(),
});

/**
 * Modal UI component for creating a new ticket
 * @prop {VoidFunction} onClose Function to execute when the "close"
 */
function NewTicketModal({ onClose, open, project_id }: Props) {
  const [createTicket] = useCreateTicketMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const { snackbarError } = useSnackError();

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
      if (!user) {
        enqueueSnackbar("Session expired", { variant: "error" });
        logout();
      }

      const payload: Ticket = {
        title: values.title,
        descr: values.description,
        status: values.status as boolean,
        priority: values.priority as Priority,
        issue_type: values.type as Type,
        est: values.hours,
        user_id: user?.id as number,
        project_id: project_id,
      };

      try {
        const response: ResponseBody<unknown> = await createTicket(
          payload
        ).unwrap();

        if (response.success) {
          enqueueSnackbar("Successfully created new ticket", {
            variant: "success",
          });

          return handleOnClose();
        }
      } catch (err: unknown) {
        snackbarError(err as FetchBaseQueryError);
      }
    },
  });

  const handleSubmit = () => formik.handleSubmit();
  const handleClear = () => formik.resetForm();

  const handleOnClose = () => {
    handleClear();
    onClose();
  };

  return (
    <ModalWrapper open={open} onClose={handleOnClose}>
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
            <IconButton onClick={handleOnClose}>
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
