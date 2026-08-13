import { useForm } from "react-hook-form";
import { registerUser } from "../services/auth.service.js";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { isAuthenticated, login } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const onSubmit = async (data) => {
        try {
            const response = await registerUser(data);

            login(response.token);

            alert("Registration Successful!");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-md">

                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 shadow-lg shadow-blue-200 mb-4">
                        <span className="text-2xl font-bold text-white">
                            P
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Join PennyPilot
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Start managing your finances smarter
                    </p>
                </div>

                {/* Register Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-7 sm:p-8">

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Create your account
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            It only takes a minute to get started
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter name"
                                className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none transition
                                    ${
                                        errors.name
                                            ? "border-red-400 focus:ring-2 focus:ring-red-100"
                                            : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                    }`}
                                {...register("name", {
                                    required: "Name is required",
                                })}
                            />

                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1.5">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter email"
                                className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none transition
                                    ${
                                        errors.email
                                            ? "border-red-400 focus:ring-2 focus:ring-red-100"
                                            : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                    }`}
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />

                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1.5">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter password"
                                className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none transition
                                    ${
                                        errors.password
                                            ? "border-red-400 focus:ring-2 focus:ring-red-100"
                                            : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                    }`}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                })}
                            />

                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1.5">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md shadow-blue-200"
                        >
                            Create Account
                        </button>

                    </form>

                    {/* Login */}
                    <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>

                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                    © 2026 PennyPilot. Manage your money smarter.
                </p>

            </div>
        </div>
    );
}

export default Register;