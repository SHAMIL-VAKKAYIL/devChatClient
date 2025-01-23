import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";




//? get contact list
export const getUsers = createAsyncThunk('chat/getUsers',async()=>{
    try {
        const response=await axiosInstance.get('/message/users')
        return response.data
        
    } catch (error:any) {
        toast.error(error.response.data.message)
        
    }
})

//? get messages
export const getMessages = createAsyncThunk('chat/getMessages',async(userId)=>{

    try {
        const response=await axiosInstance.get(`/message/${userId}`)
        return response.data
        
    } catch (error:any) {
        toast.error(error.response.data.message)
        
    }
})

//? send message
export const sendMessage = createAsyncThunk('chat/sendMessage',async(messageData,selectedUser)=>{

    try {
        const response=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)
        return response.data
        
    } catch (error:any) {
        toast.error(error.response.data.message)
        
    }
})

//? get selected user
export const setSelectedUser=createAsyncThunk('chat/setSetlectedUser',async(userId)=>{
    console.log(userId);
    
try {
    const response = await axiosInstance.get(`/message/selected/${userId}`) 
    return response.data
} catch (error:any) {
    toast.error(error.response.data.message)
    
}
})

//? remove chat container
export const removechatContainer= createAsyncThunk('chat/removechatContainer',async()=>{})




interface IinitialState{
    messages:Array<any>,
    users:Array<any>,
    selectedUser:any|null,
    isUserLoading:boolean|null,
    isMessagesLoading:boolean|null,
}

const initialState:IinitialState={
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:null,
    isMessagesLoading:null
}


const chatSlice=createSlice({
    name: 'chat',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder

        //! get users
        .addCase(getUsers.pending,(state)=>{
            state.isUserLoading=true
        })
        .addCase(getUsers.fulfilled,(state,action)=>{
            state.users=action.payload
            state.isUserLoading=false
        })
        .addCase(getUsers.rejected,(state)=>{
            state.isUserLoading=false
        })

        //! get messages
        .addCase(getMessages.pending,(state)=>{
            state.isMessagesLoading=true
        })
        .addCase(getMessages.fulfilled,(state,action)=>{
            state.messages=action.payload
            state.isMessagesLoading=false
        })
        .addCase(getMessages.rejected,(state)=>{
            state.isMessagesLoading=false
        })

        //! selected User

        .addCase(setSelectedUser.fulfilled,(state,action)=>{
            state.selectedUser=action.payload
            console.log(state.selectedUser,'check');
            
        })
        .addCase(setSelectedUser.rejected,(state)=>{
            state.selectedUser=null
        })

        //! remove chat container
        .addCase(removechatContainer.fulfilled,(state)=>{
            state.selectedUser=null
        })

        //! send messages
        .addCase(sendMessage.fulfilled,(state,action)=>{
            state.messages=[...state.messages,action.payload]
        })
    }
        
    
})

export default chatSlice.reducer