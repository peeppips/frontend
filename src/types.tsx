export interface UserLoginState {
  loading: boolean;
  error: string | null;
  userInfo: UserInfo | null;

  
}

export interface projectListByUserState {
  loading: boolean;
  error: string | null;
  projects: any[] | null   ;
}

export interface UserInfo {
  user: any;
  // Define the properties of the user info object
  // Example:
  id: number;
  name: string;
  projects:any;
  // Add more properties as needed
}