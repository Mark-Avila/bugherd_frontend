import { Divider, List, Paper } from "@mui/material";
import { ProjectTeamItem } from "..";

function ProjectTeamList() {
  return (
    <Paper sx={{ height: "100%" }} variant="outlined">
      <List sx={{ height: "100%", overflow: "auto" }}>
        <ProjectTeamItem name="Mark Avila" isLead />
        <Divider />
        <ProjectTeamItem name="Harvey Alonday" />
        <Divider />
        <ProjectTeamItem name="John Remmon Castor" />
        <Divider />
        <ProjectTeamItem name="Neilmathew Lacsamana" />
        <Divider />
        <ProjectTeamItem name="Mark Avila" isLead />
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
