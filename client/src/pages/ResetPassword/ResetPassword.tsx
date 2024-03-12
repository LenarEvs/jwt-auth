import { Layout } from "../../shared/ui/Layout";
export const ResetPasswordPage = () => {
  return (
    <Layout>
      <div className="px-6 py-12 sm:w-full sm:max-w-sm">
        <form>
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
          />
          <button className="btn btn-primary w-full">Save password</button>
        </form>
      </div>
    </Layout>
  );
};
