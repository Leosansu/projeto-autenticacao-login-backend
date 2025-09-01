import jwt from 'jsonwebtoken';
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (!token)
        return res.status(401).json({ message: 'Token não fornecido' });
    jwt.verify(token, process.env.JWT_SECRET || 'secreta123', (err, user) => {
        if (err)
            return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    });
}
//# sourceMappingURL=auth.middleware.js.map