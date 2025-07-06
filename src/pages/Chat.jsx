import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useAction, getMessages, sendMessage, generateAIResponse } from 'wasp/client/operations';

const ChatPage = () => {
  const { data: messages, isLoading, error } = useQuery(getMessages);
  const sendMessageFn = useAction(sendMessage);
  const generateAIResponseFn = useAction(generateAIResponse);
  const [newMessageContent, setNewMessageContent] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the latest message whenever messages update
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message || error.toString()}</div>;

  const handleSendMessage = async () => {
    if (newMessageContent.trim() === '') return;
    setSending(true);
    try {
      await sendMessageFn({ content: newMessageContent });
      setNewMessageContent('');
      await generateAIResponseFn();
    } catch (e) {
      alert('Something went wrong: ' + (e.message || e));
    } finally {
      setSending(false);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='w-full max-w-2xl bg-white rounded-lg shadow-lg p-6'>
        <div className='mb-4 max-h-96 overflow-y-auto'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-2 my-2 rounded ${
                message.isFromAI
                  ? 'bg-blue-100 text-left'
                  : 'bg-green-100 text-right'
              }`}
            >
              {message.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className='flex gap-x-2'>
          <input
            type='text'
            placeholder='Type your message...'
            className='flex-grow border rounded px-3 py-2'
            value={newMessageContent}
            onChange={(e) => setNewMessageContent(e.target.value)}
            onKeyDown={handleInputKeyDown}
            disabled={sending}
          />
          <button
            onClick={handleSendMessage}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            disabled={sending}
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

