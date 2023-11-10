import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name:'',
    userId:'',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return{
                ...state,
                name: action.payload.name,
                userId: action.payload.userId,
            }
        }
    }
})

export const { setUser } = userSlice.actions
export const selectUser = state => state.user

export default userSlice.reducer