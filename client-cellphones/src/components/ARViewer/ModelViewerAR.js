import React, { useEffect, useMemo } from 'react';
import('@google/model-viewer');

function isIOS() {
    if (typeof navigator === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

export default function ModelViewerAR({ src, iosSrc, poster, alt = '3D model', arScale = 'auto', arPlacement = 'floor' }) {
    // Best-effort choose poster
    const posterUrl = poster || undefined;

    const computedIosSrc = useMemo(() => {
        if (iosSrc) return iosSrc; // .usdz if provided
        // If a .usdz isn't provided, fallback will still allow non-AR viewing on iOS
        return undefined;
    }, [iosSrc]);

    useEffect(() => {
        // No-op: ensures side-effect import executed once
    }, []);

    // model-viewer attributes
    // - ar: enables AR (Scene Viewer on Android, Quick Look on iOS)
    // - camera-controls, autoplay: basic UX
    // - exposure, shadow-intensity: nicer visuals
    return (
        <model-viewer
            src={src}
            ios-src={computedIosSrc}
            alt={alt}
            ar
            ar-modes="scene-viewer webxr quick-look"
            ar-scale={arScale}
            ar-placement={arPlacement}
            camera-controls
            autoplay
            shadow-intensity="0.8"
            exposure="0.9"
            style={{ width: '100%', height: 420, background: '#111', borderRadius: 12, overflow: 'hidden', border: '1px solid #333' }}
            poster={posterUrl}
        >
            {/* Fallback info for iOS without USDZ */}
            {isIOS() && !computedIosSrc ? (
                <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, color: '#fff', fontSize: 12, opacity: 0.8 }}>
                    Để bật AR trên iOS, cung cấp tệp .usdz qua prop iosSrc.
                </div>
            ) : null}
        </model-viewer>
    );
}


