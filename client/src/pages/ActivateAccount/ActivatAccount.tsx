import { Layout } from "../../shared/ui/Layout";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthApi } from "../../shared/api";

export const ActivateAccountPage = () => {
  const params = useParams<{ activateLink: string }>();
  const { isError, isLoading, isSuccess } = useQuery({
    queryKey: ["activate"],
    queryFn: () => AuthApi.activateAccount(params.activateLink || ""),
    retry: false,
  });

  return (
    <Layout>
      <div className="px-6 py-12 sm:w-full sm:max-w-sm">
        {isLoading && (
          <span className="loading loading-spinner loading-lg ml-auto mr-auto flex"></span>
        )}
        {isError && "Incorrect link"}
        {isSuccess && (
          <h2 className="text-center text-2xl font-bold leading-9">
            Your account was activated!{" "}
            <Link
              to="/profile"
              className="font-semibold text-primary hover:text-secondary"
            >
              Go to profile
            </Link>
          </h2>
        )}
      </div>
    </Layout>
  );
};
