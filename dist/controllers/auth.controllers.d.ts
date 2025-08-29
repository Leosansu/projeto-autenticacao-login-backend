import type { Request, Response } from 'express';
export declare const login: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const register: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const listUsers: (_req: Request, res: Response) => void;
//# sourceMappingURL=auth.controllers.d.ts.map