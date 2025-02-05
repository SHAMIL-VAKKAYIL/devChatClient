import { useDispatch, useSelector } from "react-redux"
import SideNavbar from "@/components/SideNavbar";
import NavbarTop from "@/components/NavbarTop";
import Contactlist from "@/components/Contactlist";
import ChatContainer from "@/components/ChatContainer";
import { RootState, AppDispatch } from "@/store";
import NochatContainer from "@/components/NochatContainer";
import { useEffect } from "react";
import { getUsers } from "@/store/chatSlice";

function Home() {


    const dispatch = useDispatch<AppDispatch>()

    const { selectedUser, users, isUserLoading, isMessagesLoading, messages, selectedGroup } = useSelector((state: RootState) => ({

        users: state.chatreducer.users,
        selectedUser: state.chatreducer.selectedUser,
        isUserLoading: state.chatreducer.isUserLoading,
        isMessagesLoading: state.chatreducer.isMessagesLoading,
        messages: state.chatreducer.messages,
        selectedGroup: state.chatreducer.selectedGroup
    }))


    useEffect(() => {
        dispatch(getUsers())
    }, [getUsers])



    return (
        <div className="h-screen bg-primary overflow-hidden flex flex-col ">
            <div className="relative p-1 ">
                <NavbarTop />
            </div>
            <div className="flex  px-1 w-full mx-auto gap-1 h-[91.5svh] pb-1">
                <SideNavbar />
                <Contactlist
                    isuserLoading={isUserLoading}
                    users={users}
                    classStyle={selectedUser || selectedGroup ? 'hidden sm:flex' : ''}
                />
                {selectedUser || selectedGroup ?
                    <ChatContainer
                        selectedUser={selectedUser}
                        messages={messages}
                        ismessageloading={isMessagesLoading}
                        selectedGroup={selectedGroup}
                        users={users}

                    /> : <NochatContainer />}
            </div>
        </div>
    )
}

export default Home
