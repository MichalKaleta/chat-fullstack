import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Input, Button, InputContainer } from "../Form/Form";

//const wsUri = `ws://${window.location.hostname}:1337`;
const wsUri = `wss://${window.location.hostname}/ws`;
console.log("wsUri: " + wsUri);
type chatMsgsType = { 
  message: string;
  id: string;
  sender: string; 
};

const ChatGuest = () => {
  const [message, setMessage] = useState("");
  const [chatMsgs, setChatMsgs] = useState<chatMsgsType[]>([]);
  //const wsUrl = encodeURI(wsUri);
  const { room, guestName } = useParams();
  const [socket, setSocket] = useState<WebSocket | null>();

  const inviteLink = `${location.host}/join-guest-chat/${room}`;
let reconnectInterval = 5000; // 5 seconds


const connect = () => {
  const socketUrl = encodeURI(`${wsUri}?guestName=${guestName}&room=${room}`);
  console.log(socketUrl);
  setSocket(() => new WebSocket(socketUrl));
};

  useEffect(() => {
connect();  
  }, []);



useEffect(() => {
  if(socket){
    socket.onopen = () => {
    console.log('Connected to WebSocket');
  };

  socket.onclose = (event) => {
    console.log('Socket closed. Attempting reconnect...', event.reason);
    setTimeout(connect, reconnectInterval);
  };
  socket?.addEventListener("message", (event: { data: string }) => {
    const msg = JSON.parse(event.data);

    setChatMsgs(() => [...chatMsgs, msg]);
  });
  
  socket.onerror = (error) => {
    console.error('Socket error:', error);
    socket?.close();
  };
  console.log(socket);
}
}, [socket]);
  
const sendMessage = () => {
    console.log("sending message: " + message);
    if (socket?.readyState === WebSocket.OPEN) {
      message && socket?.send(JSON.stringify({ message, guestName, room }));
      setMessage("");  
    }
  };

  
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
    </>
  );
};
export default ChatGuest;
