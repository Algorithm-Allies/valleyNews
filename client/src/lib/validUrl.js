const links = {
  news: ["local", "education", "crime", "government"],
  sports: ["local", "high-school"],
  subscribe: true,
  createarticle: true,
  businesspanel: true,
  users: true,
  adduser: true,
};

export function validUrl(pathname) {
  const path = pathname.split("/").filter(Boolean);
  if (path.length === 1) {
    return path[0] in links;
  }
  return path[0] in links && links[path[0]].includes(path[1]);
}
