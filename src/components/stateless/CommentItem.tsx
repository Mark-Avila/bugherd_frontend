import { MoreVert } from "@mui/icons-material";
import {
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  Typography,
  ListItemText,
  Skeleton,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import pictureApi from "../../api/userPictureApi";

interface Props {
  userId: string;
  name: string;
  date: string;
  message: string;
}

function CommentItem({ name, date, message, userId }: Props) {
  const [userPicture, setUserPicture] = useState<string>();

  useEffect(() => {
    const fetchUserPicture = async () => {
      const userPictureData: string | null = await pictureApi.fetchUserPicture(
        userId.toString()
      );
      if (userPictureData !== null) {
        setUserPicture(userPictureData);
      }
    };

    fetchUserPicture();
  }, []);

  return (
    <ListItem
      secondaryAction={
        (name || date || message) && (
          <IconButton>
            <MoreVert />
          </IconButton>
        )
      }
      sx={{
        alignItems: {
          xs: "start",
          lg: "center",
        },
      }}
    >
      <ListItemAvatar>
        <Avatar alt="markavila-pic" src={userPicture} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            {name ? (
              name
            ) : (
              <Skeleton
                variant="text"
                sx={{ display: "inline-block" }}
                width={100}
              />
            )}
            <Typography
              display="inline"
              variant="body2"
              fontSize="small"
              color="text.secondary"
            >
              {date
                ? `— commented on ${dayjs(date).format(
                    "HH:MM - MMMM DD, YYYY"
                  )}`
                : ""}
            </Typography>
          </>
        }
        secondary={message ? message : <Skeleton variant="text" />}
        sx={{
          paddingRight: {
            xs: 0,
            lg: 30,
          },
          marginTop: {
            xs: 0,
          },
        }}
      />
    </ListItem>
  );
}

export default CommentItem;
