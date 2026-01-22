export const InfoCard = ({ title, children }) => (
    <div className="border rounded-lg p-4 text-start">
        <h3 className="text-sm font-semibold mb-3">{title}</h3>
        <div className="space-y-3 text-start">{children}</div>
    </div>
);

export const InfoRow = ({ icon, text }) => (
    <div className="flex items-center gap-2 text-sm text-gray-700">
        {icon}
        {text}
    </div>
);

export const LabelValue = ({ label, value }) => (
    <div>
        <label className="text-xs text-gray-600">{label}</label>
        <div className="border rounded px-3 py-2 text-sm">{value}</div>
    </div>
);

export const PhotoPreview = ({ photo, API_BASE_URL }) => (
    <div className='p-4 border rounded-lg text-start'>
        <h2 className="text-md font-semibold text-gray-800 mb-4">Uploaded Photos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer">
                <img
                    src={`${API_BASE_URL}/quotes/image/${photo}`}
                    alt={`Uploaded photo`}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    </div>
);

export const Button = ({ children, color, icon, ...props }) => (
    <button
        {...props}
        className={`flex items-center gap-2 px-4 py-2 rounded text-white bg-${color}-500 hover:bg-${color}-600`}
    >
        {icon}
        {children}
    </button>
);

export const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-20">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-cyan-500 border-t-transparent" />
    </div>
);

export const ErrorBanner = ({ message }) => (
    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-sm">
        {message}
    </div>
);





