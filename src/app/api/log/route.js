export async function POST(req) {
  try {
    const body = await req.json();
    const { level = 'info', message = '', meta = {}, ts } = body || {};
    const line = `[client:${level}] ${new Date(ts || Date.now()).toISOString()} ${message}`;
    if (level === 'error') console.error(line, meta);
    else if (level === 'warn') console.warn(line, meta);
    else console.log(line, meta);
    return Response.json({ ok: true });
  } catch (e) {
    console.error('[client:log:parse-error]', e?.message);
    return new Response(JSON.stringify({ ok: false, error: 'invalid-json' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
