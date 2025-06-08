import { escapeHTML, getCurrentDateTime } from "./utils.js";
import { comments, updateComments } from "./data.js";
import { renderComments } from "./commentRenderer.js";
import { postComment } from "./api.js";

export function initializeEventHandlers() {
  const nameInput = document.querySelector(".add-form-name");
  const commentInput = document.querySelector(".add-form-text");
  const addButton = document.querySelector(".add-form-button");
  const commentsList = document.querySelector(".comments");
  const addForm = document.querySelector(".add-form");
  const loadingIndicator = document.querySelector(".form-loading");

  // Обработчик клика на лайк
  const handleLikeClick = (event) => {
    event.stopPropagation();
    const index = event.target.dataset.index;
    const newComments = [...comments]; // Создаем копию массива
    newComments[index].isLiked = !newComments[index].isLiked;
    newComments[index].likes += newComments[index].isLiked ? 1 : -1;
    updateComments(newComments); // Обновляем массив комментариев
    renderComments();
  };

  // Обработчик клика на комментарий
  const handleCommentClick = (event) => {
    const index = event.target.dataset.index;
    const comment = comments[index];
    commentInput.value = `> ${comment.text}\n`;
  };

  function handleNameInputChange() {}

  function handleCommentInputChange() {}

  // Обработчик отправки формы
  const handleAddButtonClick = async () => {
    let name = nameInput.value.trim();
    let text = commentInput.value.trim();

    if (!name || !text) {
      alert("Заполните все поля!");
      return;
    }

    name = escapeHTML(name);
    text = escapeHTML(text);

    // Показываем индикатор загрузки и скрываем форму
    loadingIndicator.style.display = "block";
    addForm.style.display = "none";

    try {
      await postComment(text, name); // Отправляем комментарий на сервер

      const newComment = {
        name: name,
        date: getCurrentDateTime(),
        text: text,
        likes: 0,
        isLiked: false,
      };

      const newComments = [...comments, newComment]; // Создаем копию массива и добавляем новый комментарий
      updateComments(newComments); // Обновляем массив комментариев
      renderComments(); // Обновляем отображение комментариев

      nameInput.value = "";
      commentInput.value = "";
    } catch (error) {
      console.error("Ошибка при отправке комментария:", error);
      alert("Произошла ошибка при отправке комментария.");
    } finally {
      // Скрываем индикатор загрузки и показываем форму после успешной отправки или в случае ошибки
      loadingIndicator.style.display = "none";
      addForm.style.display = "flex"; // Или "block", в зависимости от вашего стиля
    }
  };

  // Привязка обработчиков
  nameInput.addEventListener("input", handleNameInputChange);
  commentInput.addEventListener("input", handleCommentInputChange);
  addButton.addEventListener("click", handleAddButtonClick);

  // Обработчик событий на списке комментариев
  commentsList.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-button")) {
      handleLikeClick(event);
    }
    if (event.target.classList.contains("comment-text")) {
      handleCommentClick(event);
    }
  });
}

// При инициализации показываем форму
document.querySelector(".form-loading").style.display = "none";
document.querySelector(".add-form").style.display = "flex";
