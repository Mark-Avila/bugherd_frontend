import { Chip, Stack } from "@mui/material";
import { Priority } from "../../types";

interface Props {
  status: boolean;
  priority: Priority;
}

function TicketItemChips({ status, priority }: Props) {
  const getPriority = (priority: Priority) => {
    switch (priority) {
      case 1:
        return "Low";
      case 2:
        return "Moderate";
      case 3:
        return "High";
      default:
        return "....";
    }
  };

  const getError = (priority: Priority) => {
    switch (priority) {
      case 1:
        return "default";
      case 2:
        return "warning";
      case 3:
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label={status ? "Open" : "Closed"}
        color={status ? "success" : "secondary"}
      />
      <Chip label={getPriority(priority)} color={getError(priority)} />
    </Stack>
  );
}

export default TicketItemChips;
