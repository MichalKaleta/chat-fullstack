import { useState, useEffect, ReactComponentElement } from "react";
import axios from "axios";
import { Button, Input } from "../Form/Form";
import { useQuery } from "react-query";

const host = "localhost";
//const host2 = "172.18.176.94";

type LoginPropsType = {
	getLogin: (login: string) => void;
};

const Login: React.FC<LoginPropsType> = ({ getLogin }) => {
	const [{ login, password }, setLoginData] = useState({
		login: "dude",
		password: "password",
	});

	const sendGuestData = async () =>
		axios.post("http://localhost:3000/api/guest", {
			guestName,
		});

	const sendUserData = async () =>
		axios.post(`http://${host}:3000/api/login`, {
			login,
			password,
		});

	const {
		data: guestData,
		error: guestError,
		refetch: fetchGuest,
	} = useQuery("login", sendGuestData, {
		onSuccess: (res) => {
			//axios.defaults.baseURL = 'http://localhost:1010/'
			const { login, token } = res.data;
			axios.defaults.headers.common = {
				Authorization: `bearer ${token}`,
			};
			axios.get("/api/chat").then((res) => getLogin(login));
		},
		enabled: false,
	});

	const {
		data: authData,
		error: authError,
		refetch: fetchAuth,
	} = useQuery("login", sendUserData, {
		onSuccess: (res) => getLogin(res.data.login),
		enabled: false,
	});

	const error = guestError || authError || undefined;
	return (
		<div className="my-4">
			{error && (
				<div className="bg-red-500 text- text-slate-100 w-96 p-2">
					<p className="">{error?.response.data}</p>
				</div>
			)}
			<form>
				<Input
					value={login}
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
					value={password}
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
					className="items-center justify-center text-black"
					type="button"
					aria-label="Like"
					onClick={fetchAuth}
				>
					Login
				</Button>
			</form>
		</div>
	);
};

export default Login;
