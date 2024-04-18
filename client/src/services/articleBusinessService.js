
export const createBusinessArticle = async(body) => {
  const response = await fetch(`https://valleynews-dev.onrender.com/api/`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  return data;
}