import { fetchCommentsFromAPI } from "./api.js"
import { updateCommentsData, setLoading } from "./comment.js"
import { renderComments, showCommentsSection, showAuthSection } from "./ui.js"
import { setupAddComment, setupAuth, setupLoginLink } from "./listeners.js"
import { addGlobalStyles } from "./utilits.js"

async function initApp() {
    addGlobalStyles()

    // Показываем раздел комментариев по умолчанию
    showCommentsSection()

    try {
        setLoading(true)
        renderComments()

        const data = await fetchCommentsFromAPI()
        updateCommentsData(data.comments)
    } catch (error) {
        console.error("Ошибка загрузки:", error)
    } finally {
        setLoading(false)
        renderComments()
    }

    setupAddComment(
        document.querySelector(".add-form-text"),
        document.querySelector(".add-form-button"),
        document.querySelector(".error-message"),
    )

    setupAuth(
        document.querySelector(".auth-form-login"),
        document.querySelector(".auth-form-password"),
        document.querySelector(".auth-form-button"),
        document.querySelector(".auth-error-message"),
    )

    setupLoginLink(document.querySelector(".login-link"))
}

document.addEventListener("DOMContentLoaded", initApp)

document.querySelector(".container").innerHTML = `
    <div id="auth-section" style="display: none">
        <div class="auth-form">
            <h2>Авторизация</h2>
            <input
                type="text"
                class="auth-form-login"
                placeholder="Логин"
            />
            <input
                type="password"
                class="auth-form-password"
                placeholder="Пароль"
            />
            <div class="auth-form-row">
                <button class="auth-form-button">Войти</button>
            </div>
            <div
                class="auth-error-message"
                style="color: red; display: none"
            ></div>
        </div>
    </div>

    <div id="comments-section" style="display: none">
        <ul class="comments"></ul>
        <div class="add-form">
            <input
                type="text"
                class="add-form-name"
                placeholder="Ваше имя"
                readonly
            />
            <textarea
                type="textarea"
                class="add-form-text"
                placeholder="Введите ваш комментарий"
                rows="4"
            ></textarea>
            <div class="add-form-row">
                <button class="add-form-button">Написать</button>
            </div>
            <div
                class="error-message"
                style="color: red; display: none"
            ></div>
        </div>
        <div class="auth-link">
            <a href="#" class="login-link"
                >Чтобы добавить комментарий, авторизуйтесь</a
            >
        </div>
    </div>
`
