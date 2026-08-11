import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Input, Button, InputContainer } from "../Form/Form";

const { VITE_ENV, VITE_API_PORT, VITE_WS_URL } = import.meta.env;
const WS_PROTOCOL = window.location.protocol === "https:" ? "wss" : "ws";
const WS_HOST =
  VITE_ENV === "production"
    ? window.location.host
    : `localhost:${VITE_API_PORT || "3000"}`;
const wsUri = VITE_WS_URL || `${WS_PROTOCOL}://${WS_HOST}/ws`;


console.log("wsUri: " + wsUri);
type chatMsgsType = { 
  message: string;
  id: string;
  sender: string; 
};

const ChatGuest: React.FC = () => {
  const [message, setMessage] = useState("");
  const [chatMsgs, setChatMsgs] = useState<chatMsgsType[]>([]);
  //const wsUrl = encodeURI(wsUri);
  const { room, guestName } = useParams();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const inviteLink = `${location.host}/join-guest-chat/${room}`;
  const reconnectInterval = 5000; // 5 seconds


  const connect = useCallback(() => {
    const socketUrl = encodeURI(`${wsUri}?guestName=${guestName}&room=${room}`);
    console.log(socketUrl);
    setSocket(() => new WebSocket(socketUrl));
  }, [guestName, room]);

     useEffect(() => {
       connect();  
     }, [connect]);


    useEffect(() => {
      if(socket){
       
        console.log("socket: " + socket);


        socket.onopen = () => {
          console.log('Connected to WebSocket');
        };

        socket.onclose = (event) => {
          console.log('Socket closed. Attempting reconnect...', event.reason);
          setTimeout(connect, reconnectInterval);
        };
        socket?.addEventListener("message", (event: { data: string }) => {
          const msg = JSON.parse(event.data);

          setChatMsgs((prev) => [...prev, msg]);
        });
      
      socket.onerror = (error) => {
        console.error('Socket error:', error);
        socket?.close();
      };
      console.log(socket);

    }
  }, [socket, connect]);
  
const sendMessage = () => {

  console.log("ready stage" + socket?.readyState);
  if (socket?.readyState === WebSocket.OPEN) {
      console.log("socket open and sending message: " + message);
      message && socket?.send(JSON.stringify({ message, guestName, room }));
      setMessage("");  
    }     
  };

  return (
      <div className="chat__container  w-3/5">
        Hey {guestName}!
        <InputContainer className="">
          <p>Press </p>
          <Button
            className="w-400"
            text=" copy link "
            onClick={() => {
              navigator.clipboard.writeText(inviteLink);
            }}
          />
          <p> and send it to Your Friends!</p>
        </InputContainer>
        <ul className="flex flex-col w-full h-96 overflow-hidden bg-slate-200  mt-10 p-4 justify-end items-end">
          {chatMsgs.map(({ message, id, sender }) => (
            <li
              key={id}
              className={`${
                (sender != guestName && "self-start bg-yellow-500") ||
                "bg-sky-300"
              }  max-w-80 border-r-4 border-b-4 border-l-2 border-t-2 border-black rounded-xl text-xl p-2 my-1`}
            >
              <div className="text-xs .ease-linear duration-75">{sender}</div>
              <div>{message}</div>
            </li>
          ))}
        </ul>
        <InputContainer>
          <Input value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button className="mr-0" text="Send" onClick={sendMessage} />
        </InputContainer>
      </div>
    );
};

export default ChatGuest;
