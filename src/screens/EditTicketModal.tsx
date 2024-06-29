import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Priority, ResponseBody, Ticket, Type, User } from "../types";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useUpdateTicketMutation } from "../api/ticketApiSlice";
import { useSnackbar } from "notistack";
import { useSnackError } from "../hooks";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ModalWrapper } from "../components";
import { useLazyGetProjectAssignQuery } from "../api/projectAssignApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useCreateNotificationMutation } from "../api/notifApiSlice";

interface Props {
  open?: boolean;
  onClose: VoidFunction;
  ticket?: Ticket;
  projectId: number;
}

const validationSchema = yup.object({
  title: yup
    .string()
    .min(2, "Title is too short")
    .max(100, "Title is too long")
    .required("Please enter a title"),
  desc: yup
    .string()
    .min(2, "Description is too short")
    .required("Please enter a description"),
  status: yup.number().oneOf([1, 0]),
  priority: yup.number().oneOf([1, 2, 3]),
  type: yup.string().oneOf(["issue", "bug", "feature", "error", "other"]),
  est: yup.number().moreThan(0, "Must be greater than 0"),
});

/**
 * Modal form editing or updating ticket details.
 * Used in the 'Ticket' screen
 */
function EditTicketModal({ open, onClose, ticket }: Props) {
  // Method or mutation for updating ticket data
  const [updateTicket] = useUpdateTicketMutation();

  /**
   * Method for fetching users assigned to a project.
   * Used for sending notifications to the assigned users
   */
  const [getAssigned] = useLazyGetProjectAssignQuery();

  // Method or mutation for creating/sending notifications
  const [createNotification] = useCreateNotificationMutation();

  // User authentication state
  const { user } = useSelector((root: RootState) => root.auth);

  // Snackbar hooks
  const { enqueueSnackbar } = useSnackbar();
  const { snackbarError } = useSnackError();

  // Set ticket data on initial load
  useEffect(() => {
    if (ticket) {
      formik.setValues({
        title: ticket.title,
        desc: ticket.descr,
        status: ticket.status ? 1 : 0,
        priority: ticket.priority,
        type: ticket.issue_type,
        est: ticket.est,
      });
    }
  }, []);

  // Formik hook for form validation and handling
  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      status: 0,
      priority: 1,
      type: "issue",
      est: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (ticket) {
        const { title, desc, status, priority, est, type } = values;

        // New ticket data
        const data: Ticket = {
          title: title,
          descr: desc,
          status: Boolean(status),
          priority: priority as Priority,
          est: est,
          issue_type: type as Type,
          user_id: ticket.user_id,
          project_id: ticket.project_id,
        };

        let response: ResponseBody<unknown> | null = null;

        // Update ticket information
        try {
          response = (await updateTicket({
            id: ticket.id!,
            data: data,
          }).unwrap()) as ResponseBody<Ticket[]>;
        } catch (err: unknown) {
          snackbarError(err as FetchBaseQueryError, "Failed to update ticket");
        }

        /**
         * If updating the ticket was successful, fetch the user data of those
         * assigned to the project the ticket is in
         */
        if (response && response.success) {
          try {
            response = (await getAssigned(
              ticket.project_id.toString()
            ).unwrap()) as ResponseBody<User[]>;
          } catch (err: unknown) {
            snackbarError(
              err as FetchBaseQueryError,
              "Failed to compelete ticket update process"
            );
          }
        }

        /**
         * If fetching user data was successful, create or send a notification
         * for each user id
         */
        if (response && response.success) {
          let projectMembers: User[] = (response as ResponseBody<User[]>).data;

          for await (const member of projectMembers) {
            if (member.id !== user!.id) {
              try {
                await createNotification({
                  body: `A ticket's details was updated by ${user!.fname} ${
                    user!.lname
                  } in ${ticket.project_title}`,
                  to_id: member.id as number,
                  from_id: user!.id as number,
                  view_path: `/ticket/${ticket.id}`,
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

        if (response && response.success) {
          enqueueSnackbar("Successfully updated ticket information", {
            variant: "success",
          });
          onClose();
        }
      }
    },
  });

  const handleSubmit = () => formik.handleSubmit();

  return (
    <ModalWrapper
      title="Edit Ticket"
      open={Boolean(open)}
      onClose={onClose}
      fullWidth
    >
      <Stack spacing={2}>
        <TextField
          size="small"
          placeholder="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.title && formik.errors.title}
          error={formik.touched.title && Boolean(formik.errors.title)}
        />
        <TextField
          size="small"
          placeholder="Description"
          multiline
          name="desc"
          value={formik.values.desc}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.desc && formik.errors.desc}
          error={formik.touched.desc && Boolean(formik.errors.desc)}
          rows={4}
        />
        <Stack direction="row" alignItems="center" spacing={5}>
          <Box width={70}>
            <Typography>Status</Typography>
          </Box>
          <Select
            value={formik.values.status}
            name="status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.status && Boolean(formik.errors.status)}
            size="small"
            fullWidth
          >
            <MenuItem value={1}>Ongoing</MenuItem>
            <MenuItem value={0}>Resolve</MenuItem>
          </Select>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={5}>
          <Box width={70}>
            <Typography>Priority</Typography>
          </Box>
          <Select
            value={formik.values.priority}
            name="priority"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.priority && Boolean(formik.errors.priority)}
            size="small"
            fullWidth
          >
            <MenuItem value={3}>High</MenuItem>
            <MenuItem value={2}>Intermediate</MenuItem>
            <MenuItem value={1}>Low</MenuItem>
          </Select>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={5}>
          <Box width={70}>
            <Typography>Type</Typography>
          </Box>
          <Select
            value={formik.values.type}
            size="small"
            fullWidth
            name="type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.type && Boolean(formik.errors.type)}
          >
            <MenuItem value="issue">Issue</MenuItem>
            <MenuItem value="bug">Bug</MenuItem>
            <MenuItem value="feature">Feature</MenuItem>
            <MenuItem value="error">Error</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={5}
        >
          <Box width={70}>
            <Typography>Hours</Typography>
          </Box>
          <TextField
            value={formik.values.est}
            size="small"
            type="number"
            name="est"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.est && formik.errors.est}
            error={formik.touched.est && Boolean(formik.errors.est)}
            fullWidth
          />
        </Stack>
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus variant="contained">
            Save
          </Button>
        </Stack>
      </Stack>
    </ModalWrapper>
  );
}

export default EditTicketModal;
