import { useDispatch, useSelector } from "react-redux"
import SideNavbar from "@/components/sideNavbar";
import NavbarTop from "@/components/NavbarTop";
import Contactlist from "@/components/Contactlist";
import ChatContainer from "@/components/ChatContainer";

function Home() {
    const dispatch = useDispatch()

    return (
        <>
            <div className="relative">
                <NavbarTop />
                <SideNavbar />
            </div>
            <div>
                <Contactlist />
                <ChatContainer />
            </div>
        </>
    )
}

export default Home
