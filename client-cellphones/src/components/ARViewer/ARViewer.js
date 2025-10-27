import React, { useState } from 'react';
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
        setIsLoading(true);
        setError('');
        try {
            // Wait for scripts to load
            let retries = 0;
            const maxRetries = 20;
            
            while (retries < maxRetries && !window.AFRAME) {
                await new Promise(resolve => setTimeout(resolve, 100));
                retries++;
            }
            
            console.log('AFRAME available:', !!window.AFRAME);
            console.log('ARJS available:', !!(window.ARjs || window.ARJS));
            
            if (!window.AFRAME) {
                throw new Error('A-Frame không thể tải. Vui lòng làm mới trang.');
            }
            
            // Check for AR.js (may be ARjs or ARJS)
            const arjsLoaded = window.ARjs || window.ARJS;
            if (!arjsLoaded) {
                throw new Error('AR.js chưa được tải. Kiểm tra kết nối internet.');
            }
            
            // Check if getUserMedia is supported
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Camera không được hỗ trợ trên trình duyệt này');
            }
            
            console.log('Starting AR mode...');
            setIsARMode(true);
            setIsVRMode(false);
            setError('');
        } catch (error) {
            console.error('Error starting AR:', error);
            setError(error.message);
        }
        setIsLoading(false);
    };

    const startVR = async () => {
        setIsLoading(true);
        setError('');
        
        try {
            // Wait for A-Frame to load
            let retries = 0;
            const maxRetries = 20;
            
            while (retries < maxRetries && !window.AFRAME) {
                await new Promise(resolve => setTimeout(resolve, 100));
                retries++;
            }
            
            if (!window.AFRAME) {
                throw new Error('A-Frame không thể tải. Vui lòng làm mới trang.');
            }
            
            setIsVRMode(true);
            setIsARMode(false);
            setError('');
        } catch (error) {
            console.error('Error starting VR:', error);
            setError(error.message);
        }
        
        setIsLoading(false);
    };

    const exitARVR = () => {
        setIsARMode(false);
        setIsVRMode(false);
        setError('');
    };

    return (
        <div className="ar-viewer">
            <div className="ar-viewer-header">
                <h2>AR/VR Viewer - {product?.name || 'Sản phẩm'}</h2>
                <p>Xem cấu trúc thiết bị với công nghệ AR/VR</p>
            </div>

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
                                <input type="file" accept=".patt" onChange={(e) => {
                                    const file = e.target.files && e.target.files[0];
                                    if (file) {
                                        const url = URL.createObjectURL(file);
                                        setMarkerPatternUrl(url);
                                    }
                                }} />
                            )}
                        </div>

                        <button 
                            className="ar-btn"
                            onClick={startAR}
                            disabled={isLoading}
                        >
                            <span className="btn-icon">📷</span>
                            {isLoading ? 'Đang khởi tạo...' : 'Bắt đầu AR'}
                        </button>
                        <button 
                            className="vr-btn"
                            onClick={startVR}
                        >
                            <span className="btn-icon">🥽</span>
                            Bắt đầu VR
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
                            {/* A-Frame + AR.js marker-based scene */}
                            <a-scene 
                                embedded 
                                renderer="antialias: true; colorManagement: true; alpha: true;" 
                                arjs="sourceType: webcam; debugUIEnabled: true; detectionMode: mono;"
                                vr-mode-ui="enabled: false"
                                stats
                            >
                                <a-assets>
                                    {product?.modelUrl ? (
                                        <a-asset-item id="productModel" src={product.modelUrl}></a-asset-item>
                                    ) : null}
                                </a-assets>

                                {/* Add lighting for the scene */}
                                <a-light type="ambient" color="#404040"></a-light>
                                <a-light type="directional" position="0 1 0" rotation="-90 0 0"></a-light>

                                {/* Add a helper grid to show AR is working */}
                                <a-grid
                                    visible="true"
                                    opacity="0.5"
                                    position="0 -1.5 0"
                                    rotation="-90 0 0"
                                    width="100"
                                    height="100"
                                    color="#CCC">
                                </a-grid>

                                {
                                    markerType === 'preset' ? (
                                        <a-marker preset={markerPreset} raycaster-listen>
                                            {/* If product has a glTF model URL, render it; otherwise render a simple box */}
                                            {product?.modelUrl ? (
                                                <a-entity gltf-model="#productModel" scale="0.5 0.5 0.5" position="0 0 0"></a-entity>
                                            ) : product?.image ? (
                                                <a-box position='0 0.5 0' depth='0.4' height='0.6' width='0.3' material={`src: ${product.image}`} rotation='0 45 0'></a-box>
                                            ) : (
                                                <>
                                                    <a-box position='0 0.5 0' depth='0.4' height='0.6' width='0.3' color='#4CC3D9' rotation='0 45 0'></a-box>
                                                    <a-sphere position='0 0.8 0' radius='0.1' color='#FF6B00'></a-sphere>
                                                </>
                                            )}
                                            <a-text value={product?.name || 'Sản phẩm'} align='center' position='0 -0.6 0' color='#FFFFFF' width='3'></a-text>
                                        </a-marker>
                                    ) : (
                                        markerPatternUrl ? (
                                            <a-marker type="pattern" url={markerPatternUrl} raycaster-listen>
                                                {product?.modelUrl ? (
                                                    <a-entity gltf-model="#productModel" scale="0.5 0.5 0.5" position="0 0 0"></a-entity>
                                                ) : product?.image ? (
                                                    <a-box position='0 0.5 0' depth='0.4' height='0.6' width='0.3' material={`src: ${product.image}`} rotation='0 45 0'></a-box>
                                                ) : (
                                                    <>
                                                        <a-box position='0 0.5 0' depth='0.4' height='0.6' width='0.3' color='#4CC3D9' rotation='0 45 0'></a-box>
                                                        <a-sphere position='0 0.8 0' radius='0.1' color='#FF6B00'></a-sphere>
                                                    </>
                                                )}
                                                <a-text value={product?.name || 'Sản phẩm'} align='center' position='0 -0.6 0' color='#FFFFFF' width='3'></a-text>
                                            </a-marker>
                                        ) : (
                                            <a-entity>
                                                <a-text value="Vui lòng upload file .patt để sử dụng marker pattern" align='center' position='0 0 0' color='#FF0000' width='4'></a-text>
                                            </a-entity>
                                        )
                                    )
                                }
                                <a-entity camera></a-entity>
                            </a-scene>
                        </div>
                    )}

                    {isVRMode && (
                        <div className="vr-viewport aframe-wrapper">
                            {/* A-Frame VR scene for simple 3D preview */}
                            <a-scene embedded renderer="antialias: true; colorManagement: true;" webxr>
                                <a-assets>
                                    {product?.modelUrl ? (
                                        <a-asset-item id="productModelVr" src={product.modelUrl}></a-asset-item>
                                    ) : null}
                                </a-assets>

                                <a-entity position="0 1.6 3">
                                    <a-entity rotation="0 -30 0">
                                        {product?.modelUrl ? (
                                            <a-entity gltf-model="#productModelVr" scale="0.8 0.8 0.8"></a-entity>
                                        ) : product?.image ? (
                                            <a-box position='0 0 0' depth='0.8' height='1.2' width='0.6' material={`src: ${product.image}`} ></a-box>
                                        ) : (
                                            <a-box position='0 0 0' depth='0.8' height='1.2' width='0.6' color='#4CC3D9'></a-box>
                                        )}
                                    </a-entity>
                                </a-entity>
                                <a-sky color="#ECECEC"></a-sky>
                                <a-camera position="0 1.6 0"></a-camera>
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
        </div>
    );
}

export default ARViewer;
