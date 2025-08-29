export declare function registerUser(name: string, email: string, password: string): Promise<{
    id: number;
    email: string;
    name: string;
    password: string;
} | null>;
export declare function getAllUsers(): Promise<{
    id: number;
    email: string;
    name: string;
    password: string;
}[]>;
export declare function authenticateUser(email: string, password: string): Promise<{
    id: number;
    email: string;
    name: string;
    password: string;
} | null>;
//# sourceMappingURL=auth.service.d.ts.map