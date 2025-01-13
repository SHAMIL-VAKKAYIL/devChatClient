import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChats=createAsyncThunk('chats/fetchChats',async()=>{
    const response=await axios.get('http://localhost:3000/chat/chat')
    console.log(response);
    return response.data;
}) 



interface Ichat{
    id:string
    text:string ;
    senderId: string;
    image?:string
    timestamp:string
}
interface IactiveChat{
    type:'individual'|'group'|null
    chatroomId: string | null;
    recipientId: string | null;
    senderId: string | null;
}

interface initialState{
    activeChat:IactiveChat
    messages:Ichat[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState:initialState={
    activeChat:{
        type:null,
        chatroomId:null,
        recipientId: null, 
        senderId: null, 
    },
    messages:[],
    status:'idle',
    error:null
}
const messageSlice=createSlice({
    name:'chats',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
            builder
                .addCase(fetchChats.pending,(state)=>{
                    state.status='loading'
                })
                .addCase(fetchChats.fulfilled,(state,action)=>{
                    state.status='succeeded';
                    state.messages=action.payload
                })
                .addCase(fetchChats.rejected,(state)=>{
                    state.status='failed'
                })
    }

})

export default messageSlice.reducer