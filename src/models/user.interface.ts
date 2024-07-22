export interface User {
    userId: number;
    username: string;
    email: string;
    phone: string;
    isAdmin: boolean;
    userType: 1 | 2;
    // Add other properties as needed
}
