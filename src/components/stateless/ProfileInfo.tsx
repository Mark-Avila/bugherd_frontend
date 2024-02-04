import {
  Avatar,
  Box,
  Chip,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { User } from "../../types";
import getRole from "../../utils/getRole";
import dayjs from "dayjs";

interface Props {
  user?: User | null;
}

function ProfileInfo({ user }: Props) {
  const getAge = (bday: string) => {
    const currentDate = dayjs().toISOString();

    return dayjs(currentDate).diff(dayjs(bday), "year").toString();
  };

  const getRoleColor = (role: number) => {
    if (role === 0) {
      return "default";
    }
    if (role === 1) {
      return "primary";
    }
    if (role === 2) {
      return "success";
    }
  };

  return (
    <Box width="100%">
      <Paper variant="outlined">
        <Stack>
          <Box display="flex" alignItems="center" gap={2} padding={2}>
            <Avatar sx={{ width: 86, height: 86 }} />
            <Stack minWidth={300}>
              {user ? (
                <Typography>{`${user.fname} ${user.lname}`}</Typography>
              ) : (
                <Skeleton variant="text" width="50%" />
              )}
              {user ? (
                <Typography variant="body2" color="text.secondary">
                  avilamark96@gmail.com
                </Typography>
              ) : (
                <Skeleton variant="text" width="60%" />
              )}
            </Stack>
          </Box>
          <Divider />
          <Box display="flex" alignItems="center" gap={2} padding={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography>Role: </Typography>
              {user ? (
                <Chip
                  label={getRole(user.role)}
                  color={getRoleColor(user.role)}
                />
              ) : (
                <Skeleton variant="text" width={100} />
              )}
            </Stack>
          </Box>
          <Divider />
          <Box display="flex" alignItems="center" gap={2} padding={2}>
            <Typography>Birthday:</Typography>
            {user ? (
              <Typography color="text.secondary">
                {dayjs(user.bday).format("MMMM DD, YYYY")}
              </Typography>
            ) : (
              <Skeleton variant="text" width={150} />
            )}
          </Box>
          <Divider />
          <Box display="flex" alignItems="center" gap={2} padding={2}>
            <Typography>Age:</Typography>
            {user ? (
              <Typography color="text.secondary">
                {getAge(user.bday)}
              </Typography>
            ) : (
              <Skeleton variant="text" width={150} />
            )}
          </Box>
          <Divider />
          <Box display="flex" alignItems="center" gap={2} padding={2}>
            <Typography>Contact:</Typography>
            {user ? (
              <Typography color="text.secondary">{user.contact}</Typography>
            ) : (
              <Skeleton variant="text" width={150} />
            )}
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default ProfileInfo;
