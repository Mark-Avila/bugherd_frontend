import { Box, Card, List, ListItem, Stack, Typography } from "@mui/material";
import { Project } from "../../types";
import ProjectListItem from "./ProjectListItem";

const rows: Project[] = [
  {
    id: 8,
    title: "MindMeld",
    descr: "Mindfulness and meditation app for modern living",
    num: 10,
    user_id: "1",
  },
  {
    id: 1,
    title: "TechTalks",
    descr: "Engaging tech podcast series with industry experts",
    num: 4,
    user_id: "1",
  },
];

export default function ProjectList() {
  return (
    <Box>
      <Card variant="outlined">
        <List disablePadding>
          <ListItem divider>
            <Box width="100%">
              <Stack direction="row" justifyContent="space-between">
                <Box flex={1}>
                  <Typography variant="body2" fontWeight="bold">
                    Title
                  </Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" fontWeight="bold">
                    Description
                  </Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" fontWeight="bold">
                    Project Manager
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </ListItem>
          {rows.map((item, index, row) => (
            <ProjectListItem
              key={index}
              data={{
                title: item.title,
                desc: item.descr,
                manager: "Joe Bud",
              }}
              divider={row.length !== index + 1}
            />
          ))}
        </List>
      </Card>
    </Box>
  );
}
