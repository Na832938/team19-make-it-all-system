import projects from '@/data/projects.json';

/**
 * GET /api/data/projects
 * Returns all projects data for managers
 */
export async function GET() {
  try {
    return Response.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
