import {
  Box,
  Card,
  Grid,
  List,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { ProjectWithUser } from "../../types";
import ProjectListItem from "./ProjectListItem";

interface Props {
  projects?: ProjectWithUser[];
  includeDescr?: boolean;
}

export default function ProjectList({ projects, includeDescr }: Props) {
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
                {includeDescr && (
                  <Box display={{ xs: "none", md: "block" }} flex={2}>
                    <Typography variant="body2" fontWeight="bold">
                      Description
                    </Typography>
                  </Box>
                )}
                <Box flex={1}>
                  <Typography variant="body2" fontWeight="bold">
                    Project Manager
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </ListItem>
          {projects
            ? projects.map((item, index, row) => (
                <ProjectListItem
                  key={index}
                  data={{
                    id: item.id ? item.id.toString() : "",
                    title: item.title,
                    desc: item.descr,
                    manager: `${item.fname} ${item.lname}`,
                  }}
                  divider={row.length !== index + 1}
                  includeDescr={includeDescr}
                />
              ))
            : [1, 2, 3, 4, 5].map((item, index) => (
                <Grid container height={48} width="100%">
                  <Grid item xs={6}>
                    <Skeleton
                      key={item * index}
                      variant="text"
                      height={24}
                      width="50%"
                      sx={{ ml: 1, mt: 1 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton
                      key={item * index}
                      variant="text"
                      width="50%"
                      height={24}
                      sx={{ ml: 0, mt: 1 }}
                    />
                  </Grid>
                </Grid>
              ))}
        </List>
      </Card>
    </Box>
  );
}
