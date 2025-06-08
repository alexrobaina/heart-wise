// src/hooks/useChatWithAI.ts
import { useState } from 'react';

export type ChatMessage = {
  role: 'user' | 'ai';
  content: string;
};

export function useChatWithAI(initialMessages: ChatMessage[] = []) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: userMessage.content }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      const aiMessage = { role: 'ai' as const, content: data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'ai', content: 'Ocurrió un error con el modelo de IA.' }]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    loading,
    sendMessage,
  };
}