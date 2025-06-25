import { renderComments } from "./commentRenderer.js";
import { initializeEventHandlers } from "./eventHandlers.js";
import { updateComments } from "./data.js";
import { fetchComments, setToken } from "./api.js";
import { renderLoginPage } from "./loginPage.js";

export const renderCommentsPage = () => {
  const appElement = document.getElementById("app");
  const userName = localStorage.getItem("userName");
  const isAuthorized = !!localStorage.getItem("token");

  appElement.innerHTML = `
    <div class="container">
      <ul class="comments"></ul>
      ${
        isAuthorized
          ? `
        <div class="add-form">
          <input 
            type="text" 
            class="add-form-name" 
            value="${userName}" 
            readonly 
          />
          <textarea 
            class="add-form-text" 
            placeholder="Введите ваш комментарий" 
            rows="4"
          ></textarea>
          <div class="add-form-row">
            <button class="add-form-button">Написать</button>
          </div>
        </div>
      `
          : `
        <div class="auth-prompt">
          <p>Чтобы добавить комментарий, <a href="#" class="auth-link">авторизуйтесь</a></p>
        </div>
      `
      }
      <div class="form-loading" style="display: none;">Загрузка...</div>
    </div>
  `;

  // Обработчик ссылки авторизации
  const authLink = document.querySelector(".auth-link");
  if (authLink) {
    authLink.addEventListener("click", (e) => {
      e.preventDefault();
      renderLoginPage({
        onLoginSuccess: () => renderCommentsPage(),
      });
    });
  }

  const loadingElement = document.querySelector(".form-loading");
  loadingElement.style.display = "block";

  fetchComments()
    .then((fetchedComments) => {
      updateComments(fetchedComments);
      renderComments();
      initializeEventHandlers();
    })
    .catch((error) => {
      console.error("Ошибка при загрузке комментариев:", error);
    })
    .finally(() => {
      loadingElement.style.display = "none";
    });
};

// Проверяем токен при загрузке
const token = localStorage.getItem("token");
if (token) {
  setToken(token);
}
renderCommentsPage();
