import { useEffect, useState, useRef } from 'react';

type ChatMsg = { id?: number; userName: string; content: string; createdAt: string };

export default function ClassroomChat({ roomId, token }: { roomId: string; token: string }) {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const ws = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const connectedRef = useRef(false);
  
  // Load history
  useEffect(() => {
    if (!roomId || !token) return;
    (async () => {
      try {
        const res = await fetch(`http://localhost:3002/api/classroom/${encodeURIComponent(roomId)}/messages`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch {}
    })();
  }, [roomId, token]);

  // Open ws once (avoid StrictMode double connect)
  useEffect(() => {
    if (!roomId || !token || connectedRef.current) return;
    connectedRef.current = true;

    const origin = import.meta.env.VITE_BACKEND_ORIGIN ?? window.location.origin;

    const wsOrigin = window.location.origin.replace(/^http/, 'ws');
    const url = `${wsOrigin}/api/chat?room=${encodeURIComponent(roomId)}&token=${encodeURIComponent(token)}`;
    ws.current = new WebSocket(url);


    const sock = new WebSocket(url);
    ws.current = sock;

    sock.onopen = () => console.log('WS open');
    sock.onerror = (e) => console.warn('WS error', e);
    sock.onclose = (e) => console.warn('WS closed', e.code, e.reason);

    sock.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'chat' && msg.payload) {
          const p = msg.payload;
          setMessages(prev => [...prev, {
            id: p.id,
            userName: p.userName,
            content: p.content,
            createdAt: p.createdAt || new Date().toISOString()
          }]);
        }
      } catch {}
    };

    return () => {
      sock.close();
      ws.current = null;
    };
  }, [roomId, token]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const sock = ws.current;
    if (!sock || sock.readyState !== WebSocket.OPEN) return;
    const content = input.trim();
    if (!content) return;
    sock.send(JSON.stringify({ content }));
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded shadow p-4">
      <div className="flex-grow overflow-auto space-y-2 rounded border p-2">
        {messages.map((m) => (
          <div key={m.id ?? `${m.createdAt}-${m.userName}`}>
            <strong>{m.userName}</strong>: {m.content}
            <span className="text-xs text-gray-400 ml-2">
              {new Date(m.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex mt-2 gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type message..."
          onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
          className="flex-grow border rounded px-2 py-1"
        />
        <button onClick={sendMessage} className="px-4 py-1 bg-blue-600 text-white rounded">Send</button>
      </div>
    </div>
  );
}
