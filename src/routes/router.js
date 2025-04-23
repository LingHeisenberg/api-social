import e from "express";

// Controllers dos novos serviços
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../services/users.service.js";

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../services/posts.service.js";

import {
  getAllLikes,
  getLikesByPost,
  getLikesByUser,
  likePost,
  unlikePost,
} from "../services/postLikes.service.js";

import {
  createGroup,
  deleteGroup,
  getGroup,
  getGroups,
  updateGroup,
} from "../services/groups.service.js";

import {
  createGroupMember,
  deleteUserGroup,
  getGroupMembers,
  getGroupsByUser,
} from "../services/groupMembers.service.js";

import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../services/events.service.js";

import {
  createEventParticipant,
  deleteEventParticipant,
  getEventParticipants,
  getUsersByEvent,
} from "../services/eventParticipants.service.js";

import {
  createComment,
  deleteComment,
  getComments,
  getCommentsByAuthor,
  getCommentsByPost,
} from "../services/comments.service.js";

const router = e.Router();

// USERS
router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// POSTS
router.post("/posts", createPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

// Listar todos os likes
router.get("/post-likes", getAllLikes);

// Likes por post
router.get("/post-likes/:post_id", getLikesByPost);

// Likes por usuário
router.get("/post-likes/user/:user_id", getLikesByUser);

// Criar um like (curtir post)
router.post("/post-likes", likePost);

// Remover like (descurtir post)
router.delete("/post-likes/:user_id/:post_id", unlikePost);

// GROUPS
router.post("/groups", createGroup);
router.get("/groups", getGroups);
router.get("/groups/:id", getGroup);
router.put("/groups/:id", updateGroup);
router.delete("/groups/:id", deleteGroup);

// GROUP MEMBERS
router.post("/group-members", createGroupMember);
router.get("/group-members", getGroupMembers);
router.get("/group-members/:user_id/:group_id", getGroupsByUser);
router.delete("/group-members/:user_id/:group_id", deleteUserGroup);

// EVENTS
router.post("/events", createEvent);
router.get("/events", getEvents);
router.get("/events/:id", getEvent);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

// EVENT PARTICIPANTS
router.post("/event-participants", createEventParticipant);
router.get("/event-participants", getEventParticipants);
router.get("/event-participants/:user_id/:event_id", getUsersByEvent);
router.delete("/event-participants/:user_id/:event_id", deleteEventParticipant);

// COMMENTS

/// Listar todos os comentários
router.get("/comments", getComments);

// Buscar comentários por post
router.get("/comments/post/:post_id", getCommentsByPost);

// Buscar comentários por autor
router.get("/comments/author/:author_id", getCommentsByAuthor);

// Criar novo comentário
router.post("/comments", createComment);

// Deletar comentário
router.delete("/comments/:id", deleteComment);
export default router;
