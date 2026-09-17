import { Routes, Route } from "react-router";
import Chat from "./pages/Chat";
import ChatGuestJoin from "./pages/ChatGuestJoin";

export default function Router() {
  return (
    <Routes>
      <Route path="/chat/:room/:guestName" element={<Chat />} />
      <Route path="/join-guest-chat/:room" element={<ChatGuestJoin />} />
    </Routes>
  );
}
