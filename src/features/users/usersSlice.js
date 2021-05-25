import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import FetchRequest from '../../FetchRequest';

const fr = new FetchRequest({
  secureMode: true,
  host: 'school.constcode.ru',
  port: '3500',
  query: {
    key: '0005ahuay8378ah8sk',
  },
});

export const usersSlice = createSlice({
  name: 'users',

  initialState: {
    users: [],
    limit: 5,
    activePage: 1,
    pageCount: 0,
    loading: false,
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUsers, setLimit, setActivePage, setPageCount, setLoading } =
  usersSlice.actions;

export const useUsers = () => useSelector(({ users }) => users);

export const fetchUsers = (page, limit) => async (dispatch) => {
  try {
    const { count, data } = await fr.get('/users', {
      _page: page,
      _limit: limit,
    });

    dispatch(setUsers(data));
    dispatch(setPageCount(count));
  } catch (error) {
    console.log(error.message);
  }
};

export const editUser = (id, data) => async (dispatch) => {
  try {
    await fr.put(`/users/${id}`, data);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await fr.delete(`/users/${id}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const addUser = (data) => async (dispatch) => {
  try {
    await fr.post('/users', data);
  } catch (error) {
    console.log(error.message);
  }
};

export default usersSlice.reducer;
