import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import FetchRequest from "../../FetchRequest";

const fr = new FetchRequest({
  secureMode: true,
  host: "school.constcode.ru",
  port: "3500",
  query: {
    key: "0005ahuay8378ah8sk"
  }
});

export const usersSlice = createSlice({
  name: "users",

  initialState: {
    users: [],
    limit: 5,
    activePage: 1,
    pageCount: 0,
    loading: false
  },

  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
      state.loading = false;
    },
    setLimit(state, action) {
      state.limit = action.payload;
      state.activePage = 1;
    },
    setActivePage(state, action) {
      state.activePage = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = Math.ceil(action.payload / state.limit);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    patch(state, action) {
      Object.assign(state, action.payload);
    }
  }
});

export const {
  setUsers,
  setLimit,
  setActivePage,
  setPageCount,
  setLoading,
  patch
} = usersSlice.actions;

export const useUsers = () => useSelector(({ users }) => users);

const createAction = (callback) => (...args) => (dispatch) =>
  callback((data) => dispatch(patch(data)), ...args);

export const fetchUsers = createAction(async (patch, page, limit) => {
  patch({ loading: true });

  try {
    const { count, data } = await fr.get("/users", {
      _page: page,
      _limit: limit
    });

    patch({
      users: data,
      pageCount: Math.ceil(count / limit),
      loading: false
    });
  } catch (error) {
    console.log(error.message);
    patch({ loading: false });
  }
});

// export const fetchUsers = (page, limit) => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     const { count, data } = await fr.get("/users", {
//       _page: page,
//       _limit: limit
//     });
//     dispatch(setUsers(data));
//     dispatch(setPageCount(count));
//   } catch (error) {
//     console.log(error.message);
//     dispatch(setLoading(false));
//   }
// };

export const editUser = (id, data) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await fr.put(`/users/${id}`, data);
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error.message);
    dispatch(setLoading(false));
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await fr.delete(`/users/${id}`);
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error.message);
    dispatch(setLoading(false));
  }
};

export const addUser = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await fr.post("/users", data);
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error.message);
    dispatch(setLoading(false));
  }
};

export const searchUser = (text) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await fr.search("/users", { q: text });

    dispatch(
      patch({
        activePage: 1,
        limit: 5,
        users: data,
        loading: false
      })
    );
  } catch (error) {
    console.log(error.message);
    dispatch(setLoading(false));
  }
};

export default usersSlice.reducer;
