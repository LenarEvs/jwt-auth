import { Layout } from "../../shared/ui/Layout";
import { useState } from "react";
import { AuthApi } from "../../shared/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const ResetPasswordRequestPage = () => {
  const [email, setEmail] = useState<string>("");
  const { mutate, error, isSuccess, isError, isPending } = useMutation({
    mutationFn: AuthApi.resetPasswordRequest,
    onError: (error: AxiosError<{ message: string }>) => {
      return error;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(email);
  };

  if (isSuccess) {
    return (
      <Layout>
        <h2 className="mb-10 text-center text-2xl font-bold leading-9">
          Reset email has been sent to the specified email address.
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-6 py-12 sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-10 text-center text-2xl font-bold leading-9">
            Enter your Email for reset password!
          </h2>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            className="input input-bordered w-full mb-6"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
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
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};
