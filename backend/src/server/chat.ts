// src/server/chat.ts
import { PrismaClient } from '@prisma/client';
import { WebSocketServer, WebSocket } from 'ws';
import jwt from 'jsonwebtoken';
import type { Express } from 'express';
import type { Server } from 'http';

const prisma = new PrismaClient();

type UserToken = {
  id: number | string;
  name?: string;
  // add other claims if your JWT includes them
};

export default function attachChat(app: Express, server: Server) {
  // history REST
  app.get('/api/classroom/:classroomId/messages', async (req, res) => {
    try {
      const messages = await prisma.chatMessage.findMany({
        where: { classroomId: req.params.classroomId },
        orderBy: { createdAt: 'asc' }
      });
      res.json(messages);
    } catch (e) {
      res.status(500).json({ error: 'Failed to load messages' });
    }
  });

  // ws
  const wss = new WebSocketServer({ server, path: '/api/chat' });
  const rooms = new Map<string, Set<WebSocket>>();

  function verify(token?: string): UserToken | null {
    try {
      if (!token) return null;
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      // If your token is string or unknown, coerce to expected shape
      if (typeof decoded === 'object' && decoded && 'id' in decoded) {
        const u = decoded as any;
        return { id: u.id as number | string, name: u.name as string | undefined };
      }
      return null;
    } catch {
      return null;
    }
  }

  wss.on('connection', (ws: WebSocket, req) => {
    // req.url can be like "/api/chat?room=class-1&token=abc"
    const rawUrl = req.url || '';
    const queryString = rawUrl.includes('?') ? rawUrl.substring(rawUrl.indexOf('?') + 1) : '';
    const params = new URLSearchParams(queryString);

    const roomId = params.get('room') || '';
    const token = params.get('token') || '';
    const user = verify(token);

    if (!roomId || !user) {
      ws.close(1008, 'Unauthorized');
      return;
    }

    if (!rooms.has(roomId)) rooms.set(roomId, new Set());
    rooms.get(roomId)!.add(ws);

    ws.on('message', async (raw) => {
      try {
        const parsed = JSON.parse(raw.toString());
        const content = typeof parsed?.content === 'string' ? parsed.content.trim() : '';
        if (!content) return;

        const saved = await prisma.chatMessage.create({
          data: {
            classroomId: roomId,
            userId: Number(user.id) || 0,
            userName: String(user.name || 'User'),
            content
          }
        });

        const msg = { type: 'chat', payload: saved };
        const room = rooms.get(roomId);
        if (!room) return;

        for (const client of room) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(msg));
          }
        }
      } catch {
        // swallow malformed message errors
      }
    });

    ws.on('close', () => {
      const room = rooms.get(roomId);
      if (!room) return;
      room.delete(ws);
      if (room.size === 0) rooms.delete(roomId);
    });

    ws.on('error', () => {
      // Optional: handle socket-level errors
    });
  });
}
