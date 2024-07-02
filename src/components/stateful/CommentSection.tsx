import { Divider, List } from "@mui/material";
import { Comment, ResponseBody, Ticket } from "../../types";
import { CommentInput, CommentItem } from "..";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useCreateCommentMutation } from "../../api/commentApiSlice";
import { useSnackError } from "../../hooks";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCreateNotificationMutation } from "../../api/notifApiSlice";

const validationSchema = yup.object({
  message: yup
    .string()
    .min(2, "Message is too short")
    .required("Please enter a message"),
});

interface Props {
  comments: Comment[];
  user_id: string;
  ticket: Ticket;
  onSubmit: VoidFunction;
  archived?: boolean;
}

function CommentSection({
  comments,
  archived,
  user_id,
  ticket,
  onSubmit,
}: Props) {
  const auth = useSelector((state: RootState) => state.auth);
  const [createComment] = useCreateCommentMutation();
  const [createNotification] = useCreateNotificationMutation();

  const { snackbarError } = useSnackError();

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (auth && auth.user && ticket) {
        const payload: Comment = {
          msg: values.message,
          user_id: user_id,
          ticket_id: ticket.id as string,
        };

        try {
          const response: ResponseBody<unknown> = await createComment(
            payload
          ).unwrap();

          if (response.success) {
            formik.resetForm();
          }

          onSubmit();
        } catch (err: unknown) {
          snackbarError(err as FetchBaseQueryError);
        }

        if (auth.user.id !== ticket.user_id) {
          const currentUserName = `${auth.user.fname} ${auth.user.lname}`;

          try {
            await createNotification({
              body: `${currentUserName} commented on your ticket`,
              to_id: ticket.user_id,
              from_id: auth.user!.id as number,
              view_path: `/ticket/${ticket.id}`,
            });
          } catch (err: unknown) {
            snackbarError(err as FetchBaseQueryError);
          }
        }
      }
    },
  });

  return (
    <>
      <List aria-label="ticket-comments-list" disablePadding>
        {comments.map((comment: Comment) => (
          <CommentItem
            key={comment.id}
            userId={comment.user_id}
            name={comment.fname + " " + comment.lname}
            message={comment.msg}
            date={comment.created_at!}
          />
        ))}
      </List>
      <Divider />
      {!archived && <CommentInput formik={formik} />}
    </>
  );
}

export default CommentSection;
