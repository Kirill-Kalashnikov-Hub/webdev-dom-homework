"use strict"
const nameInput = document.querySelector(".add-form-name")
const commentInput = document.querySelector(".add-form-text")
const addButton = document.querySelector(".add-form-button")
const commentsList = document.querySelector(".comments")
const errorMessage = document.querySelector(".error-message")

const commentsData = [
    {
        name: "Глеб Фокин",
        text: "Это будет первый комментарий на этой странице",
        date: "12.02.22 12:18",
        likes: 3,
        liked: false,
    },
    {
        name: "Варвара Н.",
        text: "Мне нравится как оформлена эта страница! ❤",
        date: "13.02.22 19:22",
        likes: 75,
        liked: true,
    },
]

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}

function renderComments() {
    commentsList.innerHTML = commentsData
        .map(
            (comment, index) => `
                <li class="comment" data-index="${index}">
                    <div class="comment-header">
                        <div>${escapeHtml(comment.name)}</div>
                        <div>${comment.date}</div>
                    </div>
                    <div class="comment-body">
                        <div class="comment-text">
                            ${escapeHtml(comment.text)}
                        </div>
                    </div>
                    <div class="comment-footer">
                        <div class="likes">
                            <span class="likes-counter">${comment.likes}</span>
                            <button class="like-button ${comment.liked ? "-active-like" : ""}"></button>
                        </div>
                    </div>
                </li>
            `,
        )
        .join("")
    attachLikeHandlers()
    attachCommentHandlers()
}

function handleLikeClick(index) {
    commentsData[index].liked = !commentsData[index].liked
    commentsData[index].likes += commentsData[index].liked ? 1 : -1
    renderComments()
}

function attachLikeHandlers() {
    const likeButtons = document.querySelectorAll(".like-button")
    likeButtons.forEach((button, index) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation()
            handleLikeClick(index)
        })
    })
}

function attachCommentHandlers() {
    const commentItems = document.querySelectorAll(".comment")
    commentItems.forEach((commentItem) => {
        commentItem.addEventListener("click", () => {
            const index = commentItem.getAttribute("data-index")
            const comment = commentsData[index]
            const safeName = escapeHtml(comment.name)
            const safeText = escapeHtml(comment.text)

            nameInput.value = safeName
            commentInput.value = `> ${safeText}`
        })
    })
}

addButton.addEventListener("click", () => {
    const name = nameInput.value.trim()
    const comment = commentInput.value.trim()
    const currentDate = new Date().toLocaleString()

    if (!name || !comment) {
        errorMessage.textContent = "Пожалуйста, заполните все поля."
        errorMessage.style.display = "block"
        return
    } else {
        errorMessage.style.display = "none"
    }

    commentsData.push({
        name: escapeHtml(name),
        text: escapeHtml(comment),
        date: currentDate,
        likes: 0,
        liked: false,
    })

    renderComments()

    nameInput.value = ""
    commentInput.value = ""
})

renderComments()
