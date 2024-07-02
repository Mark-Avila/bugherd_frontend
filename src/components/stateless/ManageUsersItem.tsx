import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { User } from "../../types";
import { ChevronRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import pictureApi from "../../api/userPictureApi";

interface Props {
  user: User;
  onClick?: (arg: User) => void;
}

function ManageUsersItem({ user, onClick }: Props) {
  const [userPicture, setUserPicture] = useState<string>();

  useEffect(() => {
    const fetchUserPicture = async () => {
      if (user) {
        const userPictureData: string | null =
          await pictureApi.fetchUserPicture(user.id!.toString());
        if (userPictureData !== null) {
          setUserPicture(userPictureData);
        }
      }
    };

    fetchUserPicture();
  }, []);

  return (
    <ListItemButton divider onClick={onClick ? () => onClick(user) : () => {}}>
      <ListItemAvatar>
        <Avatar src={userPicture} />
      </ListItemAvatar>
      <ListItemText
        primary={`${user.fname} ${user.lname}`}
        secondary={user.email}
        primaryTypographyProps={{ fontSize: "small" }}
        secondaryTypographyProps={{ fontSize: "small" }}
      />
      <ListItemIcon>
        <ChevronRight />
      </ListItemIcon>
    </ListItemButton>
  );
}

export default ManageUsersItem;
