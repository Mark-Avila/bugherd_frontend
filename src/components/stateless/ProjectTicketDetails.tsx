import { Grid, Typography, Chip } from "@mui/material";

function ProjectTicketDetails() {
  return (
    <Grid container>
      <Grid item xs={3}>
        <Typography fontSize="small" color="text.secondary">
          Status
        </Typography>
        <Typography marginTop={1} variant="body2">
          <Chip label="Resolved" color="success" />
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography fontSize="small" color="text.secondary">
          Priority
        </Typography>
        <Typography marginTop={1} variant="body2">
          <Chip label="Intermediate" color="warning" />
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography fontSize="small" color="text.secondary">
          Type
        </Typography>
        <Typography marginTop={1} variant="body2">
          <Chip label="Issue" color="primary" />
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography fontSize="small" color="text.secondary">
          Time estimated
        </Typography>
        <Typography marginTop={1} variant="body2">
          8 hours
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ProjectTicketDetails;
