import Layout from "@/components/Layout";
import Link from "next/link";
import EventItem from "@/components/EventItem";

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events!</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL +
      "/api/events?populate=image&sort=date:ASC"
  );
  const { data } = await res.json();
  return {
    props: { events: data },
    revalidate: 1,
  };
}
