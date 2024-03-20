import { Layout } from "../../shared/ui/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthApi, BaseLoginPayload } from "../../shared/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<BaseLoginPayload>({
    password: "",
    email: "",
  });
  const { mutate, error, isError, isPending } = useMutation({
    mutationFn: AuthApi.login,
    onSuccess: (response) => {
      localStorage.setItem("token", response.data.accessToken);
      navigate("/profile");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      return error;
    },
  });

  const handleChangeField = <T extends keyof BaseLoginPayload>(
    fieldName: T,
    value: BaseLoginPayload[T],
  ) => {
    setFormValues({ ...formValues, [fieldName]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formValues);
  };
  return (
    <Layout>
      <div className="px-6 py-12 sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-10 text-center text-2xl font-bold leading-9">
            Sign in
          </h2>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
          </div>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input input-bordered w-full mb-6"
            value={formValues.email}
            onChange={(e) => {
              handleChangeField("email", e.currentTarget.value);
            }}
          />
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm">
              Password
            </label>
            <div className="text-sm">
              <Link
                to="/reset-password"
                className="font-semibold text-primary hover:text-secondary"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="input input-bordered w-full  mb-6"
            value={formValues.password}
            onChange={(e) => {
              handleChangeField("password", e.currentTarget.value);
            }}
          />
          {isError && (
            <div role="alert" className="alert alert-error mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error.response?.data?.message}</span>
            </div>
          )}
          <button className="btn btn-primary w-full" disabled={isPending}>
            {isPending && <span className="loading loading-spinner"></span>}
            Sign in
          </button>
        </form>
        <div className="flex items-center justify-center mt-6">
          <Link
            to="/registration"
            className="font-semibold text-primary hover:text-secondary"
          >
            Create an account
          </Link>
        </div>
      </div>
    </Layout>
  );
};
