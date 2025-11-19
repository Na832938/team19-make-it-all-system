// Lightweight client logger: posts logs to /api/log in production
export async function logInfo(message, meta = {}) {
  return sendLog('info', message, meta);
}

export async function logWarn(message, meta = {}) {
  return sendLog('warn', message, meta);
}

export async function logError(message, meta = {}) {
  return sendLog('error', message, meta);
}

async function sendLog(level, message, meta) {
  try {
    if (process.env.NODE_ENV !== 'production') {
      // In dev, use console for fast feedback
      // eslint-disable-next-line no-console
      console[level === 'error' ? 'error' : level](message, meta);
      return { ok: true, dev: true };
    }

    const res = await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, message, meta, ts: Date.now() }),
    });
    return res.ok ? { ok: true } : { ok: false, status: res.status };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('log send failed', e);
    return { ok: false, error: e?.message };
  }
}
