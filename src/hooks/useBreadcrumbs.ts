import { useEffect, useState } from "react";
import { BreadItem } from "../types";

function useBreadcrumbs() {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadItem[]>(
    [] as BreadItem[]
  );

  const updateBreadcrumbs = (newBreadcrumbs: BreadItem[]) => {
    setBreadcrumbs(newBreadcrumbs);
  };

  return { breadcrumbs, updateBreadcrumbs };
}

export default useBreadcrumbs;
