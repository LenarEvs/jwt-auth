import { Layout } from "../../shared/ui/Layout";

export const ProfilePage = () => {
  return (
    <Layout>
      <div className="px-6 py-12 sm:w-full sm:max-w-sm">
        <h2 className="mb-6 text-center text-2xl font-bold leading-9">
          Private profile info
        </h2>
        <div className="card w-96 bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Full Name: NNNNNNNNNN</h2>
            <h2 className="card-title">Age: NNNNNNNNNN</h2>
            <h2 className="card-title">Email: NNNNNNNNNN</h2>
            <h2 className="card-title mb-6">Activated: false</h2>
            <div className="card-actions justify-end">
              <button className="btn btn-primary w-full">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
