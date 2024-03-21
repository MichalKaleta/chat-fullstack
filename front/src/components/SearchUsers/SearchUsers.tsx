import { useState, useEffect, ReactComponentElement } from "react";
import { Button, Input } from "../Form/Form";
import axios from "axios";

const SearchUser: ReactComponentElement<any> = (props: any) => {
	const [searchUser, setSearchUser] = useState("");
	const [usersList, setUsersList] = useState([]);

	const addToFriends = async (id) => {
		try {
			const usersList = await axios.post(
				"http://localhost:3000/api/addFriend",
				{
					id,
				}
			);
			setUsersList(usersList);
		} catch (err) {
			throw err;
		}
	};

	const sendSearchUserData = async () => {
		try {
			const res = await axios.get("http://localhost:3000/api/search", {
				params: {
					searchUser,
				},
			});

			setUsersList(res.data);
		} catch (err) {
			throw err;
		}
	};

	return (
		<div className="mt-4">
			<span className="mx-2">
				------------------SEARCH FOR USERS-----------------
			</span>
			<form>
				<Input
					value={searchUser}
					placeholder="username"
					type="text"
					onChange={(e) => setSearchUser(e.target.value)}
				/>

				<Button
					//type="undefin"
					onClick={sendSearchUserData}
				>
					SearchUser
				</Button>
			</form>
			{usersList.map(({ login, id }) => (
				<li key={id}>
					{login}
					{"  "}
					<span onClick={() => addToFriends(id)}>[+ Add friend]</span>
				</li>
			))}
		</div>
	);
};
export default SearchUser;
