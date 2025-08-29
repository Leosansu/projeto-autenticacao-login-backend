import type { User } from '../models/user.model.js';
export declare function registerUser(name: string, email: string, password: string): User | null;
export declare function authenticateUser(email: string, password: string): User | null;
export declare function getAllUsers(): User[];
//# sourceMappingURL=auth.service.d.ts.map