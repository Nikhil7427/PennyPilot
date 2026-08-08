import { useForm } from 'react-hook-form';
import { registerUser } from '../services/auth.service.js';
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

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
                error.response?.data?.message || "Registration Failed"
            );
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-slate-100'>
            <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
                <h1 className='text-3xl font-bold text-center mb-6'>
                    Create Account
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className='w-full border rounded-lg p-3'
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder='Email'
                            className='w-full border rounded-lg p-3'
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder='Password'
                            className='w-full border rounded-lg p-3'
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700'
                    >
                        Register
                    </button>

                    <p className="text-sm text-gray-600 text-center mt-4">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;