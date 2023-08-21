import { Card } from "@mui/material";
import { PieChart } from "@mui/x-charts";

function DataCard() {
  return (
    <Card variant="outlined">
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 33, label: "series A" },
              { id: 1, value: 33, label: "series B" },
              { id: 2, value: 33, label: "series C" },
            ],
            innerRadius: 25,
            outerRadius: 80,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -90,
          },
        ]}
        width={400}
        height={200}
      />
    </Card>
  );
}

export default DataCard;
