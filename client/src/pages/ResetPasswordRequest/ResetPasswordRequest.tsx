import { Layout } from "../../shared/ui/Layout";

export const ResetPasswordRequestPage = () => {
  return (
    <Layout>
      <div className="px-6 py-12 sm:w-full sm:max-w-sm">
        <form>
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
          />

          <button className="btn btn-primary w-full">Reset</button>
        </form>
      </div>
    </Layout>
  );
};
