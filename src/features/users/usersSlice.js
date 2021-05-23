import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    limit: 5,
    activePage: 1,
    pageCount: 0,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = Math.ceil(action.payload / state.limit);
    },
  },
});

export const { setUsers, setLimit, setActivePage, setPageCount } =
  usersSlice.actions;

export const fetchUsers = (page, limit) => async (dispatch) => {
  try {
    const responce = await fetch(
      `https://school.constcode.ru:3500/users?_page=${page}&_limit=${limit}&key=0005ahuay8378ah8sk`
    );
    const data = await responce.json();
    const count = responce.headers.get('X-Total-Count');

    dispatch(setUsers(data));
    dispatch(setPageCount(count));
  } catch (error) {
    console.log(error.message);
  }
};

export const editUser = (id, data, page, limit) => async (dispatch) => {
  try {
    const responce = await fetch(
      `https://school.constcode.ru:3500/users/${id}/?key=0005ahuay8378ah8sk`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );
    const result = await responce.json();
    console.log(result);
    dispatch(fetchUsers(page, limit));
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = (id, page, limit) => async (dispatch) => {
  try {
    const responce = await fetch(
      `https://school.constcode.ru:3500/users/${id}/?key=0005ahuay8378ah8sk`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const result = await responce.json();
    console.log(result);
    dispatch(fetchUsers(page, limit));
  } catch (error) {
    console.log(error.message);
  }
};

export const addUser = (data, page, limit) => async (dispatch) => {
  try {
    const responce = await fetch(
      `https://school.constcode.ru:3500/users/?key=0005ahuay8378ah8sk`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );
    const result = await responce.json();
    console.log(result);
    dispatch(fetchUsers(page, limit));
  } catch (error) {
    console.log(error.message);
  }
};

export default usersSlice.reducer;
