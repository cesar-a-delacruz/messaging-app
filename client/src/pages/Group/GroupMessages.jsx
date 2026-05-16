import { useEffect } from "react";
import useGet from "@/hooks/useGet";
import Loader from "@/components/Loader";

export default function GroupMessages() {
  const [messages, setMessages] = useGet("message");

  useEffect(() => {
    setTimeout(() => setMessages({ data: "data" }), 2000);
  }, []);

  if (!messages.data)
    return (
      <Loader text={!messages.error ? "Getting messages..." : messages.error} />
    );

  return (
    <div className="page">
      <h2>Group messages</h2>
      {messages.data}
    </div>
  );
}
