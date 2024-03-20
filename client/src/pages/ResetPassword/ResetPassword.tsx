import { Layout } from "../../shared/ui/Layout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthApi } from "../../shared/api";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const params = useParams<{ resetLink: string }>();
  const [formValues, setFormValues] = useState<{
    password: string;
    repeatPassword: string;
  }>({
    password: "",
    repeatPassword: "",
  });
  const query = useQuery({
    queryKey: ["reset-password"],
    queryFn: () => AuthApi.validatePasswordLink(params.resetLink || ""),
    retry: false,
  });

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: AuthApi.resetPassword,
    onSuccess: () => {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
  });

  const handleChangeField = <T extends keyof typeof formValues>(
    fieldName: T,
    value: string,
  ) => {
    setFormValues({ ...formValues, [fieldName]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValues.password !== formValues.repeatPassword) {
      return;
    }
    mutate({
      passwordLink: params.resetLink || "",
      password: formValues.password,
    });
  };

  if (isSuccess) {
    return (
      <Layout>
        <h2 className="mb-10 text-center text-2xl font-bold leading-9">
          Password successfully changed
        </h2>
      </Layout>
    );
  }

  if (query.isError || query.isPending || isSuccess) {
    return (
      <Layout>
        <h2 className="mb-10 text-center text-2xl font-bold leading-9">
          {isSuccess && "Password successfully changed"}
          {query.isError && "Incorrect link"}
          {query.isPending && (
            <span className="loading loading-spinner loading-lg ml-auto mr-auto flex"></span>
          )}
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-6 py-12 sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-10 text-center text-2xl font-bold leading-9">
            Enter your new password
          </h2>

          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm">
              Password
            </label>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="input input-bordered w-full  mb-6"
            value={formValues.password}
            onChange={(e) =>
              handleChangeField("password", e.currentTarget.value)
            }
          />
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="repeatPassword" className="block text-sm">
              Repeat password
            </label>
          </div>
          <input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            required
            className="input input-bordered w-full  mb-6"
            value={formValues.repeatPassword}
            onChange={(e) =>
              handleChangeField("repeatPassword", e.currentTarget.value)
            }
          />
          <button className="btn btn-primary w-full" disabled={isPending}>
            {isPending && <span className="loading loading-spinner"></span>}Save
            password
          </button>
        </form>
      </div>
    </Layout>
  );
};
