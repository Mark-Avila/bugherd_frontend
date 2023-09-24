import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { Project, ProjectWithUser } from "../../types";

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
  const theme = useTheme();

  const rowsWithPlaceholders: Array<ProjectWithUser | null> = [...rows];
  while (rowsWithPlaceholders.length < 5) {
    rowsWithPlaceholders.push(null);
  }

  return (
    <TableContainer variant="outlined" component={Paper}>
      <Table
        sx={{
          width: "100%",
        }}
        aria-label="ticket-table"
      >
        <TableHead>
          <TableRow>
            <TableCell component="th" size="small" width={300}>
              Title
            </TableCell>
            <TableCell component="th" size="small">
              Project Manager
            </TableCell>
            <TableCell component="th" size="small">
              Assigned
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsWithPlaceholders.map((item, index) =>
            item !== null ? (
              <TableRow
                key={index + 300}
                sx={{
                  ":hover": {
                    backgroundColor: theme.palette.action.hover,
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell>
                  <Typography fontSize={12}>{item.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={12}>John Thompson</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={12}>{item.num}</Typography>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow key={index + 300} sx={{ height: "3rem" }}>
                <TableCell>
                  <Typography fontSize={12}></Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={12}></Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={12}></Typography>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
