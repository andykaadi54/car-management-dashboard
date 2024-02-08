import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  getUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		if (storedToken) {
			getUser();
		}
	}, []);

	const login = async (email: string, password: string): Promise<void> => {
		try {
			const response = await axios.post<{ token: string }>(
				"http://localhost:3000/users/login",
				{
					email,
					password,
				}
			);

			localStorage.setItem("token", response.data.token);
			await getUser();
		} catch (error) {
			console.error("Login failed", error);
			throw new Error("Login failed");
		}
	};

	const getUser = async (): Promise<void> => {
		try {
			const storedToken = localStorage.getItem("token");
			if (storedToken) {
				const response = await axios.get<{ user: User }>(
					"http://localhost:3000/users/current-user",
					{
						headers: {
							Authorization: `Bearer ${storedToken}`,
						},
					}
				);
				setUser(response.data.user);
			}
		} catch (error) {
			console.error("Failed to fetch user data", error);
		}
	};

	return (
		<AuthContext.Provider value={{ user, login, getUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
