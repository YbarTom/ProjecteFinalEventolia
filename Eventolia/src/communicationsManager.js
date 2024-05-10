export const SERVER_URL = "http://localhost:3001"
import { useAppStore } from '@/stores/app.js'

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

export async function getPostsEvents(){
  try {
    const response = await fetch(`${SERVER_URL}/getPostsEvents`, { method: 'POST', mode: 'cors' });
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.log("Error al recuperar posts CM");
    throw error;
  }

}

export async function postMessageChat(room,message,user) {

  try {
    fetch(`${SERVER_URL}/postMessageChat`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({room:room, message:message, user:user })
      });
  } catch (error) {
    console.log("Error al enviar mensaje CM");
    throw error;
  }
}

export async function getChats() {

  try {
    const response = await fetch(`${SERVER_URL}/getChats`,
    {
      method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idChats:  useAppStore().getUser().chats})
    });
    const chats = await response.json();
    return chats;
  } catch (error) {
    console.log("Error al recuperar chats CM");
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

export async function followUser(data) {
  try {
    console.log(data)
    fetch(`${SERVER_URL}/followUser`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });
  } catch (error) {
    console.log("Error following user CM");
    throw error;
  }
}

export async function unfollowUser(data) {
  try {
    console.log(data)
    fetch(`${SERVER_URL}/unfollowUser`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });
  } catch (error) {
    console.log("Error unfollowing user CM");
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

export async function getUserByName(userName) {
  try {
    const response = await fetch(`${SERVER_URL}/getUserByName`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName })
      });
    const resposta = await response.json();
    return resposta;
  } catch (error) {
    console.log("Error al recuperar user CM");
    throw error;
  }
}

export async function getPostsByIdUser(idUser) {
  try {
    const response = await fetch(`${SERVER_URL}/getPostsByIdUser`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser })
      });
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.log("Error al recuperar posts CM");
    throw error;
  }
}

export async function getEventsByIdUser(idUser) {
  try {
    const response = await fetch(`${SERVER_URL}/getEventsByIdUser`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser })
      });
    const events = await response.json();
    return events;
  } catch (error) {
    console.log("Error al recuperar events CM");
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

export async function getFollowers(followers) {
  try {
    const response = await fetch(`${SERVER_URL}/getFollowers`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ followers })
      });
    const resposta = await response.json();
    return resposta;
  } catch (error) {
    console.log("Get followers Error CM");
    throw error;
  }
}

export async function getFollowed(followed) {
  try {
    const response = await fetch(`${SERVER_URL}/getFollowed`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ followed })
      });
    const resposta = await response.json();
    return resposta;
  } catch (error) {
    console.log("Get followed Error CM");
    throw error;
  }
}

export async function searchLocation(addressQuery) {
  const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    addressQuery
  )}&format=json&addressdetails=1&limit=1&polygon_svg=1`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.length > 0) {
      const location = data[0];
      const latitude = location.lat;
      const longitude = location.lon;
      return { latitude, longitude };
    } else {
      throw new Error("No se encontró la ubicación.");
    }
  } catch (error) {
    throw new Error("Error al obtener la ubicación: " + error.message);
  }
}
