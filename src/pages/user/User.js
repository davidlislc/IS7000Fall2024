
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'User' });
  const [addingUser, setAddingUser] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://3.218.8.102/api/account');
        const userAuthorities = response.data.authorities || [];
        setIsAdmin(userAuthorities.includes('ROLE_ADMIN'));
      } catch (err) {
        setError('Failed to fetch user details');
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://3.218.8.102/api/admin/users?page=0&size=20&sort=id,asc');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    const init = async () => {
      await fetchCurrentUser();
      fetchUsers();
    };

    init();
  }, []);

  const handleDelete = async (userLogin) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the user: ${userLogin}?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://3.218.8.102/api/admin/users/${userLogin}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.login !== userLogin));
      alert('User deleted successfully.');
    } catch (err) {
      alert('Failed to delete the user: ' + err.message);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { ...formData };
      const response = await axios.post('http://3.218.8.102/api/admin/users', newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setFormData({ name: '', email: '', role: 'User' });
      alert('User added successfully.');
      setAddingUser(false);
    } catch (err) {
      alert('Failed to add user: ' + err.message);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  if (!isAdmin) {
    return (
      <div className="text-center mt-10 text-gray-600">
        You do not have permission to view this page.
      </div>
    );
  }

  return (
    <div className="bg-pink-500 min-h-screen flex flex-col items-center py-10">
      <h3 className="text-2xl font-bold text-white mb-6">Registered Users</h3>
      <ul className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-4 border-b last:border-b-0 border-gray-200 flex justify-between items-center"
          >
            <div>
              <p className="font-bold text-lg text-gray-800">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={() => handleDelete(user.login)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Add New User Section */}
      {addingUser ? (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-6"
        >
          <h3 className="text-lg font-semibold mb-4">Add a New User</h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter user's name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter user's email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Add User
          </button>
        </form>
      ) : (
        <button
          onClick={() => setAddingUser(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-6 hover:bg-blue-700 transition"
        >
          Add New User
        </button>
      )}
    </div>
  );
}

export default Users;
