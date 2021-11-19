const Users = (props) => {
  const users = props.roomId.users
  
return (
 <div className="flex mr-5">
  {users !== null && users.map((user, i) => (
     <div key={i} className="border-white border-2 user font-open-sans font-bold text-xs my-auto rounded-full h-16 w-16 bg-yellow-100 flex items-center justify-center">
      <span>{user.userName}</span>
     </div>
   ))}
  </div>
 )};

 export default Users;