export const renderLoginPage = ({ onLoginSuccess }) => {
  const appElement = document.getElementById("app");

  appElement.innerHTML = `
    <div class="container">
      <div class="login-form">
        <h2>Форма входа</h2>
        <input type="text" class="login-input" placeholder="Логин" />
        <input type="password" class="password-input" placeholder="Пароль" />
        <button class="login-button">Войти</button>
        <div class="login-error" style="color: red; display: none;"></div>
      </div>
    </div>
  `;

  const loginButton = document.querySelector(".login-button");
  const loginInput = document.querySelector(".login-input");
  const passwordInput = document.querySelector(".password-input");
  const errorElement = document.querySelector(".login-error");

  loginButton.addEventListener("click", () => {
    const loginValue = loginInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (!loginValue || !passwordValue) {
      errorElement.textContent = "Введите логин и пароль";
      errorElement.style.display = "block";
      return;
    }

    errorElement.style.display = "none";
    loginButton.disabled = true;

    import("./api.js")
      .then(({ login }) => {
        return login(loginValue, passwordValue);
      })
      .then(() => {
        onLoginSuccess();
      })
      .catch((error) => {
        errorElement.textContent = error.message;
        errorElement.style.display = "block";
        loginButton.disabled = false;
      });
  });
};
