import { ReactNode } from "react";
interface AuthTemplateProps {
  title: string;
  error?: string;
  children: ReactNode;
}

const AuthTemplate = ({ title, error, children }: AuthTemplateProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white sm:bg-auth-pattern sm:bg-cover sm:bg-center">
      <div className="absolute inset-0 hidden sm:block bg-gradient-to-br from-teal-500/30 to-emerald-500/30 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-md p-4 sm:p-8">
        <div className="sm:bg-white sm:rounded-3xl sm:shadow-xl sm:overflow-hidden">
          <div className="px-4 sm:px-8 pt-8 pb-6">
            <h2 className="text-3xl font-bold text-gray-800 text-left sm:text-center mb-8">
              {title}
            </h2>

            {error && (
              <div
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-2"
                role="alert"
              >
                {error}
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate;
