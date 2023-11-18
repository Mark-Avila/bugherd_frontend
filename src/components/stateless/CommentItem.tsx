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

interface Props {
  name?: string;
  date?: string;
  message?: string;
}

function CommentItem({ name, date, message }: Props) {
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
        <Avatar alt="markavila-pic" />
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
              {date ? `— commented on ${date}` : ""}
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
