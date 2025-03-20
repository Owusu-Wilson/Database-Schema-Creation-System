
interface FormProps {
    email: string;
    password: string;
    setEmail: (value: string) => void; // Accepts a string value
    setPassword: (value: string) => void; // Accepts a string value
    handleSubmit?: (e: React.FormEvent) => void; // Pass event for form submission
    isLoading?: boolean;
    error?: string;
}

export default function EmailAndPasswordForm({
    email,
    password,
    handleSubmit,
    setEmail,
    setPassword,
    isLoading,
    error,
}: FormProps) {
    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2 text-left">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Now correctly typed
                        className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
                        placeholder="Type your email"
                    />
                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}
                </div>
                <div className="space-y-2 text-left">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Now correctly typed
                        className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-white bg-schema-green hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isLoading ? 'Loading...' : 'Continue with email'}
                </button>
            </form>
        </div>
    );
}
