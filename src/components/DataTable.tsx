import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "project", headerName: "Project", flex: 1 },
  { field: "description", headerName: "Description", flex: 1 },
  { field: "assigned", headerName: "Assigned", flex: 1 },
];

const rows = [
  {
    id: 1,
    project: "Kikoo",
    description: "Informative and interactive weather website",
    assigned: 4,
  },
  {
    id: 7,
    project: "AquaView",
    description: "Immersive underwater adventure platform",
    assigned: 9,
  },
  {
    id: 3,
    project: "FoodieVerse",
    description: "Culinary exploration app with social integration",
    assigned: 6,
  },
  {
    id: 2,
    project: "PixelCraft",
    description: "Artistic pixel art generator for creatives",
    assigned: 2,
  },
  {
    id: 5,
    project: "HealthTrack",
    description: "Personalized wellness tracker with AI insights",
    assigned: 8,
  },
  {
    id: 9,
    project: "RetroRush",
    description: "Nostalgic gaming portal for classic titles",
    assigned: 5,
  },
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

export default function DataTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{ paddingX: 2 }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
