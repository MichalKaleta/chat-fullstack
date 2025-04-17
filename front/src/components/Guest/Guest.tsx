import { useState } from "react";
import axios from "axios";
import { Button, Input } from "../Form/Form";
import { useQuery } from "react-query";

export default function Guest() {
	const [guestName, setGuestName] = useState("");

	const getLogin = (login: string) => {
		console.log(login);
	};
	const sendGuestName = async () =>
		axios.post("http://localhost:3000/api/guest", {
			guestName,
		});

	const {
		data: guestData,
		error: guestError,
		refetch: fetchGuest,
	} = useQuery("login", sendGuestName, {
		onSuccess: (res) => {
			const login = res.data.login;
			const token = res.data.token;
			axios.defaults.headers.common = {
				Authorization: `bearer ${token}`,
			};
			axios.get("/api/chat").then(() => getLogin(login));
		},
		enabled: false,
	});
	console.log(guestData, guestError);
	return (
		<div className="my-4">
			<form>
				<Input
					value={guestName}
					placeholder="guest name"
					//getDecryptedString
					type="text"
					onChange={(e) => {
						setGuestName(e.target.value);
					}}
				/>
				<Button
					value={guestName}
					className="items-center justify-center  text-black"
					onClick={() => fetchGuest}
				></Button>
			</form>
		</div>
	);
}
