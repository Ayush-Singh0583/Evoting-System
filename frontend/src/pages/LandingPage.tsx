import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <p>Welcome to our e-voting platform!</p>
      <Link to="/admin/login">
        <button
          className="w-full mt-2 rounded-xl bg-blue-600 py-2.5 text-white
          font-semibold hover:bg-blue-700
          active:scale-[0.98] transition
          disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Admin Login
        </button>
      </Link>
      <Link to="/login">
        <button
          className="w-full mt-2 rounded-xl bg-green-600 py-2.5 text-white
          font-semibold hover:bg-green-700
          active:scale-[0.98] transition
          disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Voter Login
        </button>
      </Link>
    </div>
  );
};
