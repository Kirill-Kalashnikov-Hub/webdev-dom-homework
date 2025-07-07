export function escapeHtml(unsafe) {
    if (typeof unsafe !== "string") return unsafe
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}

export function addGlobalStyles() {
    const style = document.createElement("style")
    style.textContent = `
        .loading {
            padding: 20px;
            text-align: center;
            color: #555;
            font-size: 18px;
        }
        .add-form-button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
        @keyframes rotating {
            from { transform: rotate(0deg); }
            25% { transform: rotate(30deg); }
            75% { transform: rotate(-30deg); }
            to { transform: rotate(0deg); }
        }
        .-loading-like {
            animation: rotating 1s linear infinite;
            opacity: 0.7;
            pointer-events: none;
        }
        .like-button {
            transition: all 0.3s;
            cursor: pointer;
        }
        .like-button:hover:not(.-loading-like) {
            transform: scale(1.1);
        }
    `
    document.head.appendChild(style)
}
