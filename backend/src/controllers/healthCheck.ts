import { Request, Response } from 'express';
import mongoose from 'mongoose';
import os from 'os';
import { ErrorResponse } from '../utils/errorResponse';

// Get memory usage in MB
const getMemoryUsage = () => {
  const memory = process.memoryUsage();
  const format = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  
  return {
    rss: format(memory.rss), // Resident set size
    heapTotal: format(memory.heapTotal),
    heapUsed: format(memory.heapUsed),
    external: format(memory.external as number)
  };
};

// Get uptime in readable format
const getUptime = () => {
  const uptime = process.uptime();
  const days = Math.floor(uptime / (60 * 60 * 24));
  const hours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((uptime % (60 * 60)) / 60);
  const seconds = Math.floor(uptime % 60);
  
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

// Health check controller
export const healthCheck = async (_req: Request, res: Response) => {
  try {
    // Check database connection
    const dbState = mongoose.connection.readyState;
    const dbStatus = dbState === 1 ? 'connected' : 'disconnected';
    
    // Get system info
    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      memory: getMemoryUsage(),
      uptime: getUptime(),
      cpu: {
        cores: os.cpus().length,
        load: os.loadavg(),
        uptime: os.uptime()
      },
      environment: process.env.NODE_ENV || 'development'
    };
    
    // Prepare response
    const healthCheck = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: {
        status: dbStatus,
        connection: mongoose.connection.host,
        name: mongoose.connection.name,
        models: Object.keys(mongoose.connection.models)
      },
      system: systemInfo
    };
    
    res.status(200).json(healthCheck);
  } catch (error) {
    console.error('Health check failed:', error);
    throw new ErrorResponse('Health check failed', 503);
  }
};

// Simple ping endpoint
export const ping = (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'pong',
    timestamp: new Date().toISOString()
  });
};
