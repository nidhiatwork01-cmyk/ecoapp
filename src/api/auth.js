import axios from "axios";

export const userLogin = async (email, password) => {
  const url = "https://api.escuelajs.co/api/v1/auth/login";

  try {
    const { data } = await axios.post(url, {
      email: email,
      password: password
    });

    return data;
  } catch (err) {
    return err;
  }
};

export const userSignup = async ({ name, email, password }) => {
  const url = "https://api.escuelajs.co/api/v1/users/";

  try {
    const { data } = await axios.post(url, {
      name,
      email,
      password,
      avatar: "https://api.lorem.space/image/face?w=640&h=480" // REQUIRED FIELD
    });

    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
