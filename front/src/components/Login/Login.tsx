import { useState, useEffect, ReactComponentElement } from "react";
import axios from "axios";
import { Button, Input } from "../Form/Form";
const host = "localhost";
const host2 = "172.18.176.94";

const Login: ReactComponentElement<any> = ({ getGuestFullName }) => {
	const [{ login, password }, setLoginData] = useState({
		login: "test",
		password: "password",
	});

	const [guestName, setGuestName] = useState("Michal");

	const sendLoginData = () => {
		axios
			.post(`http://${host}:3000/api/login`, {
				login,
				password,
			})
			.then((res) => console.log("RESPONSE", res.data))
			.catch((err) => console.log("ERROR", err));
	};
	const sendGuestName = async () => {
		try {
			const { data } = await axios.post(
				"http://localhost:3000/api/guest",
				{
					guestName,
				}
			);
			console.log(data);
			getGuestFullName(data.guestName);
			console.log("RESPONSE", data);
		} catch (err) {
			console.log("ERROR", err);
		}
	};
	/////TEST////////////////
	useEffect(() => {
		sendGuestName();

		return () => {};
	}, []);
	/////////////////

	return (
		<div className="mt-4">
			<span className="mx-2">
				--------------------LOGIN-------------------
			</span>
			<form>
				<Input
					placeholder="username"
					type="text"
					onChange={(e) =>
						setLoginData((state) => ({
							login: e.target.value,
							password: state.password,
						}))
					}
				/>

				<Input
					placeholder="password"
					type="password"
					onChange={(e) => {
						setLoginData((state) => ({
							login: state.login,
							password: e.target.value,
						}));
					}}
				/>
				<Button
					className="flex-none font-mono flex items-center justify-center w-12 h-12 text-black"
					type="button"
					aria-label="Like"
					onClick={sendLoginData}
				>
					Login
				</Button>
			</form>
			--------------OR--CHAT--AS--GUEST-----------
			<form>
				<Input
					value={guestName}
					placeholder="guest name"
					type="text"
					onChange={(e) => {
						setGuestName(e.target.value);
					}}
				/>
				<Button
					value={guestName}
					className="flex-none font-mono flex items-center justify-center w-12 h-12 text-black"
					type="button"
					//aria-label="Like"
					onClick={sendGuestName}
				></Button>
			</form>
		</div>
	);
};
export default Login;
