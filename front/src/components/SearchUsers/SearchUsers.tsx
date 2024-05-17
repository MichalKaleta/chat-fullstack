import { useState, useEffect, FC } from "react";
import { Button, Input } from "../Form/Form";
import axios from "axios";

type UserListType = {
	login: string;
	id: string;
};

const SearchUser: FC = () => {
	const [searchUser, setSearchUser] = useState<string[]>();
	const [usersList, setUsersList] = useState<UserListType[]>([]);

	async function addToFriends(id: string): Promise<void> {
		try {
			const usersList = await axios.post(
				"http://localhost:3000/api/addFriend",
				{
					id,
				}
			);
		} catch (err) {
			throw err;
		}
	}

	async function sendSearchUserData(): Promise<void> {
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
	}

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
