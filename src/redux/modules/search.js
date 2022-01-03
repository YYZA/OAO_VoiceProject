import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const SET_KEYWORD = "SET_KEYWORD";
const GET_SEARCH = "GET_SEARCH";
const LOAD_CATEGORY = "LOAD_CATEGORY";

const initialState = {
  keyword: null,
};

const setKeyword = createAction(SET_KEYWORD, (keyword) => ({ keyword }));
const getSearch = createAction(GET_SEARCH, (search_list) => ({ search_list }));
const loadCategory = createAction(LOAD_CATEGORY, (category) => ({ category }));

//middleware
const getSearchDB = (keyword) => {
  return function (dispatch, getState, { history }) {
    apis.search(keyword).then((res) => {
      console.log(res);
      dispatch(getSearch(res.data.tracks));
    });
  };
};

const loadCategoryDB = (category, tag1 = "", tag2 = "", tag3 = "") => {
  return function (dispatch, getState, { history }) {
    apis
      .category(category, tag1, tag2, tag3)
      .then((res) => {
        dispatch(loadCategory(res.data.tracks));
      })
      .catch((err) => {
        console.log("에러", err);
        const errmsg = err.response.data;
        console.log(errmsg);
        history.push("/error");
      });
  };
};

//reducer
export default handleActions(
  {
    [SET_KEYWORD]: (state, action) =>
      produce(state, (draft) => {
        draft.keyword = action.payload.keyword;
      }),
    [GET_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.searchList = action.payload.search_list;
      }),
    [LOAD_CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        draft.category_list = action.payload.category.tracks;
        draft.tags = action.payload.category.categoryTags;
      }),
  },
  initialState
);

const actionCreators = {
  setKeyword,
  getSearchDB,
  loadCategoryDB,
};

export { actionCreators };
