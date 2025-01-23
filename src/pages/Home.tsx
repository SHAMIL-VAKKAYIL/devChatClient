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
    interface Ichat {
        messages: Array<any>,
        users: Array<any>,
        selectedUser: any | null,
        isUserLoading: boolean | null,
        isMessagesLoading: boolean | null,
    }

    const dispatch = useDispatch<AppDispatch>()

    const { selectedUser, users, isUserLoading, isMessagesLoading, messages } = useSelector((state: RootState) => ({

        users: state.chatreducer.users,
        selectedUser: state.chatreducer.selectedUser,
        isUserLoading: state.chatreducer.isUserLoading,
        isMessagesLoading: state.chatreducer.isMessagesLoading,
        messages: state.chatreducer.messages,
    }))

    const onlineUsers = []

    useEffect(() => {
        dispatch(getUsers())
    }, [getUsers])

    return (
        <div className="h-svh bg-primary flex flex-col gap-1">
            <div className="relative p-1 h-[8svh]">
                <NavbarTop />
            </div>
            <div className="flex  px-1 gap-1 h-[91svh]">
                <SideNavbar />
                <Contactlist
                    isuserLoading={isUserLoading}
                    users={users}
                />
                {selectedUser ?
                    <ChatContainer
                        selectedUser={selectedUser}
                        messages={messages}
                        ismessageloading={isMessagesLoading}

                    /> : <NochatContainer />}
            </div>
        </div>
    )
}

export default Home
