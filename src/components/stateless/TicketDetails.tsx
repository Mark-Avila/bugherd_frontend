import { Grid, Typography, Chip, Box } from "@mui/material";

function TicketDetails() {
  return (
    <Grid
      container
      sx={{
        rowGap: {
          xs: 2,
          lg: 0,
        },
      }}
    >
      <Grid item xs={6} md={3}>
        <Typography fontSize="small" color="text.secondary">
          Status
        </Typography>
        <Box marginTop={1}>
          <Chip label="Resolved" color="success" />
        </Box>
      </Grid>
      <Grid item xs={6} md={3}>
        <Typography fontSize="small" color="text.secondary">
          Priority
        </Typography>
        <Box marginTop={1}>
          <Chip label="Intermediate" color="warning" />
        </Box>
      </Grid>
      <Grid item xs={6} md={3}>
        <Typography fontSize="small" color="text.secondary">
          Type
        </Typography>
        <Box marginTop={1}>
          <Chip label="Issue" color="primary" />
        </Box>
      </Grid>
      <Grid item xs={6} md={3}>
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

export default TicketDetails;
