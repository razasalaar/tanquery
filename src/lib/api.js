"use client";
export const registerUser = async ({ username, email, password }) => {
  const res = await fetch("https://api.freeapi.app/api/v1/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Register failed");
  return data;
};

export const loginUser = async ({ username, password }) => {
  try {
    const res = await fetch("https://api.freeapi.app/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok && data.data?.token) {
      // ✅ Store token for future requests like logout
      localStorage.setItem("accessToken", data.data.token);
    }

    return {
      success: res.ok,
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("Unexpected error during login:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
      data: null,
    };
  }
};

export const logoutUser = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return {
      success: false,
      message: "No access token found",
      data: null,
    };
  }

  try {
    const res = await fetch("https://api.freeapi.app/api/v1/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    // Remove access token from localStorage
    localStorage.removeItem("accessToken");

    return {
      success: res.ok,
      message: data.message || "Logged out successfully",
      data: null,
    };
  } catch (error) {
    console.error("Unexpected error during logout:", error);
    return {
      success: false,
      message: "Something went wrong during logout. Please try again.",
      data: null,
    };
  }
};
