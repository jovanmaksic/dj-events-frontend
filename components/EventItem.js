import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

export default function EventItem({ evt }) {
  console.log(evt.slug);

  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt.image.data !== null
              ? evt.image.data.attributes.formats.thumbnail.url
              : "/images/event-default.png"
          }
          width={170}
          height={100}
          alt={evt.name ? evt.name : "none"}
        />
      </div>

      <div className={styles.info}>
        <span>
          {evt.date} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>

      <div className={styles.link}>
        <Link className="btn" href={`/events/${evt.slug}`}>
          Details
        </Link>
      </div>
    </div>
  );
}
