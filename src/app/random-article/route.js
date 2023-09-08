import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(request) { // eslint-disable-line
    
    const res = await fetch(process.env.STRAPI_URI_ROOT+"/api/random-article", 
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+process.env.STRAPI_API_KEY,
            },
            cache: "no-store"
        }
    )
    const data = await res.json();
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch random article data. HTTP status code: ${res.status}`);
    }

    redirect("/articles/"+data.slug);
}