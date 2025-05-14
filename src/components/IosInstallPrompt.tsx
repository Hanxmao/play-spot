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
        <div style={bannerStyle}>
            <span>To install this app, tap the share icon and select "Add to Home Screen".</span>
            <button onClick={() => setShouldShow(false)} style={buttonStyle}>Close</button>
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