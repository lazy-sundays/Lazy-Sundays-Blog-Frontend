import { apiTags } from "@/app/_lib/api-tags";

export const runtime = 'edge';

export async function GET(req){

    const { searchParams } = new URL(req.url)
    const page = searchParams.get('page')
    const pageSize = searchParams.get('pageSize')

    return await fetch(`${process.env.STRAPI_URI_ROOT}/api/articles?sort[0]=publishedAt:desc&fields[0]=publishedAt&fields[1]=title&fields[2]=slug&fields[3]=tagline&fields[4]=hero&fields[5]=heroAltText&fields[6]=readTime&populate[authors][fields][0]=slug&populate[authors][fields][1]=name&pagination[page]=${page}&pagination[pageSize]=${pageSize}`, 
    { 
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.STRAPI_API_KEY}`
        },
        next: {
            tags: [apiTags.listOfArticles]
        },
    })
}