import posts from '@/data/posts.json';

/**
 * GET /api/data/posts
 * Returns all posts data
 */
export async function GET() {
  try {
    return Response.json({
      success: true,
      data: posts,
      count: posts.length
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
