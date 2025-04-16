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
export const getMessages = createAsyncThunk('chat/getMessages',async({userId,GroupId}:{userId:string|null, GroupId:string|null })=>{
    try {
        let response;
        
        if (GroupId) {
            response = await axiosInstance.get(`/message/groupMessages/${GroupId}`);
            
            console.log(userId,'user');
        } else {
            
            response = await axiosInstance.get(`/message/messages/${userId}`);
        }
        return response.data;
        
    } catch (error:any) {
        toast.error(error.response.data.message);
    }
})

//? send message
export const sendMessages = createAsyncThunk('chat/sendMessage',async({UserId,messageData,GroupId}:{UserId?:string|null,messageData:object|null,GroupId?:string|null})=>{
    
    try {
        const response=await axiosInstance.post(`/message/send`,{messageData,UserId,GroupId})
        return response.data
        
    } catch (error:any) {
        toast.error(error.response.data.message)
        
    }
})

//? get selected user
export const setSelectedUser=createAsyncThunk('chat/setSetlectedUser',async(userId:string|undefined)=>{
    
try {
    const response = await axiosInstance.get(`/message/selected/${userId}`) 
    return response.data
} catch (error:any) {
    toast.error(error.response.data.message)
    
}
})

//? get selected group
export const setSelectedGroup=createAsyncThunk('chat/setSetlectedGroup',async(groupId:string)=>{
try {
    const response = await axiosInstance.get(`/message/group/${groupId}`) 
    return response.data
} catch (error:any) {
    toast.error(error.response.data.message)
}
})

//? get group members
export const getGroupMembers=createAsyncThunk('chat/getGroupMembers',async({selectedGroupId}:{selectedGroupId?:string| null})=>{
    try {
        const response = await axiosInstance.get(`/message/groupmembers/${selectedGroupId}`) 
        return response.data
    } catch (error:any) {
        toast.error(error.response.data.message)
    }
})

//? add Members to group
export const addGroupMember=createAsyncThunk('chat/addGroupMember',async({selectedUserID, selectedGroupId}: {selectedUserID: string|null, selectedGroupId: string})=>{
try {
    const response = await axiosInstance.post(`/message/addMember/${selectedGroupId}`,{selectedUserID}) 
    const data =response.data
    toast(data.message)
    return data.data
} catch (error:any) {
    toast.error(error.response.data.message)
}
})

//? remove Members from group
export const removeGroupMember=createAsyncThunk('chat/removeGroupMember',async({selectedUserID,selectedGroupId}:{selectedUserID:string|null,selectedGroupId: string})=>{
try {
    const response = await axiosInstance.put(`/message/removeMember/${selectedGroupId}`,{selectedUserID}) 
    const data= response.data
    toast(data.message)
    return data.data
} catch (error:any) {
    toast.error(error.response.data.message)
}
})

//? remove chat container
export const removechatContainer= createAsyncThunk('chat/removechatContainer',async()=>{})

//? creating group
export const createGroup= createAsyncThunk('chat/createGroup',async(grpName:string)=>{
    try {
        const response=await axiosInstance.post('/message/creategroup',{grpName})
        return response.data
        
    } catch (error:any) {
        console.log(error);
      
    toast.error(error.response.data.message)
        
    }

})

//? get all groups

export const getGroups= createAsyncThunk('chat/getGroups',async()=>{
    try {
        const response=await axiosInstance.get('/message/groups')
        return response.data      
    } catch (error:any) {
        toast.error(error.response.data.message)
        
    }
})

//? searching contacts
export const searchContact=createAsyncThunk('chat/searchContact',async(searchTerm:string)=>{
    try {
        const response=await axiosInstance.get(`/message/search?query=${searchTerm}`)
        return response.data      
    } catch (error:any) {
        toast.error(error.response.data.message)
        
    }
})

//? delete message 
export const deleteMsg=createAsyncThunk('chat/deleteMSg',async(id:string)=>{
    try {
        const response =await axiosInstance.delete(`/message/delmsg/${id}`)
        toast.success(response.data.message)
        return response.data.data
    } catch (error:any) {
        toast.error(error.response.data.message)
    }
})

