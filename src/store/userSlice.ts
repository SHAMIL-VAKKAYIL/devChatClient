import { axiosInstance } from "@/lib/axios";
import { connectSocket, disconnectSocket } from "@/services/socket";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";




// initialState's type declaration 
interface UserState {
    onlineUsers:any
    status:'idle'|'loading'|'success'|'failed';
    error: string | null;
    authUser:any,
    isSigningUp:boolean|null,
    islogging:boolean|null,
    isloggingOut:boolean|null,
    isCheckingAuth:boolean|null,
    isDeleteAcc:boolean| null,
    isUpdatingProfile:boolean|null,
    // socket: object | null
}



//?authentication checking
export const checkAuth=createAsyncThunk('users/checkAuth',async()=>{
    try {
        const res=await axiosInstance.get('/auth/check')
        const data=res.data
        return data;
    } catch (error:any) {
        console.log(error.response.data);
        
    }
})

//? user signup
export const signup=createAsyncThunk('users/signup',async(data:{fullname:string,email:string,password:string })=>{
    try {
        const res=await axiosInstance.post('/auth/signup',data);
        toast.success('user registered successfully')
        return res.data
    } catch (error:any) {
        toast.error(error.response.data);
        
    }
})

//? user signin
export const signin=createAsyncThunk('users/signin',async(data:{email:string,password:string})=>{
    try {   
    const res=await axiosInstance.post('auth/login',data)
    toast.success('user logged successfully')
    return res.data;       
    } catch (error:any) {
        toast.error(error.response.data)
        
    }
})

//? user logout
export const logout=createAsyncThunk('users/logout',async()=>{
    try {   
        await axiosInstance.post('/auth/logout')
        toast.success(' logout successfully')
        
    } catch (error) {
        toast.error('somthing went wrong' )
    }
})

//? Profile Updating
export const updateProfile=createAsyncThunk('users/updateProfile',async(data:{profilePic?:string,email?:string,name?:string},{rejectWithValue})=>{
try {
        const payload:any={}
        if(data.profilePic) payload.profilePic=data.profilePic
        if(data.email) payload.email=data.email
        if(data.name) payload.fullname=data.name

        const response = await axiosInstance.put('auth/update_profile',payload)
        const profile=response.data
        toast.success('Profile updated successfully')
        return profile
        
    } catch (error:any) {
        toast.error('somthing went wrong' )   
        return rejectWithValue(error.response.data)
    }
})

//? deleting account
 export const deleteAccount=createAsyncThunk('users/deleteAccount',async()=>{
     try {   
         await axiosInstance.delete('/auth/delete')
         toast.success('Account deleted successfully')
        
     } catch (error) {
         toast.error('somthing went wrong' )
     }
 })

 export const setSocket =()=>(dispatch:any,getState:any)=>{
    
    const {authUser}=getState().userreducer
    const socket=connectSocket(authUser._id)
    
    socket.on('getOnlineUsers',(userIds)=>{
        dispatch(setOnlineUsers(userIds))
    })
 }

 export const disSocket=()=>{
    disconnectSocket()
 }





const initialState:UserState= {
    onlineUsers: [],
    status: 'idle',
    error: null,
    authUser:null,
    isCheckingAuth: null,
    isSigningUp: null,
    islogging: null,
    isloggingOut: null,
    isDeleteAcc:null,
    isUpdatingProfile:null,
    // socket: null


};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setOnlineUsers: (state, { payload }) => {
            state.onlineUsers = payload;
          },
        // setSocket:(state,{payload})=>{
        //     state.socket = payload
        //     console.log(payload);
            
        // },

        // disconnectSocket: (state) => {
        //     if (state.socket?.connected) state.socket.disconnect();
        //     state.socket = null;
        //     state.onlineUsers = [];
        // },
    },
    extraReducers: (builder) => {
        builder
        //! auth Check
        .addCase(checkAuth.pending,(state)=>{
            state.isCheckingAuth = true;
        })
        .addCase(checkAuth.fulfilled,(state,action)=>{
            state.authUser=action.payload
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
        //! account deletion
        .addCase(deleteAccount.pending,(state)=>{
            state.isDeleteAcc = true
        })
        .addCase(deleteAccount.fulfilled,(state)=>{
            state.authUser = null
            state.isDeleteAcc = false
        })
        .addCase(deleteAccount.rejected,(state)=>{
            state.isDeleteAcc = false
        })

        //! updateProfile
        .addCase(updateProfile.pending,(state)=>{
            state.isUpdatingProfile = true
        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
            
            state.authUser = action.payload
            state.isUpdatingProfile = false
        })
        .addCase(updateProfile.rejected,(state)=>{
            state.isUpdatingProfile = false
        })

    }
});

export const { setOnlineUsers } = userSlice.actions
export default userSlice.reducer;
