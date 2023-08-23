import { Button, Divider, List, Paper } from "@mui/material";
import { ProjectTeamItem } from "..";
import PageSection from "./PageSection";

function ProjectTeamList() {
  return (
    <PageSection
      title="Team"
      action={
        <Button sx={{ marginRight: 2 }} variant="contained" size="small">
          Add member
        </Button>
      }
    >
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
    </PageSection>
  );
}

export default ProjectTeamList;
