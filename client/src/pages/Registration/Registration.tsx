import { Layout } from "../../shared/ui/Layout";
import { Link } from "react-router-dom";

export const RegistrationPage = () => {
  return (
    <Layout>
      <div className="px-6 py-12 sm:w-full sm:max-w-sm">
        <form>
          <h2 className="mb-10 text-center text-2xl font-bold leading-9">
            Sign up
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
            <label htmlFor="fullName" className="block text-sm">
              Full name
            </label>
          </div>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            className="input input-bordered w-full mb-6"
          />
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="age" className="block text-sm">
              Age
            </label>
          </div>
          <input
            id="age"
            name="age"
            type="number"
            required
            className="input input-bordered w-full mb-6"
          />
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
          />
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="passwordRepeat" className="block text-sm">
              Repeat password
            </label>
          </div>
          <input
            id="password"
            name="passwordRepeat"
            type="password"
            required
            className="input input-bordered w-full  mb-6"
          />
          <button className="btn btn-primary w-full">Sign up</button>
        </form>
        <div className="flex items-center justify-center mt-6">
          <Link
            to="/login"
            className="font-semibold text-primary hover:text-secondary"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </Layout>
  );
};
