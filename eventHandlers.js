import { comments, updateComments } from "./data.js";
import { renderComments } from "./commentRenderer.js";
import { fetchComments, postComment } from "./api.js";

export function initializeEventHandlers() {
  const commentInput = document.querySelector(".add-form-text");
  const addButton = document.querySelector(".add-form-button");
  const commentsList = document.querySelector(".comments");

  // Обработчик клика на лайк
  const handleLikeClick = (event) => {
    const index = event.target.dataset.index;
    const newComments = [...comments];
    newComments[index].isLiked = !newComments[index].isLiked;
    newComments[index].likes += newComments[index].isLiked ? 1 : -1;
    updateComments(newComments);
    renderComments();
  };

  // Обработчик клика на комментарий
  const handleCommentClick = (event) => {
    const index = event.target.dataset.index;
    const comment = comments[index];
    commentInput.value = `> ${comment.text}\n`;
  };

  // Обработчик отправки комментария
  const handleAddButtonClick = async () => {
    const text = commentInput.value.trim();

    if (!text) {
      alert("Комментарий не может быть пустым");
      return;
    }

    const loadingElement = document.querySelector(".form-loading");
    loadingElement.style.display = "block";

    try {
      await postComment(text);
      const newComments = await fetchComments();
      updateComments(newComments);
      renderComments();
      commentInput.value = "";
    } catch (error) {
      alert(error.message);
    } finally {
      loadingElement.style.display = "none";
    }
  };

  // Обработчики для комментариев
  if (addButton) {
    addButton.addEventListener("click", handleAddButtonClick);
  }

  if (commentsList) {
    commentsList.addEventListener("click", (event) => {
      if (event.target.classList.contains("like-button")) {
        handleLikeClick(event);
      }
      if (event.target.classList.contains("comment-text")) {
        handleCommentClick(event);
      }
    });
  }
}
