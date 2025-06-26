import React from 'react';

interface User {
  id: string;
  name: string;
}

interface UsersProps {
  users: User[];
}

const Users: React.FC<UsersProps> = ({ users }) => {
  return (
    <div className="flex mr-5">
      {users &&
        users.map((user, i) => (
          <div
            key={i}
            className="flex items-center justify-center w-16 h-16 my-auto font-medium bg-yellow-100 border-2 border-white rounded-full text-xss user font-poppins"
          >
            <span className="w-10/12 text-center">{user.name}</span>
          </div>
        ))}
    </div>
  );
};

export default Users;
