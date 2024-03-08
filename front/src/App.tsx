import { useState } from "react";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";

interface UsersType {
	id: number;
	login: string;
	password: string;
}

function App() {
	const [login, setLogin] = useState("");
	return (
		<div className="fle flex-co min-w-auto font-mono px-10">
			{(!login && (
				<>
					<Register />
					<Login
						getLogin={(login: string) => {
							setLogin(login);
						}}
					/>
				</>
			)) || <Chat login={login} />}
		</div>
	);
}
export default App;
