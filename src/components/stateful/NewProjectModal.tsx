import { Close } from "@mui/icons-material";
import {
  Stack,
  Box,
  Typography,
  TextField,
  IconButton,
  Divider,
  Chip,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ProjectTeamList } from "..";

function NewProjectModal() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" ml={2} fontSize="small">
          New Project
        </Typography>
        <IconButton>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} lg={6}>
          <Stack spacing={2}>
            <TextField size="small" label="Title" id="project-title" />
            <TextField
              size="small"
              label="Description"
              id="project-desc"
              multiline
              rows={5}
            />
            <Typography fontSize={12}>Assigned</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1, gap: 1 }}>
              <Chip label="Mark Christian Avila" />
              <Chip label="Mark Christian Avila" />
              <Chip label="Mark Christian Avila" />
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Stack spacing={2}>
            <Typography fontSize={12}>Assign members</Typography>
            <TextField
              variant="filled"
              size="small"
              label="Search"
              id="project-search"
            />
            <Box sx={{ height: 200 }}>
              <ProjectTeamList />
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained">SUBMIT</Button>
      </Box>
    </>
  );
}

export default NewProjectModal;
