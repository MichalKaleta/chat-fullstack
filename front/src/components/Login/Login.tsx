import { useState, useEffect, ReactComponentElement } from "react";
import axios from "axios";
import { Button, Input } from "../Form/Form";
const Login: ReactComponentElement<any> = (props: any) => {
	const [{ login, password }, setLoginData] = useState({
		login: "dude",
		password: "password",
	});

	const sendLoginData = () => {
		axios
			.post("http://localhost:3000/api/login", {
				login,
				password,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		sendLoginData();
	}, []);

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
							login: state.login,
							password: e.target.value,
						}))
					}
				/>

				<Input
					placeholder="password"
					type="password"
					onChange={(e) => {
						setLoginData((state) => ({
							login: e.target.value,
							password: state.password,
						}));
					}}
				/>
				<Button
					className="flex-none font-mono flex items-center justify-center w-12 h-12 text-black"
					type="button"
					aria-label="Like"
					onClick={(e) => {
						e.preventDefault();
						sendLoginData();
					}}
				>
					Login
				</Button>
				{/* <button class="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF]">
					Simple Button
				</button> */}
			</form>
		</div>
	);
};
export default Login;
