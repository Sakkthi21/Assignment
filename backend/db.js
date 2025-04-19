const mockData = require('./mockData/data');

const mockDb = {
    query: async (text, params) => {
        // Simulate database queries using mock data
        if (text.includes('SELECT * FROM users WHERE email = $1')) {
            const user = mockData.users.find(u => u.email === params[0]);
            return { rows: user ? [user] : [] };
        }
        if (text.includes('SELECT * FROM users WHERE email = $1 OR username = $2')) {
            const user = mockData.users.find(u => u.email === params[0] || u.username === params[1]);
            return { rows: user ? [user] : [] };
        }
        if (text.includes('INSERT INTO users')) {
            const newUser = {
                user_id: mockData.users.length + 1,
                username: params[0],
                email: params[1],
                password: params[2],
                name: params[3],
                contact_number: params[4],
                address: params[5],
                is_admin: false
            };
            mockData.users.push(newUser);
            return { rows: [newUser] };
        }
        if (text.includes('SELECT user_id, username, email, is_admin, name, contact_number, address FROM users WHERE user_id = $1')) {
            const user = mockData.users.find(u => u.user_id === params[0]);
            return { rows: user ? [user] : [] };
        }
        return { rows: [] };
    }
};

module.exports = mockDb;