import { Close, Edit } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

function ManageUsersForm() {
  return (
    <Stack sx={{ paddingRight: 16 }} useFlexGap spacing={2}>
      <FormControl fullWidth>
        <InputLabel id="user-role">Role</InputLabel>
        <Select
          labelId="user-role"
          id="user-role-select"
          variant="outlined"
          label="Role"
          fullWidth
        >
          <MenuItem value={0}>Developer</MenuItem>
          <MenuItem value={1}>Project Manager</MenuItem>
          <MenuItem value={2}>Administrator</MenuItem>
        </Select>
      </FormControl>
      <Divider sx={{ marginY: 1 }} />
      <Stack
        marginBottom={2}
        spacing={3}
        useFlexGap
        direction="row"
        alignItems="center"
      >
        <Avatar sx={{ width: 56, height: 56 }} />
        <IconButton size="small">
          <Edit fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <Close fontSize="small" />
        </IconButton>
      </Stack>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="First Name"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Last Name"
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>
      <TextField variant="outlined" label="Email" fullWidth size="small" />
      <TextField variant="outlined" label="Contact" fullWidth size="small" />
      <TextField variant="outlined" label="Birthday" fullWidth size="small" />
    </Stack>
  );
}

export default ManageUsersForm;
