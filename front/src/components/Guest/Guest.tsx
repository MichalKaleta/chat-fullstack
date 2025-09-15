import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Button, Input } from "../Form/Form";

type Props = { getLogin: (name: string) => void };
export default function Guest({ getLogin }: Props) {
  const [guestName, setGuestName] = useState("");
  const navigate = useNavigate();
  const sendGuestName = async () => {
    getLogin(guestName);
    const res = await axios.post("/api/guest-chat", {
      guestName,
    });
    const room = res.data.room;
    navigate(`/chat/${room}/${guestName}`);
  };

  return (
    <div className="my-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
          sendGuestName();
        }}
      >
        <Input
          value={guestName}
          placeholder="guest name"
          type="text"
          onChange={(e) => {
            setGuestName(e.target.value);
          }}
        />
        <Button
          type="submit"
          value={guestName}
          className="items-center justify-center  text-black"
        >
          Send
        </Button>
      </form>
    </div>
  );
}
