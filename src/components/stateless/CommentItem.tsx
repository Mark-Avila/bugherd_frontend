import { MoreVert } from "@mui/icons-material";
import {
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  Typography,
  ListItemText,
} from "@mui/material";

function CommentItem() {
  return (
    <ListItem
      secondaryAction={
        <IconButton>
          <MoreVert />
        </IconButton>
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
            {"Mark Avila "}
            <Typography
              display="inline"
              variant="body2"
              fontSize="small"
              color="text.secondary"
            >
              — commented on Jun 26
            </Typography>
          </>
        }
        secondary="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                expedita sequi quo totam? Optio nihil deserunt at iure assumenda
                rem facilis facere! Vitae ab debitis esse, eligendi laudantium
                quidem minus."
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
