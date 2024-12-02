import React from 'react'

function Users() {
  const users = [
    { id: 1, name: 'David', email: 'david@example.com' },
    { id: 2, name: 'Heinz', email: 'heinz@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ];

  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
      <h3 className="text-2xl font-semibold mb-4 text-center">Registered Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="p-4 border-b border-gray-200">
            <p className="font-bold">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default Users

