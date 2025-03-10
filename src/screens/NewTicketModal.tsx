import { Box, Button, Grid } from "@mui/material";
import {
  ModalWrapper,
  NewTicketDetails,
  NewTicketSelects,
} from "../components";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  FormikNewTicket,
  Priority,
  Project,
  ResponseBody,
  Ticket,
  Type,
  User,
} from "../types";
import {
  useCreateTicketMutation,
  useLazyGetTicketByProjectIdQuery,
} from "../api/ticketApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useSnackbar } from "notistack";
import { logout } from "../slices/authSlice";
import { useSnackError } from "../hooks";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCreateNotificationMutation } from "../api/notifApiSlice";

interface Props {
  onClose: VoidFunction;
  onSuccess?: VoidFunction;
  open: boolean;
  project: Project;
  projectMembers: User[];
}

const validationSchema = yup.object({
  title: yup.string().min(2).max(100).required(),
  description: yup.string().min(2).required(),
  type: yup.string().required(),
  status: yup.boolean().required(),
  priority: yup.number().oneOf([1, 2, 3]).required(),
  hours: yup.number().min(1).required(),
});

/**
 * Modal UI component for creating a new ticket
 */
function NewTicketModal({
  onClose,
  open,
  project,
  projectMembers,
  onSuccess,
}: Props) {
  const [createTicket] = useCreateTicketMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const { snackbarError } = useSnackError();
  const [updateTickets] = useLazyGetTicketByProjectIdQuery();
  const [createNotification] = useCreateNotificationMutation();

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
        return;
      }

      const payload: Ticket = {
        title: values.title,
        descr: values.description,
        status: values.status as boolean,
        priority: values.priority as Priority,
        issue_type: values.type as Type,
        est: values.hours,
        user_id: user?.id as number,
        project_id: project.id!,
      };

      let response: ResponseBody<Ticket[]> | null = null;

      try {
        response = (await createTicket(payload).unwrap()) as ResponseBody<
          Ticket[]
        >;
      } catch (err: unknown) {
        snackbarError(err as FetchBaseQueryError, "Failed to create ticket");
      }

      if (response && response.success) {
        for await (const member of projectMembers) {
          if (member.id !== user!.id) {
            try {
              await createNotification({
                body: `A new ticket was created by ${user!.fname} ${
                  user!.lname
                } in ${project.title}`,
                to_id: member.id as number,
                from_id: user!.id as number,
                view_path: `/ticket/${response.data[0].id}`,
              });
            } catch (err: unknown) {
              snackbarError(
                err as FetchBaseQueryError,
                "Failed to notify members"
              );
            }
          }
        }
      }

      try {
        await updateTickets({ project_id: project.id!.toString() });
      } catch (err: unknown) {
        snackbarError(
          err as FetchBaseQueryError,
          "Failed to fetch updated ticket data"
        );
      }

      if (onSuccess) {
        onSuccess();
      }

      enqueueSnackbar("Successfully created new ticket", {
        variant: "success",
      });

      return handleOnClose();
    },
  });

  const handleSubmit = () => formik.handleSubmit();
  const handleClear = () => formik.resetForm();

  const handleOnClose = () => {
    handleClear();
    onClose();
  };

  return (
    <ModalWrapper
      title="New Ticket"
      maxWidth="md"
      open={open}
      onClose={handleOnClose}
      fullWidth
    >
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
    </ModalWrapper>
  );
}

export default NewTicketModal;
