import { comments } from "./data.js";

const commentsList = document.querySelector(".comments");

export function renderComments() {
  commentsList.innerHTML = "";

  comments.forEach((comment, index) => {
    // Получаем дату из объекта комментария
    const commentDate = comment.date;

    const commentHTML = `
        <li class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${commentDate}</div>
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
        </li>
      `;
    commentsList.innerHTML += commentHTML;
  });
}
