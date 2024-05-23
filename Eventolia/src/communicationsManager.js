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

export async function getEvents() {
  try {
    const response = await fetch(`${SERVER_URL}/getEvents`, { method: 'GET', mode: 'cors' });
    const events = await response.json();
    return events;
  } catch (error) {
    console.log("Error al recuperar events CM");
    throw error;
  }
}

export async function getCategories() {
  try {
    const response = await fetch(`${SERVER_URL}/getCategories`, { method: 'GET', mode: 'cors' });
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.log("Error al recuperar categories CM");
    throw error;
  }
}

export async function getPostsEvents() {
  try {
    const response = await fetch(`${SERVER_URL}/getPostsEvents`, { method: 'POST', mode: 'cors' });
    const posts = await response.json();
    console.log(posts)
    return posts;
  } catch (error) {
    console.log("Error al recuperar posts CM");
    throw error;
  }

}

export async function postMessageChat(room, message, user, type) {

  try {
    fetch(`${SERVER_URL}/postMessageChat`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room: room, message: message, user: user, type: type })
      });
  } catch (error) {
    console.log("Error al enviar mensaje CM");
    throw error;
  }
}

export async function postPostChat(room, post, type, user) {

  try {
    fetch(`${SERVER_URL}/postPostChat`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room: room, post: post, type: type, user: user })
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
        body: JSON.stringify({ idChats: useAppStore().getUser().chats })
      });
    const chats = await response.json();
    return chats;
  } catch (error) {
    console.log("Error al recuperar chats CM");
    throw error;
  }
}

export async function getNotificationsByIdUser(idUser) {
  console.log(idUser)
  try {
    const response = await fetch(`${SERVER_URL}/getNotificationsByIdUser`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser })
      });
    const notifications = await response.json();
    return notifications;
  } catch (error) {
    console.log("Error al recuperar notifications CM");
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

export async function createUser(user) {
  try {
    const response = await fetch(`${SERVER_URL}/createUser`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user })
      });
    const resposta = await response.json()
    return resposta;
  } catch (error) {
    console.log("Error creating user CM");
    throw error;
  }
}

export async function editUserName(data) {
  try {
    const response = await fetch(`${SERVER_URL}/editUserName`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });
    const user = await response.json()
    return user;
  } catch (error) {
    console.log("Error editing user CM");
    throw error;
  }
}

export async function editPassword(data) {
  try {
    const response = await fetch(`${SERVER_URL}/editPassword`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });
    const user = await response.json()
    return user
  } catch (error) {
    console.log("Error editing user CM");
    throw error;
  }
}

export async function getCommentsByIdPost(idPost) {
  try {
    const response = await fetch(`${SERVER_URL}/getCommentsByIdPost`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idPost })
      });
    const comments = await response.json();
    return comments;
  } catch (error) {
    console.log("Error getting comments CM");
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

export async function createComment(comment) {
  try {
    const response = await fetch(`${SERVER_URL}/createComment`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment })
      });
    const resposta = await response.json();
    return resposta;
  } catch (error) {
    console.log("Error al crear comment CM");
    throw error;
  }
}

export async function createPost(post) {
  try {
    const response = await fetch(`${SERVER_URL}/createPost`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post })
      });
    const resposta = await response.json();
    return resposta;
  } catch (error) {
    console.log("Error al crear post CM");
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

export async function likePost(likeInfo) {
  try {
    const response = await fetch(`${SERVER_URL}/likePost`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likeInfo })
      });
    const resposta = await response.json();
    return resposta;
  } catch (error) {
    console.log("Like post Error CM");
    throw error;
  }
}

export async function dislikePost(likeInfo) {
  try {
    const response = await fetch(`${SERVER_URL}/dislikePost`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likeInfo })
      });
    const resposta = await response.json();
    return resposta;
  } catch (error) {
    console.log("Dislike post Error CM");
    throw error;
  }
}

export async function addAssist(assistInfo) {
  try {
    const response = await fetch(`${SERVER_URL}/addAssist`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assistInfo })
      });
    const resposta = await response.json();
    return resposta;
  } catch (error) {
    console.log("Assist event Error CM");
    throw error;
  }
}

export async function removeAssist(assistInfo) {
  try {
    const response = await fetch(`${SERVER_URL}/removeAssist`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assistInfo })
      });
    const resposta = await response.json();
    return resposta;
  } catch (error) {
    console.log("Assist event Error CM");
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

export async function getUserByEmailName(email) {
  try {
    const response = await fetch(`${SERVER_URL}/getUserByEmailName`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
    const resposta = await response.json();
    return resposta;
  } catch (error) {
    console.log("Get user by email Error CM");
    throw error;
  }
}

export async function checkChat(users) {
  try {
    const response = await fetch(`${SERVER_URL}/checkChat`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users })
      });
    const resposta = await response.json();
    return resposta;
  } catch (error) {
    console.log("Check chat Error CM");
    throw error;
  }
}

export async function acceptPost(idPost) {
  try {
    const response = await fetch(`${SERVER_URL}/acceptPost`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idPost })
      });
    const resposta = await response.json();
    console.log(resposta)
    return resposta;
  } catch (error) {
    console.log("Accept post Error CM");
    throw error;
  }
}

export async function deletePost(post) {
  try {
    const response = await fetch(`${SERVER_URL}/deletePost`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post })
      });
    const resposta = await response.json();
    console.log(resposta)
    return resposta;
  } catch (error) {
    console.log("Delete post Error CM");
    throw error;
  }
}

export async function deleteEvent(idEvent) {
  try {
    const response = await fetch(`${SERVER_URL}/deleteEvent`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idEvent })
      });
    const resposta = await response.json();
    console.log(resposta)
    return resposta;
  } catch (error) {
    console.log("Delete event Error CM");
    throw error;
  }
}

export async function acceptEvent(idEvent) {
  try {
    const response = await fetch(`${SERVER_URL}/acceptEvent`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idEvent })
      });
    const resposta = await response.json();
    console.log(resposta)
    return resposta;
  } catch (error) {
    console.log("Accept event Error CM");
    throw error;
  }
}

export async function getAlgorithm(idUser) {
  console.log(idUser)
  try {
    const response = await fetch(`${SERVER_URL}/getAlgorithm`,
      {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser })
      });
    const resposta = await response.json();
    console.log(resposta)
    return resposta;
  } catch (error) {
    console.log("Get algorithm Error CM");
    throw error;
  }
}
