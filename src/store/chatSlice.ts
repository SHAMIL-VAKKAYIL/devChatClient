import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";
import { getSocket } from "@/services/socket";



export const features=(feature:string)=>{
    toast(`${feature} is under development. Stay tuned for updates!`,
        {
          icon: '👨‍💻',
          style: {
            borderRadius: '10px',
            border: '2px solid green', // Updated to include border thickness and color
            background: '#333',
            color: '#fff',
          },
        }
      );
}


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
export const getMessages = createAsyncThunk('chat/getMessages',async(userId:string)=>{

    try {
        const response=await axiosInstance.get(`/message/${userId}`)
        return response.data
        
    } catch (error:any) {
        toast.error(error.response.data.message)
        
    }
})

//? send message
export const sendMessages = createAsyncThunk('chat/sendMessage',async({UserId,messageData}:any)=>{
    try {
        const response=await axiosInstance.post(`/message/send/${UserId}`,messageData)
        return response.data
        
    } catch (error:any) {
        toast.error(error.response.data.message)
        
    }
})

//? get selected user
export const setSelectedUser=createAsyncThunk('chat/setSetlectedUser',async(userId:string)=>{
    
try {
    const response = await axiosInstance.get(`/message/selected/${userId}`) 
    return response.data
} catch (error:any) {
    toast.error(error.response.data.message)
    
}
})
//? get selected user
export const setSelectedGroup=createAsyncThunk('chat/setSetlectedGroup',async(userId:string)=>{
    
try {
    const response = await axiosInstance.get(`/message/selected/${userId}`) 
    return response.data
} catch (error:any) {
    toast.error(error.response.data.message)
    
}
})

//? remove chat container
export const removechatContainer= createAsyncThunk('chat/removechatContainer',async()=>{})

export const subscribeToMessage=()=>(dispatch:any,getState:any)=>{
    
    const {selectedUser} = getState().chatreducer
    if(!selectedUser)return

    const socket = getSocket()
    console.log(socket);

    socket?.on('newMessage',(newMessage)=>{
        if(newMessage.senderId === selectedUser._id)
        dispatch(addNewMessage(newMessage))
    })
}
export const unSubscribeMessages =()=>{
    const socket = getSocket()
    console.log(socket);
    
    socket?.off('newMessage')
}


interface IinitialState{
    messages:Array<any>,
    users:Array<any>,
    selectedUser:any | null,
    isUserLoading:boolean | null,
    isMessagesLoading:boolean | null,
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
        addNewMessage: (state,action)=>{
            state.messages=[...state.messages,action.payload]
            console.log(state.messages);
            
        }

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
            console.log(action.payload);
            
            state.messages=action.payload
            state.isMessagesLoading=false
        })
        .addCase(getMessages.rejected,(state)=>{
            state.isMessagesLoading=false
        })

        //! selected User
        .addCase(setSelectedUser.fulfilled,(state,action)=>{
            state.selectedUser=action.payload
        })
        .addCase(setSelectedUser.rejected,(state)=>{
            state.selectedUser=null
        })

        //! remove chat container
        .addCase(removechatContainer.fulfilled,(state)=>{
            state.selectedUser=null
        })

        //! send messages
        .addCase(sendMessages.fulfilled,(state,action)=>{
            state.messages=[...state.messages,action.payload]
        })
    }
        
    
})

export const {addNewMessage}=chatSlice.actions
export default chatSlice.reducer