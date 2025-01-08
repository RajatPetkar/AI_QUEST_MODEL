const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user}`}>
      <div className={`message-box ${message.user}`}>
        <span className="user-label">
          {message.user === 'user' ? 'AI' : 'User'}:
        </span>
        <span className="message-text">{message.message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
