import ListOfContributors from "../_components/about-us/list-of-contributors";
import LinkButton from "@/app/_components/common/link-button";

export const metadata = {
    title: 'About Us',
    description: `Learn all about how we do things on the lazy sundays blog`
};
    
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
                <p className="max-w-3xl lg:text-lg font-sans">
                    {/* TODO: update placeholder with better placeholder */}
                    {blurb}
                </p>
            </section>
            <aside className="w-full md:max-w-[25%]">
                <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
                    Contact Us
                </h1>
                <ul className="flex flex-col">
                    {/* TODO: update placeholder with better placeholder */}
                    {
                        contacts.map((contact, i) => 
                            <LinkButton 
                                key={i}
                                as="li"
                                className="w-full mb-3"
                                ariaLabel={`go to ${contact.attributes.infoName}`}
                                href={((contact.attributes.infoName.toLowerCase().replace("-", "")) === "email" ? "mailto:" : "") + contact.attributes.info}
                            >
                                {contact.attributes.infoName}
                            </LinkButton>
                        )
                    }
                </ul>
            </aside>
            
            <ListOfContributors />
        </div>
    );
}