import React from "react";
import styles from "./Navbar.module.css";
import { useHistory } from "react-router-dom";
import logo from "../../Assets/logo-2.png";
import logo1 from "../../Assets/logo-1.jpg";

export default function Navbar() {
  const history = useHistory();
  return (
    <div className={styles.Container}>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div className={styles.logo} onClick={() => history.push("/")}>Logo</div>
        <img src={logo} className={styles.CollegeLogo}/>
        <img src={logo1} className={styles.CollegeLogo}/>
      </div>
      <div className={styles.linksContainer}>
        <div className={styles.links} onClick={() => history.push("/about")}>
          About
        </div>
      </div>
    </div>
  );
}
