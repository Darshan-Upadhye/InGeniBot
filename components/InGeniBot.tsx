'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from './InGeniBot.module.css';
import botIcon from '/public/chatbot.svg';
import userIcon from '/public/User 01.svg';
import Image from 'next/image';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  showCheck?: boolean;
}

interface InGeniBotProps {
  startBot?: boolean;
}

export default function InGeniBot({ startBot = false }: InGeniBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

const hasWelcomedRef = useRef(false);

useEffect(() => {
  if (!startBot || hasWelcomedRef.current) return;

  hasWelcomedRef.current = true;

  const welcome1: Message = { text: "Hi, I'm InGeniBot.", sender: 'bot' };
  const welcome2: Message = { text: 'How can I help you today?', sender: 'bot' };

  setTimeout(() => {
    setMessages((prev) => [...prev, welcome1]);
  }, 300);

  setTimeout(() => {
    setMessages((prev) => [...prev, welcome2]);
  }, 1600); 

}, [startBot]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user', showCheck: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await axios.post('/api/chat', { message: input });
      const botReply: Message = { text: res.data.reply, sender: 'bot' };

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, botReply]);
      }, 1000);
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, something went wrong.', sender: 'bot' },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <div>InGeniBot</div>
        <div className={styles.status}>Online</div>
      </div>

      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.messageWrapper} ${
              msg.sender === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper
            }`}
          >
            {msg.sender === 'bot' && (
              <Image src={botIcon} alt="Bot" className={styles.avatar} />
            )}
            <div
              className={`${styles.message} ${
                msg.sender === 'user' ? styles.userMessage : styles.botMessage
              }`}
            >
              {msg.text}
      
            </div>
            {msg.sender === 'user' && (
              <Image src={userIcon} alt="User" className={styles.avatar} />
            )}
          </div>
        ))}

        {isTyping && (
          <div className={`${styles.messageWrapper} ${styles.botMessageWrapper}`}>
            <Image src={botIcon} alt="Bot" className={styles.avatar} />
            <div className={`${styles.message} ${styles.botMessage}`}>
              <div className={styles.typing}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.input}
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend} className={styles.sendButton}>
          ➤
        </button>
      </div>
    </div>
  );
}