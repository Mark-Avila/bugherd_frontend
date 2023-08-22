import { Box, Card, Typography, useMediaQuery, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts";

interface PieData {
  id: number;
  value: number;
  label: string;
}

interface Props {
  title: string;
  data: PieData[];
}

function DataCard({ data, title }: Props) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.between("xs", "lg"));

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
      }}
    >
      <Box sx={{ marginX: 3, marginTop: 1.5, width: "100%" }}>
        <Typography>{title}</Typography>
      </Box>
      {smallScreen ? (
        <PieChart
          series={[
            {
              data: data,
              innerRadius: 15,
              outerRadius: 50,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -90,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30 },
            },
          ]}
          width={300}
          height={150}
        />
      ) : (
        <PieChart
          series={[
            {
              data: data,
              innerRadius: 25,
              outerRadius: 70,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -90,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30 },
            },
          ]}
          width={320}
          height={180}
        />
      )}
    </Card>
  );
}

export default DataCard;
