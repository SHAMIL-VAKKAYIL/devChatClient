import { useDispatch, useSelector } from "react-redux"
import SideNavbar from "@/components/SideNavbar";
import NavbarTop from "@/components/NavbarTop";
import Contactlist from "@/components/Contactlist";
import ChatContainer from "@/components/ChatContainer";

function Home() {
    const dispatch = useDispatch()

    return (
        <div className="h-screen overflow-hidden bg-primary">
            <div className="relative">
                <NavbarTop />
            </div>
            <div className="flex px-1 gap-1">
                <SideNavbar />
                <Contactlist />
                <ChatContainer />
            </div>
        </div>
    )
}

export default Home
