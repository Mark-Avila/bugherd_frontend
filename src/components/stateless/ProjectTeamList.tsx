import { Divider, List, Paper } from "@mui/material";
import { ProjectTeamItem } from "..";

function ProjectTeamList() {
  return (
    <Paper variant="outlined">
      <List>
        <ProjectTeamItem name="Mark Avila" />
        <Divider />
        <ProjectTeamItem name="Harvey Alonday" />
        <Divider />
        <ProjectTeamItem name="John Remmon Castor" />
        <Divider />
        <ProjectTeamItem name="Neilmathew Lacsamana" />
      </List>
    </Paper>
  );
}

export default ProjectTeamList;
