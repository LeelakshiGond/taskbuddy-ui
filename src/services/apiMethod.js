import client from "./apiClient";

const get = async (url, config) => {
  const result = await client.get(url, config);
  return result;
};

const post = async (url, body, config) => {
  const result = await client.post(url, body, config);

  return result;
};

const put = async (url, body, config) => {
  const result = await client.put(url, body, config);

  return result;
};

const del = async (url, config) => {
  const result = await client.delete(url, config);
};

export { get, post, put, del };
