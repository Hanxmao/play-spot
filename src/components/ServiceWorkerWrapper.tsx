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
        <div style={bannerStyle}>
            <span>A new version is available.</span>
            <button onClick={reloadPage} style={buttonStyle}>Update</button>
        </div>
    );
}

const bannerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    padding: '12px',
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000
};

const buttonStyle: React.CSSProperties = {
    marginLeft: '1em',
    padding: '8px 12px',
    backgroundColor: '#fff',
    color: '#333',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold'
};
