import React, { useRef } from 'react'
import { useUser } from '@clerk/react'
import { useNavigate } from 'react-router-dom'

const Pingup = () => {
  const { user } = useUser();
  const iframeRef = useRef(null);
  const navigate = useNavigate();

  const handleIframeLoad = () => {
    if (user && iframeRef.current) {
        const ssoData = {
            type: 'SSO_LOGIN',
            user: {
                fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Job Coach User',
                email: user.primaryEmailAddress?.emailAddress,
                profilePic: user.imageUrl || ''
            }
        };
        iframeRef.current.contentWindow.postMessage(ssoData, 'http://localhost:5174');
    }
  };

  return (
    <div className="relative h-screen w-full bg-black">


        <iframe 
            ref={iframeRef}
            src="http://localhost:5174" 
            title="Pingup Social" 
            className="w-full h-full border-none"
            onLoad={handleIframeLoad}
        ></iframe>
    </div>
  )
}

export default Pingup
