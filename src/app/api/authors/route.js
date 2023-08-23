export const runtime = 'edge';

export async function GET(req){

    const { searchParams } = new URL(req.url)
    const page = searchParams.get('page')

    return await fetch(`${process.env.STRAPI_URI_ROOT}/api/authors?pagination[page]=${(page)}&pagination[pageSize]=2`, 
    { method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.STRAPI_API_KEY}`
        } 
    })
}