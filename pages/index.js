import Layout from "@/components/Layout";
import Link from "next/link";
import EventItem from "@/components/EventItem";

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events!</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
      {events.length > 0 && (
        <center>
          <Link href="/events" className="btn-secondary">
            View All events
          </Link>
        </center>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL +
      "/api/events?populate=image&sort=date:ASC&pagination[pageSize]=3"
  );
  const { data } = await res.json();
  return {
    props: { events: data },
    revalidate: 1,
  };
}
