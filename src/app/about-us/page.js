import ListOfContributors from "../_components/about-us/list-of-contributors";

export default async function AboutUs() {
    async function getBlurb() {
        const res = await fetch(
            process.env.STRAPI_URI_ROOT+"/api/about-us?fields[0]=aboutUs", 
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer "+process.env.STRAPI_API_KEY,
                },
            }
        );
        
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error(`Failed to fetch blurb data. HTTP status code: ${res.status}`);
        }
        return res.json();
    }
    async function getContacts() {
        const res = await fetch(
            process.env.STRAPI_URI_ROOT+"/api/contact-us?fields[0]=contactInfo&populate[contactInfo][fields][0]=infoName&populate[contactInfo][fields][1]=info", 
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer "+process.env.STRAPI_API_KEY,
                },
            }
        );
        
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error(`Failed to fetch contact info data. HTTP status code: ${res.status}`);
        }
        return res.json();
    }
    

    const blurb = (await getBlurb()).data.attributes.aboutUs;
    const contacts = (await getContacts()).data.attributes.contactInfo.data;

    return (
        <div id="pg-content" className="flex flex-wrap gap-y-10">
            <section className="grow md:max-w-[75%]">
                <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
                    About Us
                </h1>
                <p className="mx-2 sm:mx-8 max-w-3xl">
                    {/* TODO: update placeholder with better placeholder */}
                    {blurb}
                </p>
            </section>
            <aside className="w-auto max-w-full md:max-w-[25%]">
                <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
                    Contact Us
                </h1>
                <ul className="mx-2 sm:mx-8">
                    {/* TODO: update placeholder with better placeholder */}
                    {
                        contacts.map((contact) => 
                            <li className="mb-3 break-words">
                                {contact.attributes.infoName}: 
                                <a href={(contact.attributes.infoName.trim().toLowerCase() === "email" ? "mailto:" : "") + contact.attributes.info} className="mx-2 italic hover:underline hover:decoration-accentprimary hover:decoration-2">
                                    {contact.attributes.info}
                                </a>
                            </li>
                        )
                    }
                </ul>
            </aside>
            
            <ListOfContributors apiKey={process.env.STRAPI_API_KEY} rootURI={process.env.STRAPI_URI_ROOT}/>
        </div>
    );
}