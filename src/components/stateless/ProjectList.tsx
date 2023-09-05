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
// import { GridColDef } from "@mui/x-data-grid";

// const columns: GridColDef[] = [
//   { field: "project", headerName: "Project", flex: 1 },
//   { field: "description", headerName: "Description", flex: 1 },
//   { field: "assigned", headerName: "Assigned", flex: 1 },
// ];

const rows = [
  {
    id: 6,
    project: "GreenScape",
    description: "Community-driven gardening and plant care app",
    assigned: 3,
  },
  {
    id: 10,
    project: "Wanderlust",
    description: "Virtual travel companion for exploring new destinations",
    assigned: 7,
  },
  {
    id: 4,
    project: "FitConnect",
    description: "Social platform for fitness enthusiasts and trainers",
    assigned: 1,
  },
  {
    id: 8,
    project: "MindMeld",
    description: "Mindfulness and meditation app for modern living",
    assigned: 10,
  },
  {
    id: 1,
    project: "TechTalks",
    description: "Engaging tech podcast series with industry experts",
    assigned: 4,
  },
];

export default function ProjectList() {
  const theme = useTheme();

  return (
    <TableContainer variant="outlined" component={Paper}>
      <Table
        sx={{
          width: "100%",
          "& .MuiTableRow-root:hover": {
            backgroundColor: theme.palette.action.hover,
            cursor: "pointer",
          },
        }}
        aria-label="ticket-table"
      >
        <TableHead>
          <TableRow>
            <TableCell component="th" size="small" width={200}>
              Title
            </TableCell>
            <TableCell component="th" size="small" width={600}>
              Description
            </TableCell>
            <TableCell component="th" size="small" width={150}>
              Assigned
            </TableCell>
            <TableCell component="th" size="small">
              Leader
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => (
            <TableRow>
              <TableCell>
                <Typography fontSize={12}>{item.project}</Typography>
              </TableCell>
              <TableCell>
                <Typography fontSize={12}>{item.description}</Typography>
              </TableCell>
              <TableCell>
                <Typography fontSize={12}>{item.assigned}</Typography>
              </TableCell>
              <TableCell>
                <Typography fontSize={12}>John Thompson</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
