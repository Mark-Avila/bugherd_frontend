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

interface Props {
  open?: boolean;
  onClose: VoidFunction;
}

function EditTicketModal({ open, onClose }: Props) {
  return (
    <Dialog open={Boolean(open)} onClose={onClose} fullWidth>
      <DialogTitle>Ticket Details</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField size="small" placeholder="Title" />
          <TextField
            size="small"
            placeholder="Description"
            multiline
            rows={4}
          />
          <Stack direction="row" alignItems="center" spacing={5}>
            <Box width={70}>
              <Typography>Status</Typography>
            </Box>
            <Select value={1} size="small" fullWidth>
              <MenuItem value={1}>Ongoing</MenuItem>
              <MenuItem value={2}>Resolve</MenuItem>
            </Select>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={5}>
            <Box width={70}>
              <Typography>Priority</Typography>
            </Box>
            <Select value={1} size="small" fullWidth>
              <MenuItem value={1}>High</MenuItem>
              <MenuItem value={2}>Intermediate</MenuItem>
              <MenuItem value={3}>Low</MenuItem>
            </Select>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={5}>
            <Box width={70}>
              <Typography>Type</Typography>
            </Box>
            <Select value={1} size="small" fullWidth>
              <MenuItem value={1}>Issue</MenuItem>
              <MenuItem value={2}>Bug</MenuItem>
              <MenuItem value={3}>Feature</MenuItem>
              <MenuItem value={4}>Error</MenuItem>
              <MenuItem value={5}>Other</MenuItem>
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
            <TextField size="small" type="number" fullWidth />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => {}} autoFocus variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTicketModal;
