import { Layout } from "../../shared/ui/Layout";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <Layout>
      <div className="px-6 py-12 sm:w-full sm:max-w-sm">
        <form>
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
          />
          <button className="btn btn-primary w-full">Sign in</button>
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
