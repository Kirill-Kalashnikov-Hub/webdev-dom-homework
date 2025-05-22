import { escapeHTML, getCurrentDateTime } from './utils.js';
import { comments } from './data.js';
import { renderComments } from './commentRenderer.js';

export function initializeEventHandlers() {
    const nameInput = document.querySelector(".add-form-name");
    const commentInput = document.querySelector(".add-form-text");
    const addButton = document.querySelector(".add-form-button");

    // Обработчик клика на лайк
    function handleLikeClick(event) {
        event.stopPropagation(); // Предотвращаем всплытие события
        const index = event.target.dataset.index;
        comments[index].isLiked = !comments[index].isLiked;
        comments[index].likes += comments[index].isLiked ? 1 : -1;
        renderComments();
    }

    // Обработчик клика на комментарий
    function handleCommentClick(event) {
        const index = event.target.dataset.index;
        const comment = comments[index];
        commentInput.value = `> ${comment.text}\n`;
    }

    function handleNameInputChange() {}

    function handleCommentInputChange() {}

    // Обработчик отправки формы
    function handleAddButtonClick() {
        let name = nameInput.value.trim();
        let text = commentInput.value.trim();

        if (!name || !text) {
            alert("Заполните все поля!");
            return;
        }

        name = escapeHTML(name);
        text = escapeHTML(text);

        comments.push({
            name: name,
            date: getCurrentDateTime(),
            text: text,
            likes: 0,
            isLiked: false,
        });

        renderComments();
        nameInput.value = "";
        commentInput.value = "";
    }

    // Привязка обработчиков
    nameInput.addEventListener("input", handleNameInputChange);
    commentInput.addEventListener("input", handleCommentInputChange);
    addButton.addEventListener("click", handleAddButtonClick);

    const commentsList = document.querySelector(".comments");

    commentsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('like-button')) {
            handleLikeClick(event);
        }
        if (event.target.classList.contains('comment-text')) {
            handleCommentClick(event);
        }
    });
}