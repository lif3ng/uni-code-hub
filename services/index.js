import axios from "axios";
const baseURL = "https://api.github.com";

const instance = axios.create({
  baseURL,
});

instance.interceptors.response.use(({ data }) => data);

export const checkCtx = async (type, name) => {
  console.log({ type, name });
  if (type === "github") {
    try {
      const { type } = await instance.get(`/users/${name}`);
      return {
        type: "github",
        isUser: type === "User",
        name,
      };
    } catch (e) {
      throw "Not fount user/org";
    }
  }
};
export const getUserRepos = (user) => {
  return instance.get(`/users/${user}/repos`, {
    params: {
      sort: "updated",
    },
  });
};
export const getRepo = (repoStr) => {
  return instance.get(`repos/${repoStr}`);
};
