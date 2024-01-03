import { Divider, List } from "@mui/material";
import { Comment, ResponseBody } from "../../types";
import { CommentInput, CommentItem } from "..";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useCreateCommentMutation } from "../../api/commentApiSlice";
import { useSnackError } from "../../hooks";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useSnackbar } from "notistack";

const validationSchema = yup.object({
  message: yup
    .string()
    .min(2, "Message is too short")
    .required("Please enter a message"),
});

interface Props {
  comments: Comment[];
  user_id: string;
  ticket_id: string;
  onSubmit: VoidFunction;
}

function CommentSection({ comments, user_id, ticket_id, onSubmit }: Props) {
  const auth = useSelector((state: RootState) => state.auth);
  const [createComment] = useCreateCommentMutation();

  const { snackbarError } = useSnackError();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (auth && auth.user) {
        const payload: Comment = {
          msg: values.message,
          user_id: user_id,
          ticket_id: ticket_id,
        };

        try {
          const response: ResponseBody<unknown> = await createComment(
            payload
          ).unwrap();

          if (response.success) {
            enqueueSnackbar(response.message, {
              variant: "success",
            });
            formik.resetForm();
          }

          onSubmit();
        } catch (err: unknown) {
          snackbarError(err as FetchBaseQueryError);
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
            name={comment.fname + " " + comment.lname}
            message={comment.msg}
            date={comment.created_at}
          />
        ))}
      </List>
      <Divider />
      <CommentInput formik={formik} />
    </>
  );
}

export default CommentSection;
