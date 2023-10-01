import {
  Avatar,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

function Profile() {
  return (
    <Box display="flex" justifyContent="center">
      <Stack>
        <Typography variant="h6">Your Profile</Typography>
        <Box width={400} mt={2}>
          <Paper variant="outlined">
            <Stack>
              <Box display="flex" alignItems="center" gap={2} padding={2}>
                <Avatar sx={{ width: 86, height: 86 }} />
                <Stack>
                  <Typography>Mark Christian Avila</Typography>
                  <Typography variant="body2" color="text.secondary">
                    avilamark96@gmail.com
                  </Typography>
                </Stack>
              </Box>
              <Divider />
              <Box display="flex" alignItems="center" gap={2} padding={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography>Role: </Typography>
                  <Chip label="Developer" color="primary" />
                </Stack>
              </Box>
              <Divider />
              <Box display="flex" alignItems="center" gap={2} padding={2}>
                <Typography>Birthday:</Typography>
                <Typography color="text.secondary">
                  September 6, 2001
                </Typography>
              </Box>
              <Divider />
              <Box display="flex" alignItems="center" gap={2} padding={2}>
                <Typography>Age:</Typography>
                <Typography color="text.secondary">22</Typography>
              </Box>
              <Divider />
              <Box display="flex" alignItems="center" gap={2} padding={2}>
                <Typography>Contact:</Typography>
                <Typography color="text.secondary">+63123456789</Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
}

export default Profile;
