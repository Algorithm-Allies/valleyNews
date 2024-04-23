

function BusinessNavBar() {
  return (
  <div className="flex justify-center">
    <ul className="absolute overflow-hidden flex flex-row w-[50vw] justify-between pb-10 center">
      <li className="hover:rounded-sm hover:border-b-4 hover:border-custom-orange"><a href="/businesspanel">Dashboard</a></li>
      <li className="hover:rounded-sm hover:border-b-4 hover:border-custom-orange"><a href="/users">Users</a></li>
      <li className="hover:rounded-sm hover:border-b-4 hover:border-custom-orange"><a href="/adduser">Add User</a></li>
      <li className="hover:rounded-sm hover:border-b-4 hover:border-custom-orange"><a href="/settings">Settings</a></li>
    </ul>
  </div>
  )
}

export default BusinessNavBar;
