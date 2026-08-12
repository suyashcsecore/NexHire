import React, { useRef } from 'react'
import { useUser } from '@clerk/react'
import { useNavigate } from 'react-router-dom'

const Chat = () => {
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
        iframeRef.current.contentWindow.postMessage(ssoData, 'http://localhost:5175');
    }
  };

  return (
    <div className="relative h-screen w-full bg-black">
        {/* Floating Back Button */}
        <button 
            onClick={() => navigate('/')}
            className="absolute top-4 left-4 z-50 flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-4 py-2 rounded-full transition-all"
        >
            <span className="text-xl leading-none">&larr;</span> 
            <span className="text-sm font-medium">Back to Job Coach</span>
        </button>

        <iframe 
            ref={iframeRef}
            src="http://localhost:5175"
            title="QuickChat" 
            className="w-full h-full border-none"
            onLoad={handleIframeLoad}
        ></iframe>
    </div>
  )
}

export default Chat
