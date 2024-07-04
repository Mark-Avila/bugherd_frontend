import { Adjust } from "@mui/icons-material";
import { Typography, Stack, Grid } from "@mui/material";

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
    <Grid container>
      <Grid item xs={6}>
        <Typography mb={1} fontSize={{ lg: "small" }} color="text.secondary">
          Status
        </Typography>
        <Stack direction="row" spacing={1}>
          <Adjust color="success" />
          <Typography color="text.secondary">
            {status ? "Open" : "Closed"}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Typography mb={1} fontSize={{ lg: "small" }} color="text.secondary">
          Priority
        </Typography>
        <Stack direction="row" spacing={1}>
          <Adjust color="error" />
          <Typography color="text.secondary">
            {getPriority(priority)}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={6} mt={{ xs: 2 }}>
        <Typography mb={1} fontSize={{ lg: "small" }} color="text.secondary">
          Type
        </Typography>
        <Typography variant="body1">{type}</Typography>
      </Grid>
      <Grid item xs={6} mt={{ xs: 2 }}>
        <Typography mb={1} fontSize={{ lg: "small" }} color="text.secondary">
          Time estimated
        </Typography>
        <Typography variant="body1">{time} hours</Typography>
      </Grid>
    </Grid>
  );
}

export default TicketDetails;
