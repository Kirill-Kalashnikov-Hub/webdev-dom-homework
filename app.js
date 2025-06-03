import { renderComments } from "./commentRenderer.js";
import { initializeEventHandlers } from "./eventHandlers.js";
import { comments } from "./data.js";
import { updateComments } from "./data.js";
import { fetchComments } from "./api.js";
fetchComments().then((data) => {
  updateComments(data);
  renderComments();
});

initializeEventHandlers(comments, renderComments);
