let users = [];
let nextId = 1;
export function registerUser(name, email, password) {
    const exists = users.some(user => user.email === email);
    if (exists)
        return null;
    const newUser = { id: nextId++, name, email, password };
    users.push(newUser);
    return newUser;
}
export function authenticateUser(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    return user || null;
}
export function getAllUsers() {
    return users;
}
//# sourceMappingURL=auth.service.js.map