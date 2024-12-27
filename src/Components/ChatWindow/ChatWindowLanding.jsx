import React from 'react'
import img from '../../Assets/image-icone.png'
import './ChatWindowLanding.css'

const ChatWindowLanding = () => {
  return (
    <div className='chat-landing-container'>

        <div className='chat-landing-box'>
                <div className='chat-landing-item'>
                    <img src={img} alt="" />
                    <p>Download WhatsApp for Windows</p>
                    <span>Make calls, share your screen and get a faster experience when you download the windows app.</span>

                    <button>Get from Microsoft Store</button>
                </div>

        </div>
      
    </div>
  )
}

export default ChatWindowLanding
