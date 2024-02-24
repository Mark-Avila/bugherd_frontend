import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Priority, Ticket, Type } from "../types";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useUpdateTicketMutation } from "../api/ticketApiSlice";
import { useSnackbar } from "notistack";
import { useSnackError } from "../hooks";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

interface Props {
  open?: boolean;
  onClose: VoidFunction;
  ticket?: Ticket & { fname: string; lname: string };
}

const validationSchema = yup.object({
  title: yup
    .string()
    .min(2, "Title is too short")
    .max(30, "Title is too long")
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

function EditTicketModal({ open, onClose, ticket }: Props) {
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [updateTicket] = useUpdateTicketMutation();
  const { enqueueSnackbar } = useSnackbar();
  const { snackbarError } = useSnackError();

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
    onSubmit: (values) => {
      if (ticket && ticketId) {
        const { title, desc, status, priority, est, type } = values;

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

        updateTicket({ id: ticketId, data: data })
          .unwrap()
          .then((res) => {
            if (res.success) {
              enqueueSnackbar("Successfully updated ticket information", {
                variant: "success",
              });
            }
          })
          .finally(() => onClose())
          .catch((err: FetchBaseQueryError) => snackbarError(err));
      }
    },
  });

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

      setTicketId(ticket.id!);
    }
  }, [ticket]);

  const handleSubmit = () => formik.handleSubmit();

  return (
    <Dialog open={Boolean(open)} onClose={onClose} fullWidth>
      <DialogTitle>Ticket Details</DialogTitle>
      <DialogContent>
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
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} autoFocus variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTicketModal;
