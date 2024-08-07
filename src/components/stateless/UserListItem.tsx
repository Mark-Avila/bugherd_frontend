import { InfoOutlined } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
  Divider,
} from "@mui/material";
import { useState } from "react";

interface Props {
  name: string;
  email: string;
  contact: string;
  isLead?: boolean;
  isButton?: boolean;
}

function UserListItem({ name, email, contact, isLead, isButton }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOnOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <>
      {isButton ? (
        <ListItemButton>
          <ListItemText
            primary={name}
            primaryTypographyProps={{ fontSize: 12 }}
          />
        </ListItemButton>
      ) : (
        <ListItem>
          <ListItemText
            primary={name}
            primaryTypographyProps={{ fontSize: 12 }}
          />
          {isLead && <Chip label="Leader" size="small" color="primary" />}
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={handleOnOpen}>
              <InfoOutlined />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
      <Popover
        id={`${name}-popover`}
        open={open}
        anchorEl={anchorEl}
        onClose={handleOnClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box px={2} py={1}>
          <ListItemText
            primary={"Email"}
            primaryTypographyProps={{ fontSize: 12 }}
            secondaryTypographyProps={{ fontSize: 12 }}
            secondary={email}
          />
          <ListItemText
            primary={"Phone"}
            primaryTypographyProps={{ fontSize: 12 }}
            secondaryTypographyProps={{ fontSize: 12 }}
            secondary={contact}
          />
        </Box>
      </Popover>
      <Divider />
    </>
  );
}

export default UserListItem;
