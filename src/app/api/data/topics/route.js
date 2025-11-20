import topics from '@/data/topics.json';

/**
 * GET /api/data/topics
 * Returns all topics data
 */
export async function GET() {
  try {
    return Response.json({
      success: true,
      data: topics,
      count: topics.length
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
