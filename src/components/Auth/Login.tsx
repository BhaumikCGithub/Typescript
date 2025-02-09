import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { login as AuthLogin} from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login} from "../../store/authSlice";

type FormValues = {
    username: string;
    password: string;
};

  
const Login: React.FC = () => {
    const {register, handleSubmit} = useForm<FormValues>();
    const navigate  =   useNavigate();
    const dispatch = useDispatch();

    const loginUser: SubmitHandler<FormValues> = async (data: any) => {
        try{ 
            const response = await AuthLogin(data);
            if(response.status === 400){
                const userData =response.data;
                if(userData) { 
                    //dispatch(login(userData));
                    navigate("/dashboard");
                }
                
            }
        } catch {
            console.log("Login failed");
        }
    }
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gradient-to-br from-blue-700 to-purple-700 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-5xl font-bold">Welcome to Sales App!</h1>
        <p className="mt-4 text-lg text-center max-w-md">
          Boost your sales efficiency with automation. Manage tasks effortlessly and increase productivity!
        </p>
      </div>

      <div className="w-1/2 flex justify-center items-center p-10 bg-white shadow-lg rounded-lg">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold">Welcome Back!</h2>
          
          <form className="mt-6" onSubmit={handleSubmit(loginUser)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-start font-medium">Username</label>
              <input
                type="text"
                autoComplete="off"
                placeholder="Enter your username"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("username", { required: true })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-start font-medium">Password</label>
              <input
                type="password"
                
                autoComplete="off"
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password", { required: true })}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <a href="#" className="text-blue-600">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold mt-4 hover:bg-blue-400"
            >
              Sign In
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;