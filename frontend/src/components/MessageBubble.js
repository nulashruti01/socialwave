import React from 'react';
import '../styles/MessageBubble.css';

const MessageBubble = ({ message, isOwn }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message-bubble ${isOwn ? 'own' : 'other'}`}>
      <div className="bubble-content">
        {message.content && <p className="message-text">{message.content}</p>}
        {message.mediaUrl && message.mediaUrl.length > 0 && (
          <div className="message-media">
            {message.mediaUrl.map((url, idx) => {
              const mediaType = message.mediaType[idx];
              return (
                <div key={idx} className="media-item">
                  {mediaType === 'image' ? (
                    <img src={url} alt="shared" className="media-image" />
                  ) : mediaType === 'video' ? (
                    <video src={url} controls className="media-video" />
                  ) : (
                    <a href={url} target="_blank" rel="noopener noreferrer">View Reel</a>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <span className="message-time">{formatTime(message.createdAt)}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
