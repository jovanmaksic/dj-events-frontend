import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";
import { useRouter } from "next/router";

export default function EventPage({ evt }) {
  const router = useRouter();
  console.log("zika", evt.id);

  const deleteEvent = async (e) => {
    if (confirm("Are You sure?")) {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/events/" + evt.id,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };

  console.log(evt);

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link className={styles.back} href={`/events/edit/${evt.id}`}>
            <FaPencilAlt /> Edit event
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes />
            Delete Event
          </a>
        </div>

        <span>
          {evt.attributes.date} at {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        {evt.attributes.image && (
          <div className={styles.image}>
            <Image
              alt={
                evt.attributes.image.data !== null
                  ? evt.attributes.image.data.attributes.name
                  : "none"
              }
              src={
                evt.attributes.image.data !== null
                  ? evt.attributes.image.data.attributes.formats.medium.url
                  : "/images/event-default.png"
              }
              width={960}
              height={640}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description:</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.attributes.address}</p>

        <Link href="/events" className={styles.back}>
          {"<"} Go Back
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL +
      "/api/events?populate=image&sort=date:ASC"
  );
  const data = await res.json();

  const events = data.data;

  const paths = events.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL +
      "/api/events?filters[slug][$eq]=" +
      slug +
      "&[populate]=image"
  );
  const event = await res.json();
  console.log("marko", event.data[0]);

  return {
    props: {
      evt: event.data[0],
    },
    revalidate: 1,
  };
}
