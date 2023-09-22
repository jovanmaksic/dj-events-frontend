import Link from "next/link";
import { useContext } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/Header.module.css";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">DJ events</Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>
          {user ? (
            //if logged in
            <>
              <li>
                <Link href="/events/add">Add Event</Link>
              </li>
              <li>
                <Link href="/account/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link
                  onClick={() => logout()}
                  href="/account/login"
                  className="btn-secondary btn-icon">
                  <FaSignOutAlt /> Logout
                </Link>
              </li>
            </>
          ) : (
            //if logged out
            <>
              <li>
                <Link href="/account/login" className="btn-secondary btn-icon">
                  <FaSignInAlt /> Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
