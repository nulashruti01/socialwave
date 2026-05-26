import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchConversations, fetchConversation, sendMessage } from '../utils/api';
import ConversationList from '../components/ConversationList';
import MessageBubble from '../components/MessageBubble';
import '../styles/Messages.css';

const Messages = () => {
  const { userId: selectedUserId } = useParams();
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      loadConversation(selectedUserId);
    }
  }, [selectedUserId]);

  const loadConversations = async () => {
    try {
      const { data } = await fetchConversations();
      setConversations(data.conversations || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading conversations:', error);
      setLoading(false);
    }
  };

  const loadConversation = async (otherUserId) => {
    try {
      const { data } = await fetchConversation(otherUserId);
      setMessages(data.messages || []);
      const conversation = conversations.find(c =>
        c.participants.some(p => p._id === otherUserId)
      );
      if (conversation) {
        setSelectedUser(conversation.participants.find(p => p._id !== user._id));
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedUser) return;

    try {
      const { data } = await sendMessage(selectedUser._id, messageText, [], []);
      setMessages([...messages, data.message]);
      setMessageText('');
      loadConversations();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  if (loading) {
    return <div className="spinner">Loading messages...</div>;
  }

  return (
    <div className="messages-container">
      <div className="messages-wrapper">
        <ConversationList conversations={conversations} selectedUser={selectedUser} />

        <div className="chat-panel">
          {selectedUser ? (
            <>
              <div className="chat-header">
                {selectedUser.avatar && (
                  <img src={selectedUser.avatar} alt={selectedUser.username} className="chat-avatar" />
                )}
                <h2>{selectedUser.username}</h2>
              </div>

              <div className="messages-list">
                {messages.length === 0 ? (
                  <div className="empty-messages">
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map(msg => (
                    <MessageBubble
                      key={msg._id}
                      message={msg}
                      isOwn={msg.sender._id === user._id}
                    />
                  ))
                )}
              </div>

              <form onSubmit={handleSendMessage} className="message-composer">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="input"
                />
                <button type="submit" className="btn btn-primary">Send</button>
              </form>
            </>
          ) : (
            <div className="empty-state">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
