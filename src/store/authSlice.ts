import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    status: string;
    message: string;
    userData: UserData | null;
}

const initialState: AuthState = {
    status: "",
    message: "",
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserData>) => {
            state.status = "success";
            state.message = "Login Successful";
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = "";
            state.message = "";
            state.userData = null;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
