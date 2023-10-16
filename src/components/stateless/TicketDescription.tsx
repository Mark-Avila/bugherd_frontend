import { Paper, Typography } from "@mui/material";

interface Props {
  description: string;
}

function TicketDescription({ description }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="body2" color="text.secondary" textAlign="justify">
        {description}
      </Typography>
    </Paper>
  );
}

export default TicketDescription;
