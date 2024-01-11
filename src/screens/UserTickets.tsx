import { useEffect, useState } from "react";
import { useLazyGetTicketsOfCurrentUserQuery } from "../api/ticketApiSlice";
import PageSection from "../components/stateless/PageSection";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { logout } from "../slices/authSlice";
import { ResponseBody, TicketWithUser } from "../types";
import { TicketList } from "../components";
import { Pagination } from "@mui/material";

function UserTickets() {
  const [getTickets, tickets] = useLazyGetTicketsOfCurrentUserQuery();
  const { enqueueSnackbar } = useSnackbar();
  const [maxPage, setMaxPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const dispatch = useDispatch();
  const PAGE_LIMIT = 10;

  useEffect(() => {
    getTickets({ offset: 0, limit: 10 });
  }, []);

  useEffect(() => {
    const { isError, isLoading, error, isSuccess } = tickets;

    if (isError && !isLoading && error) {
      const err = error as FetchBaseQueryError;

      if ("error" in err) {
        enqueueSnackbar("Connection failed", { variant: "error" });
        dispatch(logout());
      } else if ((err.data as ResponseBody<unknown>).status === 403) {
        enqueueSnackbar("Session expired", { variant: "error" });
        dispatch(logout());
      } else if ("message" in (err.data as ResponseBody<unknown>)) {
        enqueueSnackbar((err.data as ResponseBody<unknown>).message, {
          variant: "error",
        });
      }
    } else if (!isError && !isLoading && isSuccess) {
      const pages: number = (tickets.data.count as number) / PAGE_LIMIT;
      setMaxPage(Math.floor(pages));
    }
  }, [tickets]);

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value <= maxPage && value >= 0) {
      setCurrPage(value);
      getTickets({ offset: (value - 1) * PAGE_LIMIT, limit: PAGE_LIMIT });
    }
  };

  return (
    <>
      <PageSection>
        {!tickets.isLoading && tickets.data && (
          <TicketList tickets={tickets.data?.data as TicketWithUser[]} />
        )}
        {maxPage > 1 && (
          <Pagination
            count={maxPage}
            page={currPage}
            onChange={handlePagination}
          />
        )}
      </PageSection>
    </>
  );
}

export default UserTickets;
