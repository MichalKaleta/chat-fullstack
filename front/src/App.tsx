import { useQuery } from "react-query";
import axios from "axios";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

interface UsersType {
	id: number;
	login: string;
	password: string;
}

const fetchUsersList = async (): Promise<UsersType[] | undefined> => {
	try {
		const data = await axios("http://localhost:3000/api/login");
		return data.data;
	} catch (e) {
		console.error(e);
	}
};
function App() {
	const {
		isLoading,
		isError,
		data: users,
		error,
	} = useQuery("todos", fetchUsersList);

	return (
		<div class="flex flex-col min-w-auto font-mono">
			<header>
				<Register />
				<Login />
			</header>
			{isLoading && "LOADING"}
			{isError && <>{error}</>}
			<div className="inline-block min-w-auto  mx-4 py-2 sm:px-6 lg:px-8">
				{users && (
					<table className="min-w-full text-center text-m font-light rounded">
						<thead className="font-medium border-b border-neutral-600">
							<tr>
								<th scope="col" className="px-6 py-4">
									Id
								</th>
								<th scope="col" className="px-6 py-4">
									Login
								</th>
								<th scope="col" className="px-6 py-4">
									Password
								</th>
							</tr>
						</thead>
						<tbody className="border-x border-neutral-300 rounded">
							{users.map((user: UsersType) => (
								<tr
									className="even:bg-purple-100 odd:bg-purple-200 transition duration-200 ease-in-out hover:bg-purple-400"
									key={user.id}
								>
									<td className="px-6 py-4">{user.id}</td>
									<td className="px-6 py-4">{user.login}</td>
									<td className="px-6 py-4">
										{user.password}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
export default App;
