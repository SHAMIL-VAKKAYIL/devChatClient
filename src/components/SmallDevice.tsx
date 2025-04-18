import React, { useEffect, useState } from 'react';
import logo from '../assets/images/logo.png'

const SmallDevice: React.FC = () => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    if (isMobile) {
        return (
            <div className=" w-full flex flex-col items-center justify-center h-screen bg-bg2 text-white p-4 text-center">
                <div className='pl-2 flex items-center '>
                    <img src={logo} loading="lazy" alt="" className='w-12 m-auto rounded-full hover:rounded-xl transition-transform  ' />
                    <p className="lato-bold text-lg text-secondary ">Dev-Chat</p>
                </div>
                <p className="text-md lato-regular">
                    This website is not available on small devices. <br />
                    Please switch to Desktop Site or use a larger screen.
                </p>
            </div>
        );
    }

};

export default SmallDevice;
