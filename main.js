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
