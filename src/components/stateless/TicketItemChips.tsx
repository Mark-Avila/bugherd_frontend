import { Chip, Stack } from "@mui/material";

function TicketItemChips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Ongoing" color="success" />
      <Chip label="High" color="error" />
    </Stack>
  );
}

export default TicketItemChips;
