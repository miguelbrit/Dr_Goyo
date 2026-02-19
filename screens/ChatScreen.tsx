import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, ArrowLeft, MoreVertical, Phone } from 'lucide-react';
import { ChatMessage, Message } from '../components/ChatMessage';
import { Avatar } from '../components/Avatar';
import { getGeminiResponse } from '../services/gemini';

interface ChatScreenProps {
  initialMessage?: string;
  onBack: () => void;
  onViewDoctorList: (specialty?: string) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ initialMessage, onBack, onViewDoctorList }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting or handling initial message
  useEffect(() => {
    if (initialMessage) {
      handleInitialMessage(initialMessage);
    } else {
      // Default greeting
      setMessages([
        {
          id: 'welcome',
          text: 'Hola, soy Dr. Goyo (IA). \n\nEstoy aquí para orientarte sobre tus síntomas o dudas de salud. Recuerda que mi ayuda es informativa y no sustituye una consulta médica profesional.\n\n¿En qué puedo ayudarte hoy?',
          sender: 'ai',
          timestamp: new Date(),
          type: 'text'
        }
      ]);
    }
  }, []);

  const handleInitialMessage = async (text: string) => {
    addMessage(text, 'user');
    await callGemini(text);
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addMessage = (text: string, sender: 'user' | 'ai', type: 'text' | 'action' | 'doctor-list' = 'text', extraData: any = {}) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type,
      ...extraData
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText('');
    addMessage(text, 'user');
    await callGemini(text);
  };

  const callGemini = async (userText: string) => {
    setIsTyping(true);
    
    // Prepare history for Gemini
    const history = messages.map(msg => ({
      role: msg.sender === 'user' ? "user" as const : "model" as const,
      parts: [{ text: msg.text }]
    }));

    const response = await getGeminiResponse(userText, history);
    
    setIsTyping(false);
    
    // Parse specialty tag if present
    let finalMessage = response;
    let detectedSpecialty = "";
    
    const specialtyMatch = response.match(/\[ESPECIALIDAD:(.*?)\]/);
    if (specialtyMatch) {
      detectedSpecialty = specialtyMatch[1].trim();
      finalMessage = response.replace(/\[ESPECIALIDAD:.*?\]/g, "").trim();
    }

    if (detectedSpecialty) {
      addMessage(
        finalMessage,
        'ai',
        'action',
        {
          actionLabel: `Ver ${detectedSpecialty}s recomendados`,
          onAction: () => onViewDoctorList(detectedSpecialty)
        }
      );
    } else {
      addMessage(finalMessage, 'ai');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-3 shadow-sm border-b border-gray-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
            <ArrowLeft size={22} />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar src="" alt="Dr. Goyo" size="md" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h1 className="font-heading font-bold text-gray-800 text-lg">Dr. Goyo</h1>
              <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">Asistente IA</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><Phone size={20} /></button>
           <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><MoreVertical size={20} /></button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-bg">
        <p className="text-center text-xs text-gray-400 my-4">
           La IA puede cometer errores. Verifica la información importante.
        </p>
        
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        
        {isTyping && (
          <div className="flex justify-start w-full mb-4">
             <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center shadow-sm">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white p-4 border-t border-gray-100 sticky bottom-0 z-20 pb-safe">
        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all shadow-sm">
          <button className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-gray-200 rounded-full">
            <Mic size={20} />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tus síntomas..."
            className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 placeholder:text-gray-400 py-1"
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`
              p-2 rounded-xl transition-all shadow-md
              ${inputText.trim() 
                ? 'bg-primary text-white hover:scale-105 hover:bg-teal-600' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};