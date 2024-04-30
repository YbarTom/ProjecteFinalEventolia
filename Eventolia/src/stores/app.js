import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      id: "",
      userName: "",
      email: "",
      password: "",
      followers: [],
      followed: [],
      posts: [],
      events: [],
      profilePic: "",
      privacity: false
    }
  }),
  actions: {
    setUser(id, userName, email, password, followers, followed, posts, events, profilePic, privacity) {
      this.user.id = id;
      this.user.userName = userName;
      this.user.email = email;
      this.user.password = password;
      this.user.followers = followers;
      this.user.followed = followed;
      this.user.posts = posts;
      this.user.events = events;
      this.user.profilePic = profilePic;
      this.user.privacity = privacity;
    },
    setUserId(id) {
      this.user.id = id;
    },
    setUserName(userName) {
      this.user.userName = userName;
    },
    setUserEmail(email) {
      this.user.email = email;
    },
    setUserPassword(password) {
      this.user.password = password;
    },
    setUserFollowers(followers) {
      this.user.followers = followers;
    },
    setUserFollowed(followed) {
      this.user.followed = followed;
    },
    setUserPosts(posts) {
      this.user.posts = posts;
    },
    setUserEvents(events) {
      this.user.events = events;
    },
    setUserProfilePic(profilePic) {
      this.user.profilePic = profilePic;
    },
    setUserPrivacy(privacity) {
      this.user.privacity = privacity;
    },
    getUser() {
      return this.user
    },
    getUserId() {
      return this.user.id;
    },
    getUserName() {
      return this.user.userName;
    },
    getUserEmail() {
      return this.user.email;
    },
    getUserPassword() {
      return this.user.password;
    },
    getUserFollowers() {
      return this.user.followers;
    },
    getUserFollowed() {
      return this.user.followed;
    },
    getUserPosts() {
      return this.user.posts;
    },
    getUserEvents() {
      return this.user.events;
    },
    getUserProfilePic() {
      return this.user.profilePic;
    },
    getUserPrivacy() {
      return this.user.privacity;
    }
  }
})
