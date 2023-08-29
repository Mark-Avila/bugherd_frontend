import { InfoOutlined } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
} from "@mui/material";
import { useState } from "react";

interface Props {
  name: string;
  isLead?: boolean;
}

function ProjectTeamItem({ name, isLead }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOnOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <>
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
            secondary={`avilamark96@gmail.com`}
          />
          <ListItemText
            primary={"Phone"}
            primaryTypographyProps={{ fontSize: 12 }}
            secondaryTypographyProps={{ fontSize: 12 }}
            secondary={`(+63) 912-3456-789`}
          />
        </Box>
      </Popover>
    </>
  );
}

export default ProjectTeamItem;
