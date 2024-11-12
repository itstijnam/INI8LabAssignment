const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.use(express.json());

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', dob: '1990-01-01' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', dob: '1992-02-02' }
];


app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/users', (req, res) => {
  res.json(users);
});


app.post('/api/users', (req, res) => {
  const { name, email, dob } = req.body;
  const newUser = { id: users.length + 1, name, email, dob };
  users.push(newUser);
  res.status(201).json(newUser);
});


app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, dob } = req.body;
  const userIndex = users.findIndex(user => user.id === parseInt(id));

  if (userIndex !== -1) {
    
    users[userIndex] = { id: parseInt(id), name, email, dob };
    res.json(users[userIndex]);
  } else {
    res.status(404).send('User not found');
  }
});


app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id === parseInt(id));

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
