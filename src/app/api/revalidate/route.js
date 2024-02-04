import { NextResponse } from 'next/server'
import { revalidateTag} from 'next/cache'
import {apiTags}  from '@/app/_lib/api-tags';

export const runtime="edge"

export async function POST(request) {

    const re = new RegExp("^(?<bearer>Bearer\\s)(?<token>[a-zA-Z0-9-_=]+)$", "g");
    const authHeader = (request.headers.get("authorization"));

    //verify authorization header exists
    if (!authHeader) {
        return new NextResponse('No authorization header found', { status: 401 });
    }

    //ensure that the header is in correct format
    const found = re.exec(authHeader);
    if (found === null){
        return new NextResponse('Invalid authorization type', { status: 401 });
    }

    //verify the secret matches
    if (found.groups.token != process.env.STRAPI_WEBHOOK_SECRET){
        return new NextResponse('Invalid secret', { status: 401 });
    }

    const body = await request.json();
    
    //revalidate based on the type of model that was updated
    switch(body.model){
        case (apiTags.article):
            revalidateTag(apiTags.article + body.entry.slug);
            revalidateTag(apiTags.numContrib);
            revalidateTag(apiTags.mostRecentArticles);
            revalidateTag(apiTags.listOfArticles);
            break;
        case(apiTags.author):
            revalidateTag(apiTags.author + body.entry.slug);
            revalidateTag(apiTags.listOfContr);
            break;
        case(apiTags.contactInfo):
            revalidateTag(apiTags.contactInfo);
            break;  
        case(apiTags.linkTree):
            // update not needed because link tree is part of author API call
            break;
        case(apiTags.tag):
            break;
        case(apiTags.aboutUs):
            revalidateTag(apiTags.aboutUs);
            break;
        case(apiTags.contactUs):
            revalidateTag(apiTags.contactUs);
            break;
        case(apiTags.featuredArticle):
            revalidateTag(apiTags.featuredArticle);
            break;
        default:
            return new NextResponse(null, { status: 200 });
    }

    return new NextResponse(null, { status: 200 });
    
}