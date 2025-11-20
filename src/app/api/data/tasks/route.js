import tasks from '@/data/tasks.json';

/**
 * GET /api/data/tasks
 * Returns all tasks data
 */
export async function GET() {
  try {
    return Response.json({
      success: true,
      data: tasks,
      count: tasks.length
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

