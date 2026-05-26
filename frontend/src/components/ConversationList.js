import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ConversationList.css';

const ConversationList = ({ conversations, selectedUser }) => {
  return (
    <div className="conversation-list">
      <h3>Messages</h3>
      <div className="conversations">
        {conversations.length === 0 ? (
          <p className="empty">No conversations yet</p>
        ) : (
          conversations.map(conv => {
            const otherUser = conv.participants[0];
            const isSelected = selectedUser?._id === otherUser._id;
            return (
              <Link
                key={conv._id}
                to={`/messages/${otherUser._id}`}
                className={`conversation-item ${isSelected ? 'active' : ''}`}
              >
                {otherUser.avatar && (
                  <img src={otherUser.avatar} alt={otherUser.username} className="avatar" />
                )}
                <div className="conv-info">
                  <h4>{otherUser.username}</h4>
                  {conv.lastMessage && (
                    <p className="last-message">{conv.lastMessage.content || '[Media]'}</p>
                  )}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationList;
