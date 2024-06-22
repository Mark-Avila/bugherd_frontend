import { Notification, ResponseBody } from "../types";
import { apiSlice } from "./apiSlice";

/**
 * TODO: Add notifications
 *  - Create New Ticket (DONE)
 *  - Ticket Comment (DONE)
 *  - Updated Ticket Details
 *  - Admin updated user information
 */

export const notifApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationsOfUser: builder.query<ResponseBody<Notification[]>, string>(
      {
        query: (user_id: string, non_read?: boolean) => ({
          url: `/notification/${user_id}/user?non_read=${
            non_read ? non_read : false
          }`,
          credentials: "include",
        }),
      }
    ),
    createNotification: builder.mutation({
      query: (notifData: Notification) => ({
        url: "/notification/",
        method: "POST",
        credentials: "include",
        body: notifData,
      }),
    }),
    readNotification: builder.mutation({
      query: (notifId: number) => ({
        url: `/notification/${notifId}/read`,
        method: "PATCH",
        credentials: "include",
      }),
    }),
    deleteNotifcation: builder.mutation({
      query: (notifId: number) => ({
        url: `/notification/${notifId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useLazyGetNotificationsOfUserQuery,
  useReadNotificationMutation,
} = notifApiSlice;
