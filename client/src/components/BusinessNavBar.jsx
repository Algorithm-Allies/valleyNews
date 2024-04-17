

function BusinessNavBar() {
  return (
  <div className="flex justify-center">
    <ul className="flex flex-row w-[50vw] justify-between pb-10 center">
      <li><a href="/businesspanel">Dashboard</a></li>
      <li><a href="/createarticle">New Article</a></li>
      <li><a href="/users">Users</a></li>
      <li><a href="/adduser">Add User</a></li>
      <li><a href="/settings">Settings</a></li>
    </ul>
  </div>
  )
}

export default BusinessNavBar;
