import { Box, Chip, Typography } from "@mui/material";

function ProjecTicketAssigned() {
  return (
    <Box marginBottom={1}>
      <Typography color="text.secondary" fontSize="small">
        Assigned members
      </Typography>
      <Box
        sx={{ width: "100%", display: "flex", gap: 1, flexWrap: "wrap" }}
        marginTop={1}
      >
        <Chip label="Mark Avila" />
        <Chip label="Harvey Alonday" />
        <Chip label="John Remmon Castor" />
        <Chip label="Neilmathew Lacsamana" />
      </Box>
    </Box>
  );
}

export default ProjecTicketAssigned;
