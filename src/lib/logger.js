/**
 * Logger Utility
 * 
 * Clean, production-ready logging system for the Make-It-All application.
 * 
 * Features:
 * - Environment-aware (verbose in dev, minimal in production)
 * - Log levels: info, warn, error, debug, trace, action
 * - Optional metadata context
 * - Timestamps for debugging
 * - Production logs sent to /api/log endpoint
 * 
 * Usage:
 * import { logger } from '@/lib/logger';
 * 
 * logger.info('User logged in', { username: 'john' });
 * logger.error('Failed to fetch data', { status: 404 });
 * logger.trace('EmployeeDashboard', 'mounted');
 * logger.action('Task created', { taskId: 123 });
 */

const isDev = process.env.NODE_ENV !== 'production';
const isClient = typeof window !== 'undefined';

// Log levels with styling
const LogLevels = {
  DEBUG: { name: 'DEBUG', level: 0, color: '#7f8c8d' },
  INFO: { name: 'INFO', level: 1, color: '#3498db' },
  WARN: { name: 'WARN', level: 2, color: '#f39c12' },
  ERROR: { name: 'ERROR', level: 3, color: '#e74c3c' },
};

/**
 * Get formatted timestamp
 */
function getTimestamp() {
  const now = new Date();
  return now.toISOString().split('T')[1].split('.')[0]; // HH:MM:SS
}

/**
 * Format log message
 */
function formatMessage(level, message) {
  const timestamp = getTimestamp();
  return `${timestamp} [${level.name}] ${message}`;
}

/**
 * Send log to server in production
 */
async function sendLogToServer(level, message, meta) {
  if (isDev || !isClient) return; // Only send from client in production
  
  try {
    await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        level, 
        message, 
        meta, 
        ts: new Date().toISOString() 
      }),
    });
  } catch (e) {
    // Fail silently - don't break app if logging fails
  }
}

/**
 * Main logger object
 */
export const logger = {
  /**
   * Info level - General information
   */
  info: (message, meta = null) => {
    if (!isDev && !isClient) return;
    
    const formatted = formatMessage(LogLevels.INFO, message);
    if (isClient && isDev) {
      console.log(`%c${formatted}`, `color: ${LogLevels.INFO.color}; font-weight: bold;`, meta);
    }
    sendLogToServer('info', message, meta);
  },

  /**
   * Debug level - Development-only detailed information
   */
  debug: (message, meta = null) => {
    if (!isDev) return;
    
    const formatted = formatMessage(LogLevels.DEBUG, message);
    if (isClient) {
      console.debug(`%c${formatted}`, `color: ${LogLevels.DEBUG.color};`, meta);
    } else {
      console.debug(formatted, meta || '');
    }
  },

  /**
   * Warn level - Warning messages
   */
  warn: (message, meta = null) => {
    const formatted = formatMessage(LogLevels.WARN, message);
    if (isClient && isDev) {
      console.warn(`%c${formatted}`, `color: ${LogLevels.WARN.color}; font-weight: bold;`, meta);
    } else if (!isClient) {
      console.warn(formatted, meta || '');
    }
    sendLogToServer('warn', message, meta);
  },

  /**
   * Error level - Error messages
   */
  error: (message, meta = null) => {
    const formatted = formatMessage(LogLevels.ERROR, message);
    if (isClient && isDev) {
      console.error(`%c${formatted}`, `color: ${LogLevels.ERROR.color}; font-weight: bold;`, meta);
    } else if (!isClient) {
      console.error(formatted, meta || '');
    }
    sendLogToServer('error', message, meta);
  },

  /**
   * Trace - Log component lifecycle events
   */
  trace: (componentName, event = 'render', data = null) => {
    if (!isDev) return;
    
    const message = `[${componentName}] ${event}`;
    const formatted = formatMessage(LogLevels.DEBUG, message);
    if (isClient) {
      console.debug(`%c${formatted}`, `color: #95a5a6; font-style: italic;`, data);
    }
  },

  /**
   * Action - Log user interactions and business logic
   */
  action: (action, details = null) => {
    if (!isDev) return;
    
    const message = `[ACTION] ${action}`;
    const formatted = formatMessage(LogLevels.INFO, message);
    if (isClient) {
      console.log(`%c${formatted}`, `color: #27ae60; font-weight: bold;`, details);
    } else {
      console.log(formatted, details || '');
    }
  },

  /**
   * Network - Log API calls and network requests
   */
  network: (method, endpoint, status = null, error = null) => {
    if (!isDev) return;
    
    const statusStr = status ? ` [${status}]` : '';
    const message = `[API] ${method.toUpperCase()} ${endpoint}${statusStr}`;
    const formatted = formatMessage(LogLevels.INFO, message);
    const color = status >= 400 ? '#e74c3c' : '#27ae60';
    
    if (isClient) {
      console.log(`%c${formatted}`, `color: ${color}; font-weight: bold;`, error);
    } else {
      console.log(formatted, error || '');
    }
  },
};

// Legacy exports for backward compatibility
export async function logInfo(message, meta = {}) {
  logger.info(message, meta);
}

export async function logWarn(message, meta = {}) {
  logger.warn(message, meta);
}

export async function logError(message, meta = {}) {
  logger.error(message, meta);
}
