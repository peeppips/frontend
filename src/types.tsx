export interface UserLoginState {
  loading: boolean;
  error: string | null;
  userInfo: UserInfo | null;
  
}

export interface userDetailsState {
  loading: boolean;
  error: string | null;
  user: any | null;
  success:boolean
}



export interface projectListByUserState {
  loading: boolean;
  error: string | null;
  projects: any[] | null   ;
}
export interface brokerListByUserState {
  loading: boolean;
  error: string | null;
  brokers: any[] | null   ;
}

export interface UserInfo {
  user: any;
  // Define the properties of the user info object
  // Example:
  id: number;
  name: string;
  projects:any;
  token: string
  // Add more properties as needed
}