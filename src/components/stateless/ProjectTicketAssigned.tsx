import { Box, Chip, Stack, Typography } from "@mui/material";

function ProjecTicketAssigned() {
  return (
    <Box marginBottom={1}>
      <Typography color="text.secondary" fontSize="small">
        Assigned members
      </Typography>
      <Stack direction="row" spacing={2} marginTop={1}>
        <Chip label="Mark Avila" />
        <Chip label="Harvey Alonday" />
        <Chip label="John Remmon Castor" />
        <Chip label="Neilmathew Lacsamana" />
      </Stack>
    </Box>
  );
}

export default ProjecTicketAssigned;
