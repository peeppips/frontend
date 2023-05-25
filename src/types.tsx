export interface UserLoginState {
  loading: boolean;
  error: string | null;
  userInfo: UserInfo | null;

  
}

export interface UserInfo {
  // Define the properties of the user info object
  // Example:
  id: number;
  name: string;
  // Add more properties as needed
}