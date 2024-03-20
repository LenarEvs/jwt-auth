import { Layout } from "../../shared/ui/Layout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthApi } from "../../shared/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ProfilePage = () => {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: AuthApi.getProfileInfo,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: AuthApi.logout,
    onSuccess: () => {
      localStorage.removeItem("token");
      navigate("/login");
    },
  });
  const { fullName, age, email, isActivated } = data?.data || {};

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <Layout>
      <div className="px-6 py-12 sm:w-full sm:max-w-sm">
        <h2 className="mb-6 text-center text-2xl font-bold leading-9">
          Private profile info
        </h2>
        <div className="card w-96 bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Full Name: {fullName}</h2>
            <h2 className="card-title">Age: {age}</h2>
            <h2 className="card-title">Email: {email}</h2>
            <h2 className="card-title mb-6">
              Activated: {String(isActivated)}
            </h2>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary w-full"
                disabled={isPending}
                onClick={() => mutate()}
              >
                {isPending && <span className="loading loading-spinner"></span>}
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