export const subscribeToMessage=()=>(dispatch:any,getState:any)=>{
    
    const {selectedUser} = getState().chatreducer
    const {selectedGroup} =getState().chatreducer
    
    if(!selectedUser && !selectedGroup)return
    console.log(selectedGroup,'grpid');

    const socket = getSocket()
    console.log(socket);

    socket?.on('newMessage',(newMessage)=>{
        
        if( newMessage.senderId === selectedUser?._id )
        dispatch(addNewMessage(newMessage))
    })

    selectedGroup && socket?.emit('joinGroup',selectedGroup?._id)

    socket?.on('NewGrpMessage',(NewGrpMessage)=>{
        console.log(NewGrpMessage,'fey');
        
        if( NewGrpMessage.chatroom === selectedGroup?._id )
        dispatch(addNewMessage(NewGrpMessage))
    })
    
}
export const unSubscribeMessages =()=>{
    const socket = getSocket()
    console.log(socket);
    
    socket?.off('newMessage')
    socket?.off('NewGrpMessage')
}


interface IinitialState{
    messages:Array<any>,
    users:Array<any>|null,
    groups:Array<any>,
    selectedUser:any | null,
    isUserLoading:boolean | null,
    isMessagesLoading:boolean | null,
    selectedGroup:any | null,
    groupMembers:Array<any>|null
}

const initialState:IinitialState={
    messages:[],
    users:[],
    groups:[],
    selectedUser:null,
    isUserLoading:null,
    isMessagesLoading:null,
    selectedGroup:null,
    groupMembers:null
}


const chatSlice=createSlice({
    name: 'chat',
    initialState,
    reducers:{
        addNewMessage: (state,action)=>{
            const existingMessage= state.messages.some(
                (msg=>msg._id== action.payload._id)
            )
            if(!existingMessage) state.messages=[...state.messages,action.payload]
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
            state.selectedGroup=null
            state.selectedUser=action.payload
        })
        .addCase(setSelectedUser.rejected,(state)=>{
            state.selectedUser=null
        })

        //! remove chat container
        .addCase(removechatContainer.fulfilled,(state)=>{
            state.selectedUser=null
            state.selectedGroup=null
        })

        //! send messages
        .addCase(sendMessages.fulfilled,(state,action)=>{

            const messageExist=state.messages.some(
                (msg)=>msg?._id === action.payload._id
            )
            if(!messageExist){
                state.messages=[...state.messages,action.payload]
            }
        })

        //! get Groups
        .addCase(getGroups.fulfilled,(state,action)=>{
            state.groups=action.payload
        })

        //! get selected group
        .addCase(setSelectedGroup.fulfilled,(state,action)=>{
            state.selectedUser=null
            state.selectedGroup=action.payload
        })
        .addCase(setSelectedGroup.rejected,(state)=>{
            state.selectedGroup=null
        })
        //! get Group members
        .addCase(getGroupMembers.pending,(state)=>{
            state.groupMembers=null
        })
        .addCase(getGroupMembers.fulfilled,(state,action)=>{
            state.groupMembers=action.payload
        })
        .addCase(getGroupMembers.rejected,(state)=>{
            state.groupMembers=null
        })

        //! add member to group
        .addCase(addGroupMember.fulfilled,(state,action)=>{
            state.groupMembers = action.payload
        })
        .addCase(addGroupMember.rejected,(state)=>{
            state.groupMembers=null
        })

        //! remove member from group
        .addCase(removeGroupMember.fulfilled,(state,action)=>{
            console.log(action.payload); 
            state.groupMembers=action.payload
        })

        //! search Contact
        .addCase(searchContact.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.users=action.payload
        })
        .addCase(searchContact.rejected,(state)=>{
            state.users=null
        })

        //! delete message 
        .addCase(deleteMsg.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.messages = state.messages.filter((msg)=>msg._id != action.payload._id)
        })
        
     
    }
        
    
})

export const {addNewMessage}=chatSlice.actions
export default chatSlice.reducer