import React from "react";
import styles from "./Navbar.module.css";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  const history = useHistory();
  return (
    <div className={styles.Container}>
      <div className={styles.logo} onClick={() => history.push("/")}>
        Merobot
      </div>
      <div className={styles.linksContainer}>
        <div className={styles.links} onClick={() => history.push("/about")}>
          About
        </div>
      </div>
    </div>
  );
}
