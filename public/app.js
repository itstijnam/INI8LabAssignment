document.addEventListener('DOMContentLoaded', () => {
  const loadUsersBtn = document.getElementById('loadUsersBtn');
  const addUserForm = document.getElementById('addUserForm');
  const usersTableBody = document.querySelector('#usersTable tbody');

  // Function to load users
  async function loadUsers() {
      const response = await fetch('/api/users');
      const users = await response.json();

      usersTableBody.innerHTML = '';
      users.forEach(user => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.dob}</td>
              <td>
                  <button class="edit-btn" data-id="${user.id}">Edit</button>
                  <button class="delete-btn" data-id="${user.id}">Delete</button>
              </td>
          `;
          usersTableBody.appendChild(row);
      });

      document.querySelectorAll('.edit-btn').forEach(button => {
          button.addEventListener('click', () => editUser(button.getAttribute('data-id')));
      });

      document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', () => deleteUser(button.getAttribute('data-id')));
      });
  }

  async function addUser(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const dob = document.getElementById('dob').value;

      const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, dob })
      });

      if (response.ok) {
          loadUsers(); 
          addUserForm.reset();
      }
  }

  
  async function editUser(id) {
      const name = prompt("Enter new name:");
      const email = prompt("Enter new email:");
      const dob = prompt("Enter new date of birth (YYYY-MM-DD):");

      if (name && email && dob) {
          const response = await fetch(`/api/users/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name, email, dob })
          });

          if (response.ok) {
              loadUsers();
          } else {
              console.error('Failed to update user');
          }
      }
  }

  
  async function deleteUser(id) {
      const response = await fetch(`/api/users/${id}`, {
          method: 'DELETE'
      });

      if (response.ok) {
          loadUsers();
      } else {
          console.error('Failed to delete user');
      }
  }

  
  loadUsersBtn.addEventListener('click', loadUsers);
  addUserForm.addEventListener('submit', addUser);

  loadUsers();
});
