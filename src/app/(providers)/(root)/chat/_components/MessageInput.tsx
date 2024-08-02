import React from 'react';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (msg: string) => void;
  sendMessage: (e: React.FormEvent) => void;
}

function MessageInput({ newMessage, setNewMessage, sendMessage }: MessageInputProps) {
  return (
    <form
      onSubmit={sendMessage}
      className="flex border rounded-full w-full items-center justify-between mt-5 focus-within:ring-2 focus-within:ring-primary-green-500 bg-secondary-yellow-50"
    >
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="flex-grow p-3 rounded-full focus:outline-none bg-secondary-yellow-50"
        required
      />
      <button
        type="submit"
        className="p-3 rounded-full bg-no-repeat bg-center focus:outline-none"
        style={{
          backgroundImage: `url('/icons/send.svg')`,
          backgroundSize: '20px',
          width: '40px',
          height: '40px'
        }}
      ></button>
    </form>
  );
}

export default MessageInput;
