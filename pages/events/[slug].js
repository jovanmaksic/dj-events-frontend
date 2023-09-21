import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";

export default function EventPage({ evt }) {
  console.log(evt);

  const deleteEvent = (e) => {
    console.log("delete");
  };
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link className={styles.back} href={`/events/edit/${evt.id}`}>
            {"<"} Edit event
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes />
            Delete Event
          </a>
        </div>

        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image alt={evt.name} src={evt.image} width={960} height={640} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

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
    process.env.NEXT_PUBLIC_BASE_URL + "/api/events?filters[slug][$eq]=" + slug
  );
  const event = await res.json();
  console.log(event);

  return {
    props: {
      evt: event.data[0].attributes,
    },
    revalidate: 1,
  };
}
