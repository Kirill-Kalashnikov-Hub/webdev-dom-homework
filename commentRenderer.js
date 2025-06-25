import { comments } from "./data.js";

export function renderComments() {
  const commentsList = document.querySelector(".comments");
  commentsList.innerHTML = "";

  comments.forEach((comment, index) => {
    const commentElement = document.createElement("li");
    commentElement.className = "comment";

    commentElement.innerHTML = `
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text" data-index="${index}">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-index="${index}"></button>
        </div>
      </div>
    `;

    commentsList.appendChild(commentElement);
  });
}
