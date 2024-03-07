import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";

interface UsersType {
	id: number;
	login: string;
	password: string;
}

//const [login, setLogin] = useState(null);
/* 	const {
		isLoading,
		isError,
		data: users,
		error,
	} = useQuery("todos", fetchUsersList);
 */
/* const fetchUsersList = async (): Promise<UsersType[] | undefined> => {
	try {
		const data = await axios("http://localhost:3000/api/login");
		return data.data;
	} catch (e) {
		console.error(e);
	}
}; */
function App() {
	const [login, setLogin] = useState("");
	return (
		<div className="fle flex-co min-w-auto font-mono px-10">
			{(!login && (
				<>
					<Register />
					<Login
						getGuestFullName={(login: string) => {
							setLogin(login);
						}}
					/>
				</>
			)) || <Chat login={login} />}
		</div>
	);
}
export default App;
