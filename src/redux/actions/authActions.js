import { toast } from "react-toastify";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const signUp = (values) => async (dispatch) => {
    console.log("Signup form values:", values);
    dispatch({ type: SIGNUP_REQUEST });
    try{
        const res = await fetch("https://mern-stack-tutorial-backend.onrender.com/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    role: "customer"
                }),
                credentials: "include",
            }
        )
        const data = await res.json();
        if(!res.ok) {
            throw new Error(data.message);
        }
        localStorage.setItem("token", data.token);
        toast.success("Registration successful!");
        dispatch({ type: SIGNUP_SUCCESS, payload: data });
        return true;
    }
    catch (error) {
        dispatch({ type: SIGNUP_FAILURE, payload: error.message });
        toast.error(`${error.message}`);
    }
}

export const login = (values) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const res = await fetch("https://mern-stack-tutorial-backend.onrender.com/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            }
        )
        const data = await res.json();
        if(!res.ok) {
            throw new Error(data.message || "Failed to login");
        }
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        return true;
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        toast.error(`${error.message}`);
    }
}