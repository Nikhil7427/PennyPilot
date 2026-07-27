import { useForm } from "react-hook-form";
import { loginUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext.jsx"
import { use } from "react";
import { useNavigate, Navigate } from "react-router-dom";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { login } = useAuth();
    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data);

            login(response.token);

            navigate("/");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Login Failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border rounded-lg p-3"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border rounded-lg p-3"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;