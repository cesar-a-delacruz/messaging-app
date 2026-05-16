import { useEffect, useState } from "react";
import styles from "./styles/Loader.module.css";

export default function Loader({ text }) {
  const [message, setMessage] = useState(text);

  useEffect(() => {
    setMessage(text);
  }, [text]);

  return <div className={styles.loader}>{message}</div>;
}
