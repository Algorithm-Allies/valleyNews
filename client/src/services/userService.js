export const addBusinessUser = async(body) => {
    const response = await fetch(`https://valleynews-dev.onrender.com/api/business/user/add`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  
    const data = await response.json();
  
    return data;
  }