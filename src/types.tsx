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

export interface GetAccountsByUserState {
  loading: boolean;
  accounts: Account[];
  error?: string;
}


interface Credit {
  // Define the properties of the credit object
  // according to your application's requirements
  // For example:
  uid: string;
  user: string;
  transactionId: string;
  project: string;
  points: number;
  createdAt: string;
  updatedAt: Date;
  // ...
}

export interface creditList {
  loading: boolean;
  credits: Credit[];
  error?: string;
}



interface Account {
  broker: string;
  server: string;
  // Define the properties of the account object
  // according to your application's requirements
  // For example:
  uid: string;
  login: string;
  password:string;
  investorPassword:string;
  lotSize:string;
  riskManagementPercentage:string;
  takeProfit:string;
  stopLoss:string;
  user:string;
  // ...
}


export interface GetReferralsByUserState {
  loading: boolean;
  referrals: Referral[];
  error?: string;
}

interface Referral {
  uid: string;
  createdAt: string;
  email:string;
  firstName:string;
  referee:string;
  secondName:string;
  updatedAt:string;
}

export interface projectListByUserState {
  loading: boolean;
  error: string | null;
  projects: any[] | null   ;
}

export interface referralListByUserState {
  loading: boolean;
  error: string | null;
  referrals: any[] | null   ;
}

export interface brokerListByUserState {
  loading: boolean;
  error: string | null;
  brokers: any[] | null   ;
}

export interface serverListByBrokerState {
  loading: boolean;
  error: string | null;
  servers: any[] | null   ;
}

export interface UserInfo {
  uid: any;
  // Define the properties of the user info object
  // Example:
  id: number;
  email:string,
  name: string;
  projects:any;
  token: string;
  isAdmin:Boolean;
  // Add more properties as needed
}