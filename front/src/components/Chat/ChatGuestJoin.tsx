import { useParams } from "react-router";
import Dialog from "@mui/material/Dialog";
import { Button } from "../Form/Form";
import { Input } from "../Form/Form";
import { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function ChatGuestJoin() {
  const { room } = useParams();
  console.log(room);
  const [guestName, setGuestName] = useState("");

  const sendGuestName = async () => {
    const res = await axios.post("http://localhost:3000/api/guest-chat-join", {
      guestName,
      room,
    });

    window.location.replace(`/chat/${room}/${guestName}`);
  };
  return (
    <Dialog
      open={true}
      className="flex flex-row p-4items-center justify-center "
    >
      <DialogTitle>Enter Your Name:</DialogTitle>
      <Input value={guestName} onChange={(e) => setGuestName(e.target.value)} />
      <Button onClick={sendGuestName}>Join</Button>
    </Dialog>
  );
}
