import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const initialState = {
  token: {
    refreshToken: '',
    accessToken: '',
  },
  sido: [],
  gugun: [],
}

export const userAction = {
  // 테스트 액션
  test: createAsyncThunk('TEST', async (payload, thunkAPI) => {
    try {
      console.log('payload', payload)
      const response = await axios.get(`${API_URL}/tags`)
      console.log('response', response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      console.log('안돼')
      return thunkAPI.rejectWithValue(error)
    }
  }),

  // 회원가입
  signUp: createAsyncThunk('user/signup', async (payload, thunkAPI) => {
    try {
      console.log('URL', API_URL)
      console.log('payload', payload)
      const response = await axios.post(`${API_URL}/users`, payload)
      console.log('response', response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),

  // 로그인
  login: createAsyncThunk('LOGIN', async (payload, thunkAPI) => {
    try {
      console.log('URL', API_URL)
      console.log('payload', payload)
      const response = await axios({
        method: 'post',
        url: '/users/login',
        baseURL: API_URL,
        data: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
      console.log('response', response)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUp: (state, action) => {
      console.log(action.payload)
      state.signUpData = action.payload
      console.log(state.signUpData)
    },
  },
  extraReducers: {
    [userAction.test.fulfilled]: (state, action) => {
      state.sido.push(action.payload)
    },
    [userAction.signUp.fulfilled]: (state, action) => {
      state.sido.push(action.payload)
    },
    [userAction.login.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.token.accessToken = action.payload['access-token']
      state.token.refreshToken = action.payload['refresh-token']
      console.log(state.token.accessToken)
      console.log(state.token.refreshToken)
    },
  },
})

export const { signUp } = userSlice.actions

export default userSlice.reducer
