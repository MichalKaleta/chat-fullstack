import { Routes, Route } from "react-router";
import ChatGuest from "./components/Chat/ChatGuest";
import ChatGuestJoin from "./components/Chat/ChatGuestJoin";

export default function Router() {
  return (
    <Routes>
      <Route path="/chat/:room/:guestName" element={<ChatGuest />} />
      <Route path="/join-guest-chat/:room" element={<ChatGuestJoin />} />
    </Routes>
  );
}
