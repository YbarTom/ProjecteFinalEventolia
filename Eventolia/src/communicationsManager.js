export const SERVER_URL = "http://localhost:3001"

export async function getPosts() {
  try {
    const response = await fetch(`${SERVER_URL}/getPosts`, { method: 'GET', mode: 'cors' });
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.log("Error al recuperar posts CM");
    throw error;
  }
}

export async function getEventInfo(idEvent) {
  try {
    const response = await fetch(`${SERVER_URL}/getEventById`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idEvent: idEvent })
      });
    const event = await response.json();
    return event;
  } catch (error) {
    console.log("Error al recuperar event CM");
    throw error;
  }
}

export async function getFollowingPage(user) {
  try {
    const response = await fetch(`${SERVER_URL}/getFollowingPage`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user })
      });
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.log("Error al recuperar following page CM");
    throw error;
  }
}

export async function createEvent(event) {
  try {
    const response = await fetch(`${SERVER_URL}/createEvent`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event })
      });
    const resposta = await response.json();
    return resposta;
  } catch (error) {
    console.log("Error al crear event CM");
    throw error;
  }
}

export async function logIn(userInfo) {
  try {
    const response = await fetch(`${SERVER_URL}/login`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInfo })
      });
    const resposta = await response.json();
    return resposta;
  } catch (error) {
    console.log("Login Error CM");
    throw error;
  }
}
