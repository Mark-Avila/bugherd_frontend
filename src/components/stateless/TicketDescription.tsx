import { Paper, Typography, useTheme } from "@mui/material";

interface Props {
  description: string;
}

function TicketDescription({ description }: Props) {
  const theme = useTheme();
  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, backgroundColor: theme.palette.background.paper }}
    >
      <Typography variant="body2" color="text.secondary" textAlign="justify">
        {description}
      </Typography>
    </Paper>
  );
}

export default TicketDescription;
