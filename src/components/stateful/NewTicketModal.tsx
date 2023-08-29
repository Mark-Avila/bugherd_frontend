import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CustomSelect, { SelectItem } from "../stateless/SelectItems";
import { Close } from "@mui/icons-material";

type Status = "ongoing" | "completed" | "";
type Priority = "high" | "intermediate" | "low" | "";
type Type = "issue" | "bug" | "feature" | "error" | "other" | "";

interface Props {
  onClose: VoidFunction;
}

function NewTicketModal({ onClose }: Props) {
  const [status, setStatus] = useState<Status>("");
  const [priority, setPriority] = useState<Priority>("");
  const [type, setType] = useState<Type>("");

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as Status);
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as Priority);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as Type);
  };

  const statusItems: SelectItem[] = [
    {
      value: "ongoing",
      label: "Ongoing",
    },
    {
      value: "completed",
      label: "Completed",
    },
  ];

  const priorityItems: SelectItem[] = [
    {
      value: "high",
      label: "High",
    },
    {
      value: "intermediate",
      label: "Intermediate",
    },
    {
      value: "low",
      label: "Low",
    },
  ];

  const typeItems: SelectItem[] = [
    {
      value: "issue",
      label: "Issue",
    },
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "error",
      label: "Error",
    },
    {
      value: "other",
      label: "Other",
    },
  ];

  return (
    <>
      <Box display="flex" width="100%" justifyContent="space-between">
        <Typography component="header" variant="h6">
          Create new Ticket
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3, mt: 1 }} />
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <TextField id="ticket-title" label="Title" size="small" fullWidth />
            <TextField
              id="ticket-title"
              label="Description"
              size="small"
              rows={8}
              multiline
              fullWidth
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack
            direction="column"
            height="100%"
            justifyContent="space-between"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomSelect
                  items={typeItems}
                  id="select-type"
                  label="Type"
                  value={type}
                  onChange={handleTypeChange}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomSelect
                  items={statusItems}
                  id="select-status"
                  label="Status"
                  value={status}
                  onChange={handleStatusChange}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomSelect
                  items={priorityItems}
                  id="select-priority"
                  label="Priority"
                  value={priority}
                  onChange={handlePriorityChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="select-estimate"
                  label="Time Estimate (Hours)"
                  type="number"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Box display="flex" marginTop="auto" justifyContent="flex-end">
              <Button color="error">Clear</Button>
              <Button>Create</Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default NewTicketModal;
