import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchUSer = createAsyncThunk('users/fetchUSer',async()=>{
    const user = await axios.get('http://localhost:3000/auth/users')
    console.log(user, 'username');
    return user.data.users;
    

});
// Define interfaces
// interface IUser {
//     id: string;
//     name: string;
// }

// interface UserState {
//     users: IUser[];
//     status:'idle'|'loading'|'success'|'failed';
//     error: string | null;
// }

// Type-safe initial state
const initialState= {
    users: [],
    status: 'idle',
    error: null

};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Add type-safe reducers here if needed
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUSer.pending,(state)=>{
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchUSer.fulfilled,(state,action)=>{
            state.status ='success';
            state.users = action.payload;
        })
        .addCase(fetchUSer.rejected,(state,action)=>{
            state.status = 'failed';
            // state.error = action.error.message ?? null;
        })
        // Add type-safe extra reducers here if needed
    }
});

export default userSlice.reducer;