import React, { useState, useEffect, useRef } from 'react';
import ARGuide from '../ARGuide/ARGuide';
import './ARViewer.css';

function ARViewer({ product }) {
    const [isARMode, setIsARMode] = useState(false);
    const [isVRMode, setIsVRMode] = useState(false);
    const [simple3DMode, setSimple3DMode] = useState(false); // No marker required
    const [currentView, setCurrentView] = useState('exterior');
    const [markerType, setMarkerType] = useState('preset'); // 'preset' or 'pattern'
    const [markerPreset, setMarkerPreset] = useState('hiro');
    const [markerPatternUrl, setMarkerPatternUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [objectRotation, setObjectRotation] = useState({ x: 0, y: 0 });
    const [librariesLoaded, setLibrariesLoaded] = useState(false);
    const [showGuide, setShowGuide] = useState(false);

    // Camera/device states
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [cameraFacing, setCameraFacing] = useState('environment'); // 'environment' | 'user'
    const [devices, setDevices] = useState([]); // MediaDeviceInfo[]
    const [selectedDeviceId, setSelectedDeviceId] = useState('');
    const [showCameraTest, setShowCameraTest] = useState(false);
    const testVideoRef = useRef(null);
    let testStream = useRef(null);

    // Check if A-Frame and AR.js are loaded
    useEffect(() => {
        const checkLibraries = () => {
            const aframeLoaded = !!window.AFRAME;
            const arjsLoaded = !!(window.ARjs || (window.THREEx && window.THREEx.ArToolkitSource));
            
            if (aframeLoaded && arjsLoaded) {
                setLibrariesLoaded(true);
                console.log('AR/VR libraries loaded successfully');
            } else {
                setTimeout(checkLibraries, 100);
            }
        };
        
        checkLibraries();
    }, []);

    // Enumerate devices after permission granted
    const enumerateCameras = async () => {
        try {
            const devs = await navigator.mediaDevices.enumerateDevices();
            const cams = devs.filter((d) => d.kind === 'videoinput');
            setDevices(cams);
            if (cams.length && !selectedDeviceId) {
                setSelectedDeviceId(cams[0].deviceId);
            }
        } catch (err) {
            console.warn('enumerateDevices failed:', err);
        }
    };

    useEffect(() => {
        if (hasCameraPermission) {
            enumerateCameras();
        }
    }, [hasCameraPermission]);

    // Toggle simple camera test preview
    const startTestPreview = async () => {
        try {
            if (testStream.current) return; // already running
            const constraints = selectedDeviceId
                ? { video: { deviceId: { exact: selectedDeviceId } } }
                : { video: { facingMode: cameraFacing } };
            const stream = await navigator.mediaDevices.getUserMedia({ ...constraints, audio: false });
            testStream.current = stream;
            if (testVideoRef.current) {
                testVideoRef.current.srcObject = stream;
                await testVideoRef.current.play().catch(() => {});
            }
        } catch (e) {
            setError('Không mở được camera test: ' + e.message);
        }
    };

    const stopTestPreview = () => {
        if (testStream.current) {
            testStream.current.getTracks().forEach(t => t.stop());
            testStream.current = null;
        }
    };

    useEffect(() => {
        if (showCameraTest) startTestPreview(); else stopTestPreview();
        return () => stopTestPreview();
    }, [showCameraTest, selectedDeviceId, cameraFacing]);

    // Build AR.js attribute string with selected camera/facing
    const arjsConfig = React.useMemo(() => {
        const parts = [
            'sourceType: webcam',
            'debugUIEnabled: true',
            'detectionMode: mono',
            // Keep videoTexture off for max compatibility, let video sit behind canvas
            // 'videoTexture: true',
            'sourceWidth: 1280',
            'sourceHeight: 720',
            'displayWidth: 1280',
            'displayHeight: 720',
        ];
        if (selectedDeviceId) parts.push(`sourceId: ${selectedDeviceId}`);
        if (!selectedDeviceId && cameraFacing) parts.push(`facingMode: ${cameraFacing}`);
        return parts.join('; ');
    }, [selectedDeviceId, cameraFacing]);

    // Lấy thông tin sản phẩm thực tế từ props
    const getProductComponents = (product) => {
        const baseComponents = {
            exterior: [
                { name: 'Màn hình', color: '#000000', position: { x: 0, y: 0, z: 0 }, size: 40 },
                { name: 'Khung máy', color: '#C0C0C0', position: { x: 0, y: 0, z: -1 }, size: 35 },
                { name: 'Camera', color: '#FF0000', position: { x: 0, y: 0.5, z: 0.5 }, size: 15 },
                { name: 'Nút nguồn', color: '#808080', position: { x: 0.3, y: 0, z: 0 }, size: 10 },
                { name: 'Speaker', color: '#333333', position: { x: -0.3, y: 0, z: 0 }, size: 12 }
            ],
            interior: [
                { name: 'CPU', color: '#00FF00', position: { x: 0, y: 0, z: 0 }, size: 25 },
                { name: 'RAM', color: '#0000FF', position: { x: 0.2, y: 0, z: 0 }, size: 20 },
                { name: 'Storage', color: '#FFFF00', position: { x: -0.2, y: 0, z: 0 }, size: 18 },
                { name: 'Battery', color: '#FF00FF', position: { x: 0, y: -0.3, z: 0 }, size: 30 },
                { name: 'Motherboard', color: '#00FFFF', position: { x: 0, y: 0, z: -0.1 }, size: 35 }
            ],
            exploded: [
                { name: 'Screen Assembly', color: '#000000', position: { x: 0, y: 0.5, z: 0 }, size: 45 },
                { name: 'Main Board', color: '#00FF00', position: { x: 0, y: 0, z: 0 }, size: 40 },
                { name: 'Battery Pack', color: '#FF00FF', position: { x: 0, y: -0.5, z: 0 }, size: 35 },
                { name: 'Camera Module', color: '#FF0000', position: { x: 0.3, y: 0.3, z: 0.3 }, size: 15 },
                { name: 'Speaker', color: '#808080', position: { x: -0.3, y: 0.3, z: 0.3 }, size: 12 }
            ]
        };
    
        // Nếu chưa có product thật, dùng dữ liệu mẫu
        if (!product) {
            return {
                name: `${currentView === 'exterior' ? 'Exterior' : currentView === 'interior' ? 'Interior' : 'Exploded'} View`,
                description: `Xem ${currentView === 'exterior' ? 'bên ngoài' : currentView === 'interior' ? 'bên trong' : 'các bộ phận tách rời'} của sản phẩm mẫu`,
                components: baseComponents[currentView]
            };
        }
    
        // Nếu có product thật
        return {
            name: `${currentView === 'exterior' ? 'Exterior' : currentView === 'interior' ? 'Interior' : 'Exploded'} View`,
            description: `Xem ${currentView === 'exterior' ? 'bên ngoài' : currentView === 'interior' ? 'bên trong' : 'các bộ phận tách rời'} của ${product.name}`,
            components: baseComponents[currentView]
        };
    };

    const currentModelData = getProductComponents(product);

    const startAR = async () => {
        if (!librariesLoaded) {
            setError('Thư viện AR/VR chưa được tải. Vui lòng đợi...');
            return;
        }
        // Ensure test preview is stopped so AR.js can access the camera
        if (showCameraTest) {
            setShowCameraTest(false);
            stopTestPreview();
        }

        setIsLoading(true);
        setError('');
        try {
            const constraints = selectedDeviceId
                ? { video: { deviceId: { exact: selectedDeviceId } } }
                : { video: { facingMode: cameraFacing } };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            stream.getTracks().forEach(t => t.stop());
            setHasCameraPermission(true);
            await enumerateCameras();
            setIsARMode(true);
            setIsVRMode(false);
            // Give AR.js a tick to attach video, then force a resize
            setTimeout(() => {
                try { window.dispatchEvent(new Event('resize')); } catch {}
                try { window.dispatchEvent(new Event('orientationchange')); } catch {}
            }, 500);
        } catch (error) {
            if (error.name === 'NotAllowedError') {
                setError('Vui lòng cho phép truy cập camera để sử dụng AR');
            } else if (error.name === 'NotFoundError' || error.name === 'OverconstrainedError') {
                setError('Không tìm thấy camera phù hợp. Hãy thử đổi nguồn camera.');
            } else {
                setError('Lỗi khởi tạo AR: ' + error.message);
            }
        }
        setIsLoading(false);
    };

    const startVR = async () => {
        if (!librariesLoaded) {
            setError('Thư viện AR/VR chưa được tải. Vui lòng đợi...');
            return;
        }
        // Stop camera test if running
        if (showCameraTest) {
            setShowCameraTest(false);
            stopTestPreview();
        }

        setIsLoading(true);
        setError('');
        try {
            setIsVRMode(true);
            setIsARMode(false);
            setTimeout(() => {
                try { window.dispatchEvent(new Event('resize')); } catch {}
                try { window.dispatchEvent(new Event('orientationchange')); } catch {}
            }, 500);
        } catch (error) {
            setError('Lỗi khởi tạo VR: ' + error.message);
        }
        setIsLoading(false);
    };

    const exitARVR = () => {
        setIsARMode(false);
        setIsVRMode(false);
        setError('');
    };

    const handlePatternFileUpload = (event) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            if (file.name.endsWith('.patt')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const dataUrl = e.target.result;
                    setMarkerPatternUrl(dataUrl);
                    setError('');
                };
                reader.onerror = () => {
                    setError('Lỗi khi đọc file pattern');
                };
                reader.readAsDataURL(file);
            } else {
                setError('Vui lòng chọn file có định dạng .patt');
            }
        }
    };

    return (
        <div className="ar-viewer">
            <div className="ar-viewer-header">
                <h2>AR/VR Viewer - {product?.name || 'Sản phẩm'}</h2>
                <p>Xem cấu trúc thiết bị với công nghệ AR/VR</p>
                <button 
                    className="guide-button"
                    onClick={() => setShowGuide(true)}
                >
                    📚 Hướng dẫn sử dụng
                </button>
            </div>

            {!librariesLoaded && (
                <div className="library-loading">
                    <div className="loading-spinner"></div>
                    <p>Đang tải thư viện AR/VR...</p>
                </div>
            )}

            {error && (
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <span>{error}</span>
                </div>
            )}

            {!isARMode && !isVRMode ? (
                <div className="ar-viewer-controls">
                    <div className="view-modes">
                        <h3>Chọn chế độ xem:</h3>
                        <div className="mode-buttons">
                            <button 
                                className={`mode-btn ${currentView === 'exterior' ? 'active' : ''}`}
                                onClick={() => setCurrentView('exterior')}
                            >
                                <span className="mode-icon">📱</span>
                                Bên ngoài
                            </button>
                            <button 
                                className={`mode-btn ${currentView === 'interior' ? 'active' : ''}`}
                                onClick={() => setCurrentView('interior')}
                            >
                                <span className="mode-icon">🔧</span>
                                Bên trong
                            </button>
                            <button 
                                className={`mode-btn ${currentView === 'exploded' ? 'active' : ''}`}
                                onClick={() => setCurrentView('exploded')}
                            >
                                <span className="mode-icon">💥</span>
                                Tách rời
                            </button>
                        </div>
                    </div>

                    <div className="ar-vr-buttons">
                        <div className="marker-controls">
                            <label>View: </label>
                            <select value={currentView} onChange={(e) => setCurrentView(e.target.value)}>
                                <option value="exterior">Exterior view</option>
                                <option value="interior">Interior view</option>
                                <option value="exploded">Exploded view</option>
                            </select>

                            <label style={{marginLeft: 12}}>Marker type:</label>
                            <select value={markerType} onChange={(e) => setMarkerType(e.target.value)}>
                                <option value="preset">Preset (hiro)</option>
                                <option value="pattern">Upload pattern (.patt)</option>
                            </select>

                            {markerType === 'preset' && (
                                <select value={markerPreset} onChange={(e) => setMarkerPreset(e.target.value)}>
                                    <option value="hiro">hiro</option>
                                    <option value="kanji">kanji</option>
                                </select>
                            )}

                            {markerType === 'pattern' && (
                                <input 
                                    type="file" 
                                    accept=".patt" 
                                    onChange={handlePatternFileUpload}
                                />
                            )}
                        </div>

                        {/* Camera controls (helpful for black screen issues) */}
                        <div className="marker-controls">
                            <label>Camera:</label>
                            <select
                                value={selectedDeviceId}
                                onChange={(e) => setSelectedDeviceId(e.target.value)}
                                disabled={!devices.length}
                            >
                                {devices.length === 0 ? (
                                    <option>Không phát hiện camera</option>
                                ) : (
                                    devices.map((d, i) => (
                                        <option key={d.deviceId || i} value={d.deviceId}>
                                            {d.label || `Camera ${i + 1}`}
                                        </option>
                                    ))
                                )}
                            </select>

                            <label style={{marginLeft: 12}}>Hướng camera:</label>
                            <select value={cameraFacing} onChange={(e) => setCameraFacing(e.target.value)}>
                                <option value="environment">Sau (environment)</option>
                                <option value="user">Trước (user)</option>
                            </select>

                            <label style={{marginLeft: 12}}>Test camera:</label>
                            <button className="ar-btn" style={{padding: '8px 12px'}} onClick={() => setShowCameraTest(v => !v)}>
                                {showCameraTest ? 'Tắt test' : 'Mở test'}
                            </button>
                        </div>

                        {showCameraTest && (
                            <div style={{background:'#000', borderRadius: 8, overflow:'hidden', border:'1px solid #333', maxWidth: 600, margin:'0 auto'}}>
                                <video ref={testVideoRef} autoPlay playsInline muted style={{width:'100%', height: 300, objectFit:'cover'}} />
                            </div>
                        )}

                        <button 
                            className="ar-btn"
                            onClick={startAR}
                            disabled={isLoading || !librariesLoaded}
                        >
                            <span className="btn-icon">📷</span>
                            {isLoading ? 'Đang khởi tạo...' : !librariesLoaded ? 'Đang tải...' : 'Bắt đầu AR'}
                        </button>
                        <button 
                            className="vr-btn"
                            onClick={startVR}
                            disabled={isLoading || !librariesLoaded}
                        >
                            <span className="btn-icon">🥽</span>
                            {!librariesLoaded ? 'Đang tải...' : 'Bắt đầu VR'}
                        </button>
                    </div>

                    <div className="model-preview">
                        <h3>{currentModelData.name}</h3>
                        <p>{currentModelData.description}</p>
                        <div className="components-list">
                            {currentModelData.components.map((component, index) => (
                                <div key={index} className="component-item">
                                    <div 
                                        className="component-color" 
                                        style={{ backgroundColor: component.color }}
                                    ></div>
                                    <span>{component.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* Marker preview and download */}
                        <div className="marker-preview">
                            <h4>Marker dùng để thử (hiro)</h4>
                            <p>In hoặc hiển thị marker này để camera có thể nhận diện và hiển thị mô hình.</p>
                            <div className="marker-image-wrap">
                                <img alt="hiro marker" src="https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png" style={{width: 150, height: 150, border: '1px solid #ccc'}} />
                            </div>
                            <a className="download-marker" href="https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png" target="_blank" rel="noreferrer">Tải marker (mở ảnh)</a>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="ar-vr-viewport">
                    {isARMode && (
                        <div className="ar-viewport aframe-wrapper">
                            <a-scene
                                embedded
                                renderer="antialias: true; colorManagement: true; alpha: true; precision: medium;"
                                arjs={arjsConfig}
                                vr-mode-ui="enabled: false"
                                device-orientation-permission-ui="enabled: false"
                            >
                                <a-assets>
                                    {product?.modelUrl && (
                                        <a-asset-item id="productModel" src={product.modelUrl}></a-asset-item>
                                    )}
                                </a-assets>

                                {/* Add lighting for the scene */}
                                <a-light type="ambient" color="#606060" intensity="0.4"></a-light>
                                <a-light type="directional" position="0 1 0" rotation="-90 0 0" intensity="0.6"></a-light>

                                {
                                    markerType === 'preset' ? (
                                        <a-marker preset={markerPreset} raycaster="objects: .clickable" emitevents="true" cursor="fuse: false; rayOrigin: mouse;">
                                            {/* Component rendering based on current view */}
                                            <a-entity id="phone-model" position="0 0 0">
                                                {currentModelData.components.map((component, index) => {
                                                    const pos = component.position;
                                                    const size = component.size * 0.01; // Scale down
                                                    return (
                                                        <a-box 
                                                            key={index}
                                                            position={`${pos.x} ${pos.y + 0.5} ${pos.z}`}
                                                            width={size}
                                                            height={size}
                                                            depth={size}
                                                            color={component.color}
                                                            class="clickable"
                                                            animation="property: rotation; to: 0 360 0; loop: true; dur: 10000"
                                                        ></a-box>
                                                    );
                                                })}
                                                {product?.modelUrl ? (
                                                    <a-entity gltf-model="#productModel" scale="0.5 0.5 0.5" position="0 0 0"></a-entity>
                                                ) : (
                                                    <a-box position='0 0.5 0' depth='0.4' height='0.6' width='0.3' color='#4CC3D9' rotation='0 45 0'></a-box>
                                                )}
                                                <a-text 
                                                    value={`${product?.name || 'Sản phẩm'} - ${currentView}`} 
                                                    align="center" 
                                                    position="0 -0.8 0" 
                                                    color="#FFFFFF" 
                                                    width="4"
                                                    geometry="primitive: plane; width: 2; height: auto"
                                                    material="color: #000000; opacity: 0.7"
                                                ></a-text>
                                            </a-entity>
                                        </a-marker>
                                    ) : (
                                        markerPatternUrl ? (
                                            <a-marker type="pattern" url={markerPatternUrl} raycaster="objects: .clickable" emitevents="true">
                                                <a-entity id="phone-model" position="0 0 0">
                                                    {currentModelData.components.map((component, index) => {
                                                        const pos = component.position;
                                                        const size = component.size * 0.01;
                                                        return (
                                                            <a-box 
                                                                key={index}
                                                                position={`${pos.x} ${pos.y + 0.5} ${pos.z}`}
                                                                width={size}
                                                                height={size}
                                                                depth={size}
                                                                color={component.color}
                                                                class="clickable"
                                                            ></a-box>
                                                        );
                                                    })}
                                                    {product?.modelUrl ? (
                                                        <a-entity gltf-model="#productModel" scale="0.5 0.5 0.5" position="0 0 0"></a-entity>
                                                    ) : (
                                                        <a-box position='0 0.5 0' depth='0.4' height='0.6' width='0.3' color='#4CC3D9' rotation='0 45 0'></a-box>
                                                    )}
                                                    <a-text 
                                                        value={`${product?.name || 'Sản phẩm'} - ${currentView}`} 
                                                        align="center" 
                                                        position="0 -0.8 0" 
                                                        color="#FFFFFF" 
                                                        width="4"
                                                    ></a-text>
                                                </a-entity>
                                            </a-marker>
                                        ) : (
                                            <a-entity>
                                                <a-text value="Vui lòng upload file .patt để sử dụng marker pattern" align="center" position="0 0 -3" color="#FF0000" width="4"></a-text>
                                            </a-entity>
                                        )
                                    )
                                }
                                <a-entity camera look-controls-enabled="false" cursor="rayOrigin: mouse"></a-entity>
                            </a-scene>
                        </div>
                    )}

                    {isVRMode && (
                        <div className="vr-viewport aframe-wrapper">
                            {/* A-Frame VR scene for 3D preview */}
                            <a-scene 
                                embedded 
                                renderer="antialias: true; colorManagement: true; precision: medium;" 
                                background="color: #87CEEB"
                                device-orientation-permission-ui="enabled: false"
                            >
                                <a-assets>
                                    {product?.modelUrl && (
                                        <a-asset-item id="productModelVr" src={product.modelUrl}></a-asset-item>
                                    )}
                                </a-assets>

                                {/* Lighting */}
                                <a-light type="ambient" color="#404040" intensity="0.4"></a-light>
                                <a-light type="directional" position="2 4 5" intensity="0.6"></a-light>
                                
                                {/* Phone model */}
                                <a-entity id="phone-container" position="0 1.6 -3" rotation="0 0 0">
                                    {currentModelData.components.map((component, index) => {
                                        const pos = component.position;
                                        const size = component.size * 0.02;
                                        return (
                                            <a-box 
                                                key={index}
                                                position={`${pos.x} ${pos.y} ${pos.z}`}
                                                width={size}
                                                height={size}
                                                depth={size}
                                                color={component.color}
                                                animation={`property: rotation; to: 0 360 0; loop: true; dur: ${8000 + index * 1000}`}
                                                class="clickable"
                                            ></a-box>
                                        );
                                    })}
                                    
                                    {/* Product name */}
                                    <a-text 
                                        value={`${product?.name || 'Sản phẩm'} - ${currentView} View`} 
                                        align="center" 
                                        position="0 -1 0" 
                                        color="#FFFFFF" 
                                        width="6"
                                        geometry="primitive: plane; width: 3; height: auto"
                                        material="color: #000000; opacity: 0.8"
                                    ></a-text>
                                </a-entity>

                                {/* Environment */}
                                <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" opacity="0.3"></a-plane>
                                <a-sky color="#87CEEB"></a-sky>
                                
                                {/* Camera with movement controls */}
                                <a-entity 
                                    id="cameraRig" 
                                    position="0 1.6 0"
                                    movement-controls="fly: true; constrainToNavMesh: false"
                                >
                                    <a-camera 
                                        look-controls="pointerLockEnabled: false"
                                        wasd-controls="enabled: false"
                                        cursor="rayOrigin: mouse"
                                    ></a-camera>
                                </a-entity>
                            </a-scene>
                        </div>
                    )}

                    <div className="ar-vr-controls">
                        <div className="view-controls">
                            <button 
                                className={`control-btn ${currentView === 'exterior' ? 'active' : ''}`}
                                onClick={() => setCurrentView('exterior')}
                            >
                                📱
                            </button>
                            <button 
                                className={`control-btn ${currentView === 'interior' ? 'active' : ''}`}
                                onClick={() => setCurrentView('interior')}
                            >
                                🔧
                            </button>
                            <button 
                                className={`control-btn ${currentView === 'exploded' ? 'active' : ''}`}
                                onClick={() => setCurrentView('exploded')}
                            >
                                💥
                            </button>
                        </div>
                        
                        <button className="exit-btn" onClick={exitARVR}>
                            <span className="btn-icon">❌</span>
                            Thoát
                        </button>
                    </div>

                    {isARMode && (
                        <div className="ar-vr-instructions">
                            <h4>📱 Hướng dẫn AR:</h4>
                            <ul>
                                <li>Hiển thị marker Hiro trước camera</li>
                                <li>Đảm bảo ánh sáng đủ và marker rõ ràng</li>
                                <li>Giữ khoảng cách 15-30cm từ marker</li>
                                <li>Mô hình sẽ xuất hiện trên marker</li>
                            </ul>
                            <p style={{marginTop: '10px', fontSize: '0.9rem', color: '#fbbf24'}}>
                                💡 Đang tìm marker... Di chuyển camera quanh marker Hiro
                            </p>
                        </div>
                    )}

                    {isVRMode && (
                        <div className="ar-vr-instructions">
                            <h4>🥽 Hướng dẫn VR:</h4>
                            <ul>
                                <li>Di chuyển thiết bị để xem các góc độ khác nhau</li>
                                <li>Chạm vào các bộ phận để xem thông tin chi tiết</li>
                                <li>Sử dụng các nút để chuyển đổi chế độ xem</li>
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Đang khởi tạo AR...</p>
                </div>
            )}

            <ARGuide isOpen={showGuide} onClose={() => setShowGuide(false)} />
        </div>
    );
}

export default ARViewer;
