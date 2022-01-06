import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const initialState = {
  trackId: null,
  comments: [],
};
const addComment = createAction(ADD_COMMENT, (trackId, comment) => ({
  trackId,
  comment,
}));
const deleteComment = createAction(DELETE_COMMENT, (tracksId, commentId) => ({
  tracksId,
  commentId,
}));

const deleteCommentDB = (tracksId, commentId) => {
  return function (dispatch, getState, { history }) {
    apis.deleteComment(tracksId, commentId).then((res) => {
      dispatch(deleteComment(tracksId, commentId));
      window.location.reload();
    });
  };
};

const addCommentDB = (trackId, comment) => {
  return function (dispatch, getState, { history }) {
    apis.commentTrack(trackId, comment).then((res) => {
      dispatch(addComment(trackId, res.data.comments));
    });
  };
};

export default handleActions(
  {
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comments = action.payload.comment;
        draft.trackId = action.payload.trackId;
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comments.map((el) =>
          el.postId === parseInt(action.payload.postId)
            ? (el.commentList = el.commentList.filter(
                (e) => e.commentId !== parseInt(action.payload.commentId)
              ))
            : el
        );
      }),
  },
  initialState
);
const actionCreators = {
  addCommentDB,
  deleteCommentDB,
};

export { actionCreators };
