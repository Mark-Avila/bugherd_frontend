import { Adjust } from "@mui/icons-material";
import { Typography, Box, Stack } from "@mui/material";

interface Props {
  status: boolean;
  priority: 1 | 2 | 3;
  type: string;
  time: number;
}

function TicketDetails({ status, priority, type, time }: Props) {
  const getPriority = (priority: number) => {
    if (priority === 1) {
      return "Low";
    }
    if (priority === 2) {
      return "Intermediate";
    }
    if (priority === 3) {
      return "High";
    }
  };

  return (
    <Box>
      <Box>
        <Typography fontSize="small" color="text.secondary">
          Status
        </Typography>
        <Stack direction="row" spacing={1}>
          <Adjust color="success" />
          <Typography color="text.secondary">
            {status ? "Open" : "Closed"}
          </Typography>
        </Stack>
      </Box>
      <Box mt={2}>
        <Typography fontSize="small" color="text.secondary">
          Priority
        </Typography>
        <Stack direction="row" spacing={1}>
          <Adjust color="error" />
          <Typography color="text.secondary">
            {getPriority(priority)}
          </Typography>
        </Stack>
      </Box>
      <Box mt={2}>
        <Typography fontSize="small" color="text.secondary">
          Type
        </Typography>
        <Typography variant="body1">{type}</Typography>
      </Box>
      <Box mt={2}>
        <Typography fontSize="small" color="text.secondary">
          Time estimated
        </Typography>
        <Typography variant="body1">{time} hours</Typography>
      </Box>
    </Box>
  );
}

export default TicketDetails;
