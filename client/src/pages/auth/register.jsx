import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ShoppingBag, Github, Twitter } from 'lucide-react';

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <div className="flex justify-center">
          <ShoppingBag className="w-12 h-12 text-primary" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
          Create new account
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?
          <Link
            className="ml-2 font-medium transition-colors text-primary hover:text-primary-dark"
            to="/auth/login"
          >
            Sign in
          </Link>
        </p>
      </div>
      <div className="mt-8 space-y-6">
        <CommonForm
          formControls={registerFormControls}
          buttonText="Sign Up"
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
        <div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-background">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            <button
              type="button"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 transition-colors bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <span className="sr-only">Sign up with Email</span>
              <Mail className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 transition-colors bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <span className="sr-only">Sign up with GitHub</span>
              <Github className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 transition-colors bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <span className="sr-only">Sign up with Twitter</span>
              <Twitter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;
