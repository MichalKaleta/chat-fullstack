import { useState, useEffect, FC } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import axios from "axios";
import { Button, Input } from "../Form/Form";
import "./Register.scss";

const Register: FC<null> = () => {
	const [{ email, password }, setRegisterData] = useState({
		email: "dude",
		password: "password",
	});

	async function sendRegisterData(): Promise<void> {
		console.log(email, password);
		axios
			.post("http://localhost:3000/api/register", {
				email,
				password,
			})
			.then((res) => console.log(res));
	}

	return (
		<div className="my-4">
			<form>
				<Input
					value={email}
					placeholder="email"
					type="email"
					onChange={(e) =>
						setRegisterData((state) => ({
							email: state.email,
							password: e.target.value,
						}))
					}
				/>

				<Input
					value={password}
					type="password"
					placeholder="password"
					onChange={(e) =>
						setRegisterData((state) => ({
							email: e.target.value,
							password: state.password,
						}))
					}
				/>
				<Button text="Submit" onClick={sendRegisterData} />
			</form>
		</div>
	);
};
export default Register;
