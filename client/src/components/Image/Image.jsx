import styles from "./Image.module.css";
import { useRef } from "react";
import Dialog from "../Dialog/Dialog";

export default function Image({ src, alt }) {
  const previewDialog = useRef(null);

  return (
    <div className={styles.image}>
      <img
        src={src}
        alt={alt}
        onClick={() => previewDialog.current.showModal()}
      />
      <Dialog ref={previewDialog}>
        <img src={src} alt={alt} />
      </Dialog>
    </div>
  );
}
