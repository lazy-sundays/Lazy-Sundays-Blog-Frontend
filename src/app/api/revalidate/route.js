import { NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'


export const fetchCache = "force-no-store";
export const runtime="edge"

export async function POST(request) {

    const secret = request.nextUrl.searchParams.get('secret');

    if (secret !== process.env.STRAPI_WEBHOOK_SECRET) {
        return new NextResponse('Invalid secret', { status: 401 });
    }

    const body = await request.json();
    console.log(body.event)
    console.log(body.model);

    return new NextResponse(null, { status: 200 });
    
}