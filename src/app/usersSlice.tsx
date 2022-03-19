import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UserState {
    usersList: any[],
    currentUserData: any[] | null
}

const initialState = {
    usersList: [],
    currentUserData: null
} as UserState

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersListSave(state: any, action: PayloadAction<any>) {
            if (action.payload) {
                state.usersList = action.payload
            } else {
                state.usersList = initialState.usersList
            }
        },
        currentUserDataSave(state: any, action: PayloadAction<any>) {
            if (action.payload) {
                state.currentUserData = action.payload
            } else {
                state.currentUserData = initialState.currentUserData
            }
        },
    }
})

export const { usersListSave, currentUserDataSave } = userSlice.actions

export const selectUsersList = (state: RootState) => state.usersListAndData
export const selectCurrentUserData = (state: RootState) => state.usersListAndData.currentUserData

export default userSlice.reducer