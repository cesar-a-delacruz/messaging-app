import { useRef } from "react";
import Dialog from "./Dialog";

export default function Image({ src, alt }) {
  const previewDialog = useRef(null);
  return (
    <div>
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
