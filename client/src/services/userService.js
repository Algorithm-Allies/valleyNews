import fetchWithAuth from "../lib/fetchWithAuth";

export const addBusinessUser = async (body) => {
  const response = await fetchWithAuth(`/business/user/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return data;
};

// Get All Users associated with business ID argument
export const getUsersByBusinessId = async (id) => {
  const response = await fetchWithAuth(`/business/users/${id}`);

  const data = await response.json();

  return data;
};
