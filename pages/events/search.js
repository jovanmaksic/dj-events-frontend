import qs from "qs";
import Layout from "@/components/Layout";
import Link from "next/link";
import EventItem from "@/components/EventItem";
import { useRouter } from "next/router";

export default function EventsPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <h1>search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events!</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL +
      "/api/events?filters[name][$contains]=" +
      term +
      "&[populate]=image"
  );
  const { data } = await res.json();
  console.log(data);

  return {
    props: { events: data },
  };
}
