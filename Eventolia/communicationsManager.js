export const SERVER_URL = "http://localhost:3001"

//#region POSTS

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
    console.log("getEventInfo")
    const response = await fetch(`${SERVER_URL}/getEventById`,
      { method: 'POST', mode: 'cors', body: JSON.stringify({ id: idEvent }) });
    const event = await response.json();
    return event;
  } catch (error) {
    console.log("Error al recuperar event CM");
    throw error;
  }
}