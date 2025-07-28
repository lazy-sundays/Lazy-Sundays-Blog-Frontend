import ListOfContributors from "../_components/about-us/list-of-contributors";
import LinkButton from "@/app/_components/common/link-button";
import getDomainIcon from "../_lib/get-domain-icon";
import { apiTags } from "../_lib/api-tags";

export const metadata = {
  title: "About Us",
  description: `Learn all about how we do things on the lazy sundays blog`,
};

export default async function AboutUs() {
  async function getBlurb() {
    const res = await fetch(
      process.env.STRAPI_URI_ROOT + "/api/about-us?fields=aboutUs",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.STRAPI_API_KEY,
        },
        next: {
          tags: [apiTags.aboutUs],
        },
      }
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error(
        `Failed to fetch blurb data. HTTP status code: ${res.status}`
      );
    }
    return res.json();
  }
  async function getContacts() {
    const res = await fetch(
      process.env.STRAPI_URI_ROOT + "/api/contact-us?populate=contactInfo",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.STRAPI_API_KEY,
        },
        next: {
          tags: [apiTags.contactInfo, apiTags.contactUs],
        },
      }
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error(
        `Failed to fetch contact info data. HTTP status code: ${res.status}`
      );
    }
    return res.json();
  }

  const blurb = (await getBlurb()).data.aboutUs;
  const contacts = (await getContacts()).data.contactInfo;

  return (
    <div
      id="pg-content"
      className="flex flex-wrap place-content-between gap-y-10"
    >
      <section className="flex flex-col w-full md:w-auto md:pr-8">
        <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
          About Us
        </h1>
        <p className="max-w-3xl lg:text-lg font-sans">
          {/* TODO: update placeholder with better placeholder */}
          {blurb}
        </p>
      </section>
      <aside className="w-full md:w-fit xl:max-w-[32rem] grow">
        <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
          Contact Us
        </h1>
        <ul className="flex flex-col mx-auto md:max-w-none">
          {/* TODO: update placeholder with better placeholder */}
          {contacts.map((contact, i) => (
            <LinkButton
              key={i}
              as="li"
              className="w-full mb-3"
              ariaLabel={`go to ${contact.infoName}`}
              href={contact.info}
            >
              {getDomainIcon(contact.info)} {contact.infoName}
            </LinkButton>
          ))}
        </ul>
      </aside>

      <ListOfContributors />
    </div>
  );
}
