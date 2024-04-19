interface UserData {
  fullName: string;
  username: string;
  password: string;
  email: string;
  role: UserRole;
}

type UserInfo = Omit<UserData, "password"> & { id: number };

type UserRole = "user" | "teller" | "admin";
type LoginCredentials = Pick<UserData, "username" | "password">;




