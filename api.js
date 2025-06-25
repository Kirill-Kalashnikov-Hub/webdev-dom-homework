const host = "https://wedev-api.sky.pro/api/v2/:kirill-kalashnikov-hub";

let token = null;

export const setToken = (newToken) => {
  token = newToken;
};

export const login = (login, password) => {
  return fetch(host + "/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Неверный логин или пароль");
      }
      return response.json();
    })
    .then((data) => {
      setToken(data.user.token);
      localStorage.setItem("token", data.user.token);
      localStorage.setItem("userName", data.user.name);
      return data;
    });
};

export const fetchComments = () => {
  return fetch(host + "/comments", {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Ошибка сервера");
      }
      if (!response.ok) {
        throw new Error("Ошибка при загрузке комментариев");
      }
      return response.json();
    })
    .then((responseData) => {
      return responseData.comments.map((comment) => {
        const date = new Date(comment.date);
        const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(
          date.getMonth() + 1
        ).padStart(2, "0")}.${date.getFullYear()} ${String(
          date.getHours()
        ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

        return {
          name: comment.author.name,
          date: formattedDate,
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });
    });
};

export const postComment = (text) => {
  return fetch(host + "/comments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text,
    }),
  }).then((response) => {
    if (response.status === 401) {
      throw new Error("Ошибка авторизации");
    }
    if (response.status === 400) {
      throw new Error("Комментарий должен быть не короче 3 символов");
    }
    if (response.status === 500) {
      throw new Error("Ошибка сервера");
    }
    return response.json();
  });
};
