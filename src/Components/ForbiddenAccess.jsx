import { useNavigate } from "react-router-dom";
import { ShieldX } from "lucide-react";

const ForbiddenAccess = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2a1f] via-[#12372A] to-[#1b4d3a] px-4">
      <div className="bg-white/95 backdrop-blur-xl max-w-md w-full rounded-3xl shadow-2xl p-8 sm:p-10 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <ShieldX className="text-red-600 w-8 h-8" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
          Access Forbidden
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base mb-8 leading-relaxed">
          You don’t have permission to view this page.
          Please return to a safe area or contact an administrator.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full rounded-xl border border-gray-300 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full rounded-xl bg-[#12372A] py-2.5 text-white hover:bg-[#0f2a1f] transition-colors"
          >
            Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default ForbiddenAccess;
