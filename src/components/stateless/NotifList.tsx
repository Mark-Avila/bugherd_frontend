import {
  List,
  Stack,
  Typography,
  ListItemButton,
  Box,
  IconButton,
} from "@mui/material";
import { Notification } from "../../types";
import moment, { Duration } from "moment";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";

interface Props {
  notifs: Notification[];
  handleCloseNotif: () => void;
  handleReadNotif: (notif_id: number) => void;
}
1;
function NotifList({ notifs, handleCloseNotif, handleReadNotif }: Props) {
  const navigate = useNavigate();

  const getTimePassed = (duration: Duration) => {
    // Get days, hours, minutes, and seconds from the duration
    const daysPassed = duration.days();
    const hoursPassed = duration.hours();
    const minutesPassed = duration.minutes();

    // Check the duration and return appropriate string
    if (daysPassed > 0) {
      return daysPassed === 1 ? "1 day ago" : `${daysPassed} days ago`;
    } else if (hoursPassed > 0) {
      return hoursPassed === 1 ? "1 hour ago" : `${hoursPassed} hours ago`;
    } else {
      return minutesPassed === 1
        ? "1 minute ago"
        : `${minutesPassed} minutes ago`;
    }
  };

  const handleOnClick = (path: string | undefined) => {
    if (path) {
      navigate(path);
    }

    handleCloseNotif();
  };

  return (
    <List>
      {notifs.length > 0 ? (
        notifs.map((item) => {
          const name = `${item.fname} ${item.lname}`;

          const createdTime = moment(item.createdat);
          const currentTime = moment();
          const duration = moment.duration(currentTime.diff(createdTime));
          const timePassed = getTimePassed(duration);

          return (
            <ListItemButton
              key={item.id}
              onClick={() => handleOnClick(item.view_path)}
              divider
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Stack gap={1} width="100%">
                  <Typography fontSize="small">{item.body}</Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography color="text.disabled" fontSize="small">
                      {name} - {timePassed}
                    </Typography>
                  </Stack>
                </Stack>
                <Box>
                  <IconButton
                    onClick={() => handleReadNotif(item.id as number)}
                    size="small"
                  >
                    <Close />
                  </IconButton>
                </Box>
              </Stack>
            </ListItemButton>
          );
        })
      ) : (
        <Box px="1rem" py="1.5rem">
          <Typography color="text.disabled" fontSize="small">
            No New Notifications
          </Typography>
        </Box>
      )}
    </List>
  );
}

export default NotifList;
