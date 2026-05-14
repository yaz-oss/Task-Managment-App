import {
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

const GoogleSuccess = () => {

  const navigate =
    useNavigate();

  useEffect(() => {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const token =
      params.get("token");

    const role =
      params.get("role") || "user";

    const username =
      params.get("username") || "";

    if (token) {

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "role",
        role
      );

      if (username) {

        localStorage.setItem(
          "username",
          username
        );
      }

      if (role === "admin") {

        navigate("/admin");
      }

      else {

        navigate("/dashboard");
      }
    }

  }, []);

  return <div>Logging in...</div>;
};

export default
  GoogleSuccess;
