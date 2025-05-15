import { useEffect, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';

export default function ServiceWorkerWrapper() {
    const [updateAvailable, setUpdateAvailable] = useState(false);

    useEffect(() => {
        registerSW({
            onNeedRefresh() {
                setUpdateAvailable(true);
            },
            onOfflineReady() {
                console.log("App is ready to work offline.");
            }
        });
    }, []);

    const reloadPage = () => {
        window.location.reload();
    };

    if (!updateAvailable) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-gray-800 text-white flex justify-between items-center z-50">
            <span>A new version is available.</span>
            <button
                onClick={reloadPage}
                className="ml-4 px-3 py-2 bg-white text-gray-800 border-none cursor-pointer font-bold"
            >
                Update
            </button>
        </div>
    );
}
