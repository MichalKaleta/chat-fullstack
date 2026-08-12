import { useEffect, useState, FC } from "react";
import { Input, Button,  } from "../Form/Form";

const { VITE_ENV, VITE_API_PORT, VITE_WS_URL } = import.meta.env;
const WS_PROTOCOL = window.location.protocol === "https:" ? "wss" : "ws";
const WS_HOST =
  VITE_ENV === "production"
    ? window.location.host
    : `localhost:${VITE_API_PORT || "3000"}`;
const wsUri = VITE_WS_URL || `${WS_PROTOCOL}://${WS_HOST}/ws`;

type chatMsgsType = {
  message: string;
  id: string;
  sender: string;
};

const Chat: FC<{ login: string }> = ({ login = "" }) => {
  const [message, setMessage] = useState("");
  const [chatMsgs, setChatMsgs] = useState<chatMsgsType[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const wsUrl = encodeURI(`${wsUri}?user=${login}&room=global`);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);
    setSocket(ws);
    return () => {
      ws.close();
    };
  }, [wsUrl]);

  useEffect(() => {
    if (!socket) return;

    const onMessage = (event: { data: string }) => {
      setChatMsgs((prev) => [...prev, JSON.parse(event.data)]);
      setMessage("");
    };

    const onOpen = () => {
      console.log("Connected to WebSocket");
    };

    socket.addEventListener("message", onMessage);
    socket.addEventListener("open", onOpen);

    return () => {
      socket.removeEventListener("message", onMessage);
      socket.removeEventListener("open", onOpen);
    };
  }, [socket]);

  const sendMessage = () => {
    socket?.send(JSON.stringify({ message, login }));
    //socket?.send(message);
  };

  return (
    <div className=" chat__container flex flex-col  justify-center">
      "Witaj na czacie {login}"
      <ul className="flex flex-col w-full h-96 overflow-hidden bg-slate-200  mt-10 p-4 justify-end w-400 items-end">
        {chatMsgs.map(({ message, id, sender }) => (
          <li
            className={
              sender != login
                ? "self-start bg-yellow-500"
                : "bg-sky-300" +
                  ` max-w-80 border-r-4 border-b-4 border-l-2 border-t-2 border-black rounded-xl text-xl p-2 my-1`
            }
            key={id}
          >
            <div className="text-xs .ease-linear  duration-75">{sender}</div>
            <div>{message}</div>
          </li>
        ))}
      </ul>

        <Input value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button
          className="mr-0"
          text="Send"
          onClick={() => message && sendMessage()}
        />
    
    </div>
  );
};
export default Chat;
