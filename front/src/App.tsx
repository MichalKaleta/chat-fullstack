import { useState } from "react";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import Guest from "./components/Guest/Guest";
import SearchUsers from "./components/SearchUsers/SearchUsers";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface UsersType {
	id: number;
	login: string;
	password: string;
}

function App() {
	const [login, setLogin] = useState("");
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	console.log(login);
	return (
		<div className="fle flex-co min-w-auto font-mono px-10">
			{(!login && (
				<>
					<Box>
						<Tabs value={value} onChange={handleChange}>
							{["Login", "REGISTER", "GUESTR"].map((name) => (
								<Tab label={name} />
							))}
						</Tabs>
					</Box>
					{value === 0 && (
						<Login getLogin={(login: string) => setLogin(login)} />
					)}
					{value === 1 && <Register />}
					{value === 2 && <Guest />}
				</>
			)) || (
				<>
					<SearchUsers />
					<Chat login={login} />
				</>
			)}
		</div>
	);
}
export default App;
