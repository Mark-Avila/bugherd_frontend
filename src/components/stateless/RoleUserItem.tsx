import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  name: string;
  email: string;
}

function RoleUserItem({ name, email }: Props) {
  return (
    <Stack direction="row" spacing={1}>
      <Paper
        variant="outlined"
        sx={{ display: "flex", alignItems: "center", padding: 2 }}
      >
        <Avatar />
        <Box sx={{ mx: 2 }}>
          <Typography variant="body1">{name}</Typography>
          <Typography variant="body2">{email}</Typography>
        </Box>
        <IconButton size="small">
          <Edit />
        </IconButton>
      </Paper>
    </Stack>
  );
}

export default RoleUserItem;
