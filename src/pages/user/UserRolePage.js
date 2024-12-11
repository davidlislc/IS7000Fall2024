import React from 'react';

// Dummy user data to simulate the logged-in user's role
const currentUser = {
  role: 'Editor', // Change this to 'Admin', 'Editor', or 'Viewer' to test access
};

const UserRolePage = () => {
  // Dummy data for user roles
  const roles = [
    { id: 1, name: 'Admin', description: 'Full access to manage the platform.' },
    { id: 2, name: 'Editor', description: 'Can edit and manage content.' },
    { id: 3, name: 'Viewer', description: 'Read-only access to view content.' },
  ];

  // Role-based access rules
  const accessRules = {
    Admin: ['Admin', 'Editor', 'Viewer'], // Admin can access all roles
    Editor: ['Editor', 'Viewer'], // Editor can access Editor and Viewer roles
    Viewer: ['Viewer'], // Viewer can only access their own role
  };

  // Filter roles based on current user's access
  const accessibleRoles = roles.filter((role) => accessRules[currentUser.role].includes(role.name));

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-blue-600 text-white py-4 px-8 shadow-md">
        <h1 className="text-3xl font-semibold text-center">User Roles</h1>
      </header>

      {/* Roles Section */}
      <section className="py-16 px-6 w-full max-w-screen-lg">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Manage User Roles</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {accessibleRoles.map((role) => (
            <div
              key={role.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{role.name}</h3>
              <p className="text-gray-600">{role.description}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700"
                onClick={() => alert(`Navigating to details for ${role.name}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
        {accessibleRoles.length === 0 && (
          <p className="text-center text-gray-600 mt-10">
            You do not have permission to access any roles.
          </p>
        )}
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-6 text-center">
        <p>© {new Date().getFullYear()} MarketInsyte. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default UserRolePage;
