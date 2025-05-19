import { useEffect, useState } from "react";

export default function IosInstallPrompt() {
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIos = /iphone|ipad|ipod/.test(userAgent);
        const isInStandalone = ('standalone' in window.navigator) && window.navigator.standalone;

        if (isIos && !isInStandalone) {
            setShouldShow(true);
        }
    }, []);

    if (!shouldShow) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-gray-800 text-white flex justify-between items-center z-50">
            <span>To install this app, tap the share icon and select "Add to Home Screen".</span>
            <button
                onClick={() => setShouldShow(false)}
                className="ml-4 px-3 py-2 bg-white text-gray-800 border-none cursor-pointer font-bold"
            >
                Close
            </button>
        </div>
    );
}
