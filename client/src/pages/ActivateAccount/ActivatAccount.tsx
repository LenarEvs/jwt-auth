import { Layout } from "../../shared/ui/Layout";
import { Link } from "react-router-dom";

export const ActivateAccountPage = () => {
  return (
    <Layout>
      <div className="px-6 py-12 sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9">
          Your account was activated!{" "}
          <Link
            to="/profile"
            className="font-semibold text-primary hover:text-secondary"
          >
            Go to profile
          </Link>
        </h2>
      </div>
    </Layout>
  );
};
