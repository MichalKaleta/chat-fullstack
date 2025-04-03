import { useEffect, useState, FC } from "react";
import { Input, Button, InputContainer } from "../Form/Form";
const wsUri = "ws://localhost:1337";
import { chatMsgsType } from "../../types/index";

const Chat: FC<{ login: string }> = ({ login = "" }) => {
	const [message, setMessage] = useState("");
	const [chatMsgs, setChatMsgs] = useState<chatMsgsType[]>([]);
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const wsUrl = encodeURI(`${wsUri}/?user=${login}`);

	useEffect(() => {
		setSocket(new WebSocket(wsUrl));
		return () => {};
	}, []);

	socket?.addEventListener("message", (event: { data: string }) => {
		setChatMsgs(() => [...chatMsgs, JSON.parse(event.data)]);
		setMessage(() => "");
	});

	const sendMessage = () => {
		socket?.send(JSON.stringify({ message, login }));
		//socket?.send(message);
	};

	return (
		<>
			<div className=" chat__container flex flex-col  justify-center">
				"Witaj na czacie {login}"
				<ul className="flex flex-col w-full h-96 overflow-hidden bg-slate-200  mt-10 p-4 justify-end w-400 items-end">
					{chatMsgs.map(({ message, id, sender }) => (
						<li
							className={`${
								(sender != login && "self-start bg-yellow-500") || "bg-sky-300"
							}   
                                max-w-80 border-r-4 border-b-4 border-l-2 border-t-2 border-black rounded-xl text-xl p-2 my-1`}
							key={id}
						>
							<div className="text-xs .ease-linear  duration-75">{sender}</div>
							<div>{message}</div>
						</li>
					))}
				</ul>
				<InputContainer>
					<Input value={message} onChange={(e) => setMessage(e.target.value)} />
					<Button
						className="mr-0"
						text="Send"
						onClick={() => message && sendMessage()}
					/>
				</InputContainer>
			</div>
		</>
	);
};
export default Chat;
