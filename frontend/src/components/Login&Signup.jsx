import { useState } from "react";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login"); // State for active tab
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup states
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] =
    useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log({ Username: signupUsername, password: loginPassword });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Add your signup logic here
    console.log({
      name: signupName,
      email: signupEmail,
      phone: signupPhone,
      username: signupUsername,
      password: signupPassword,
    });
    // Reset form or redirect after signup
  };

  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  const toggleSignupPasswordVisibility = () => {
    setShowSignupPassword(!showSignupPassword);
  };

  const toggleSignupConfirmPasswordVisibility = () => {
    setShowSignupConfirmPassword(!showSignupConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#323C4D] to-[#0F2247] px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-yellow-400 rounded-full p-3 sm:p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c1.38 0 2.5 1.12 2.5 2.5S13.38 13 12 13s-2.5-1.12-2.5-2.5S10.62 8 12 8zM12 13v8m0-8H8m4 0h4"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-semibold text-center text-gray-900">
          Agot's Express
        </h1>
        <p className="text-center text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
          Authentic Filipino Cuisine
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-4 sm:mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("login")}
            className={`px-3 sm:px-4 py-2 font-medium text-sm sm:text-base ${
              activeTab === "login"
                ? "border-b-2 border-yellow-400 text-gray-900"
                : "text-gray-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`px-3 sm:px-4 py-2 font-medium text-sm sm:text-base ${
              activeTab === "signup"
                ? "border-b-2 border-yellow-400 text-gray-900"
                : "text-gray-400"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Sliding Form Container */}
        <div className="overflow-hidden">
          <div
            className={`flex transition-transform duration-500 ${
              activeTab === "login" ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Login Form */}
            <div className="w-full flex-shrink-0">
              <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1 text-sm sm:text-base">
                    Username:
                  </label>
                  <input
                    type="username"
                    placeholder="Sample01"
                    value={loginEmail}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block text-gray-700 mb-1 text-sm sm:text-base">
                    Password:
                  </label>
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="********"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 pr-10 text-sm sm:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleLoginPasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 mt-6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      {showLoginPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      ) : (
                        <>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <span>Login</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </form>
            </div>

            {/* Signup Form */}
            <div className="w-full flex-shrink-0">
              <form onSubmit={handleSignup}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm sm:text-base">
                      Full Name:
                    </label>
                    <input
                      type="text"
                      placeholder="Juan Dela Cruz"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm sm:text-base">
                      Email:
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm sm:text-base">
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      placeholder="+63 912 345 6789"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm sm:text-base">
                      Username:
                    </label>
                    <input
                      type="text"
                      placeholder="yourusername"
                      value={signupUsername}
                      onChange={(e) => setSignupUsername(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-gray-700 mb-1 text-sm sm:text-base">
                      Password:
                    </label>
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="********"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 pr-10 text-sm sm:text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleSignupPasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 mt-6"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        {showSignupPassword ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        ) : (
                          <>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                  <div className="relative">
                    <label className="block text-gray-700 mb-1 text-sm sm:text-base">
                      Confirm Password:
                    </label>
                    <input
                      type={showSignupConfirmPassword ? "text" : "password"}
                      placeholder="********"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 pr-10 text-sm sm:text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleSignupConfirmPasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 mt-6"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        {showSignupConfirmPassword ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        ) : (
                          <>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2 text-sm sm:text-base mt-4"
                >
                  <span>Sign Up</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-4">
          <a href="/" className="text-gray-700 hover:text-gray-900 text-sm">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
