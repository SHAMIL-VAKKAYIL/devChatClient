import { axiosInstance } from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";



interface IUserSingup {
    name?: string;
    email: string;
    password: string;
}

interface UserState {
    onlineUsers:[]
    status:'idle'|'loading'|'success'|'failed';
    error: string | null;
    authUser:any,
    isSigningUp:boolean|null,
    islogging:boolean|null,
    isloggingOut:boolean|null,
    isCheckingAuth:boolean|null,
}



//?authentication checking
export const checkAuth=createAsyncThunk('users/checkAuth',async(_,{rejectWithValue})=>{
    try {
        const res=await axiosInstance.get('/auth/check')
        const data=res.data
        return data;
    } catch (error:any) {
        console.log(error.response.data);
        
    }
})

//? user signup
export const signup=createAsyncThunk('users/signup',async(data)=>{
    try {
        const res=await axiosInstance.post('/auth/signup',data);
        toast.success('user registered successfully')
        return res.data
    } catch (error:any) {
        toast.error(error.response.data);
        
    }
})

//? user signin
export const signin=createAsyncThunk('users/signin',async(data:{email:string,password:string},{rejectWithValue})=>{
    try {   
    const res=await axiosInstance.post('/auth/login',data)
    toast.success('user logged successfully')
    return res.data;       
    } catch (error:any) {
        toast.error(error.response.data)
        
    }
})

//? user logout
export const logout=createAsyncThunk('users/logout',async()=>{
    try {   
        await axiosInstance.post('auth/logout')
        toast.success(' logout successfully')
        
    } catch (error) {
        toast.error('somthing went wrong' )
    }
})



// Type-safe initial state
const initialState:UserState= {
    onlineUsers: [],
    status: 'idle',
    error: null,
    authUser:null,
    isCheckingAuth: null,
    isSigningUp: null,
    islogging: null,
    isloggingOut: null,


};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Add type-safe reducers here if needed
    },
    extraReducers: (builder) => {
        builder
        //! auth Check
        .addCase(checkAuth.pending,(state)=>{
            state.isCheckingAuth = true;
        })
        .addCase(checkAuth.fulfilled,(state,action)=>{
            state.authUser = action.payload;
            state.isCheckingAuth = false;
        })
        .addCase(checkAuth.rejected,(state)=>{
            state.authUser=null
            state.isCheckingAuth = false;
        })

        //! signup
        .addCase(signup.pending,(state)=>{
            state.isSigningUp = true;
        })
        .addCase(signup.fulfilled,(state)=>{
            state.isSigningUp = false
        })
        .addCase(signup.rejected,(state)=>{
            state.isSigningUp = false;
        })
        //! signin
        .addCase(signin.pending,(state)=>{
            state.islogging = true;
        })
        .addCase(signin.fulfilled,(state)=>{
            state.islogging = false
        })
        .addCase(signin.rejected,(state)=>{
            state.islogging = false;
        })
        
        //! logout
        .addCase(logout.pending,(state)=>{
            state.isloggingOut = true;
        })
        .addCase(logout.fulfilled,(state)=>{
            state.authUser = null;
            state.isloggingOut = false

        })
        .addCase(logout.rejected,(state)=>{
            state.isloggingOut = false;
        })
        
    }
});

export default userSlice.reducer;







// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";

// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";



// export const signup = createAsyncThunk("auth/signup", async (data, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post("/auth/signup", data);
//     toast.success("Account created successfully");
//     return response.data;
//   } catch (error) {
//     toast.error(error.response.data.message);
//     return rejectWithValue(error.response.data.message);
//   }
// });

// export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post("/auth/login", data);
//     toast.success("Logged in successfully");
//     return response.data;
//   } catch (error) {
//     toast.error(error.response.data.message);
//     return rejectWithValue(error.response.data.message);
//   }
// });

// export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
//   try {
//     await axiosInstance.post("/auth/logout");
//     toast.success("Logged out successfully");
//   } catch (error) {
//     toast.error(error.response.data.message);
//     return rejectWithValue(error.response.data.message);
//   }
// });

// export const updateProfile = createAsyncThunk("auth/updateProfile", async (data, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.put("/auth/update-profile", data);
//     toast.success("Profile updated successfully");
//     return response.data;
//   } catch (error) {
//     toast.error(error.response.data.message);
//     return rejectWithValue(error.response.data.message);
//   }
// });

// // Slice definition
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     authUser: null,
//     isSigningUp: false,
//     isLoggingIn: false,
//     isUpdatingProfile: false,
//     isCheckingAuth: true,
//     onlineUsers: [],
//     socket: null,
//   },
//   reducers: {
//     setSocket(state, action) {
//       state.socket = action.payload;
//     },
//     setOnlineUsers(state, action) {
//       state.onlineUsers = action.payload;
//     },
//     disconnectSocket(state) {
//       if (state.socket?.connected) {
//         state.socket.disconnect();
//       }
//       state.socket = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//       // Handle signup
//       .addCase(signup.pending, (state) => {
//         state.isSigningUp = true;
//       })
//       .addCase(signup.fulfilled, (state, action) => {
//         state.authUser = action.payload;
//         state.isSigningUp = false;
//       })
//       .addCase(signup.rejected, (state) => {
//         state.isSigningUp = false;
//       })
//       // Handle login
//       .addCase(login.pending, (state) => {
//         state.isLoggingIn = true;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.authUser = action.payload;
//         state.isLoggingIn = false;
//       })
//       .addCase(login.rejected, (state) => {
//         state.isLoggingIn = false;
//       })
//       // Handle logout
//       .addCase(logout.fulfilled, (state) => {
//         state.authUser = null;
//       })
//       // Handle updateProfile
//       .addCase(updateProfile.pending, (state) => {
//         state.isUpdatingProfile = true;
//       })
//       .addCase(updateProfile.fulfilled, (state, action) => {
//         state.authUser = action.payload;
//         state.isUpdatingProfile = false;
//       })
//       .addCase(updateProfile.rejected, (state) => {
//         state.isUpdatingProfile = false;
//       });
//   },
// });

// export const { setSocket, setOnlineUsers, disconnectSocket } = authSlice.actions;

// export const connectSocket = () => (dispatch, getState) => {
//   const { authUser, socket } = getState().auth;
//   if (!authUser || socket?.connected) return;

//   const newSocket = io(BASE_URL, {
//     query: {
//       userId: authUser._id,
//     },
//   });

//   newSocket.connect();

//   newSocket.on("getOnlineUsers", (userIds) => {
//     dispatch(setOnlineUsers(userIds));
//   });

//   dispatch(setSocket(newSocket));
// };

// export default authSlice.reducer;
