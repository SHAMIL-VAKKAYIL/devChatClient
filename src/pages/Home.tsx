import { fetchUSer } from "@/redux/userSlice";
import { RootState } from "@/store"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addChat } from "@/redux/messageSlice";
import axios from "axios";

function Home() {
    const dispatch = useDispatch()

    
    useEffect(() => {
        dispatch(fetchUSer());
    }, [dispatch]);
    const data = useSelector((state: RootState) => state.userreducer.users)

    const handleClick = async () => {
        //  const addChat=createAsyncThunk('chats/addChat',async()=>{
        await axios.post('http://localhost:3000/chat/chat',{
         sender:'677be3b0c5937c30cca33c8f',
         reciver:'677cd04da303387d278147c4',
         message:'Hello',
        })
    }



return (
    <div>
        {data.map((users) => (
            <>
                <p>{users._id}</p>
                <p>{users.name}</p>
            </>

        ))}
        <button onClick={handleClick}>add data</button>
    </div>
)
}

export default Home
