import { Adjust } from "@mui/icons-material";
import { Typography, Box, Stack } from "@mui/material";

function TicketDetails() {
  return (
    <Box>
      <Box>
        <Typography fontSize="small" color="text.secondary">
          Status
        </Typography>
        <Stack direction="row" spacing={1}>
          <Adjust color="success" />
          <Typography color="text.secondary">Open</Typography>
        </Stack>
      </Box>
      <Box mt={2}>
        <Typography fontSize="small" color="text.secondary">
          Priority
        </Typography>
        <Stack direction="row" spacing={1}>
          <Adjust color="error" />
          <Typography color="text.secondary">High</Typography>
        </Stack>
      </Box>
      <Box mt={2}>
        <Typography fontSize="small" color="text.secondary">
          Type
        </Typography>
        <Typography variant="body1">Bug</Typography>
      </Box>
      <Box mt={2}>
        <Typography fontSize="small" color="text.secondary">
          Time estimated
        </Typography>
        <Typography variant="body1">8 hours</Typography>
      </Box>
    </Box>
  );
}

export default TicketDetails;
