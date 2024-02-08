import axios from "axios";

const api = "http://localhost:8081";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const publicGet = async (endpoint) => {
  try {
    const response = await axios.get(`${api}${endpoint}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const publicPost = async (endpoint, body) => {
  try {
    const response = await axios.post(`${api}${endpoint}`, body, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const privateGet = async (endpoint, token) => {
  const privateConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(`${api}${endpoint}`, privateConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const privatePost = async (endpoint, token, body) => {
  const privateConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(`${api}${endpoint}`, body, privateConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const privatePut = async (endpoint, token, body) => {
  const privateConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(`${api}${endpoint}`, body, privateConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const privateDelete = async (endpoint, token) => {
  const privateConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.delete(`${api}${endpoint}`, privateConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const privatePatch = async (endpoint, token, body) => {
  const privateConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.patch(
      `${api}${endpoint}`,
      body,
      privateConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const publicPatch = async (endpoint, body) => {
  try {
    const response = await axios.patch(`${api}${endpoint}`, body, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const publicPut = async (endpoint) => {
  try {
    const response = await axios.put(`${api}${endpoint}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
