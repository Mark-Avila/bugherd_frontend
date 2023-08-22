import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

interface Props {
  name: string;
}

function TeamListItem({ name }: Props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => setExpanded((prev) => !prev);

  return (
    <>
      <ListItem>
        <ListItemText
          primary={name}
          primaryTypographyProps={{ fontSize: 12 }}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={handleExpandClick}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <ListItem>
          <ListItemText
            secondaryTypographyProps={{ fontSize: 12 }}
            secondary={`avilamark96@gmail.com`}
          />
          <ListItemText
            secondaryTypographyProps={{ fontSize: 12 }}
            secondary={`(+63) 912-3456-789`}
          />
        </ListItem>
      </Collapse>
    </>
  );
}

export default TeamListItem;
