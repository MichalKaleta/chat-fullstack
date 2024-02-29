import { useState, useEffect, ReactComponentElement } from "react";
import { Button, Input } from "../Form/Form";
import axios from "axios";

const Register: ReactComponentElement<any> = (props: any) => {
	const [{ login, password }, setRegisterData] = useState({
		login: "dude",
		password: "password",
	});

	const sendRegisterData = () => {
		axios
			.post("http://localhost:3000/api/register", {
				login,
				password,
			})
			.then((res) => console.log(res));
	};

	useEffect(() => {
		sendRegisterData();
	}, []);

	return (
		<div className="mt-4">
			<span className="mx-2">
				------------------REGISTER-----------------
			</span>
			<form>
				<Input
					placeholder="username"
					type="text"
					onChange={(e) =>
						setRegisterData((state) => ({
							login: state.login,
							password: e.target.value,
						}))
					}
				/>

				<Input
					type="password"
					placeholder="password"
					onChange={(e) =>
						setRegisterData((state) => ({
							login: e.target.value,
							password: state.password,
						}))
					}
				/>
				<Button
					//type="undefin"
					onClick={(e) => {
						e.preventDefault();
						sendRegisterData();
					}}
				>
					Register
				</Button>
			</form>
		</div>
	);
};
export default Register;
