import Link from "next/link";
import styles from "../styles/Footer.module.css";

export default function footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ Jovan 2023</p>
      <p>
        <Link href="/about">About This Project</Link>
      </p>
    </footer>
  );
}
