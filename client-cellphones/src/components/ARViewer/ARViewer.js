import React, { useState, useRef, useEffect } from 'react';
import './ARViewer.css';

function ARViewer({ product }) {
    const [isARMode, setIsARMode] = useState(false);
    const [isVRMode, setIsVRMode] = useState(false);
    const [currentView, setCurrentView] = useState('exterior');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const animationRef = useRef(null);

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
            // Check if getUserMedia is supported
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Camera không được hỗ trợ trên trình duyệt này');
            }

            // Request camera permission
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                } 
            });
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
            
            setIsARMode(true);
            setIsVRMode(false);
            startAnimation();
        } catch (error) {
            console.error('Error accessing camera:', error);
            setError(`Không thể truy cập camera: ${error.message}`);
        }
        setIsLoading(false);
    };

    const startVR = () => {
        setIsVRMode(true);
        setIsARMode(false);
        setError('');
        
        // Check WebXR support
        if ('xr' in navigator) {
            navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
                if (supported) {
                    console.log('VR được hỗ trợ');
                } else {
                    setError('VR không được hỗ trợ trên thiết bị này');
                }
            }).catch(() => {
                setError('Không thể kiểm tra hỗ trợ VR');
            });
        } else {
            setError('WebXR không được hỗ trợ');
        }
        
        startAnimation();
    };

    const exitARVR = () => {
        setIsARMode(false);
        setIsVRMode(false);
        setError('');
        
        // Stop camera stream
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        
        // Stop animation
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
    };

    const startAnimation = () => {
        const animate = () => {
            render3DModel();
            animationRef.current = requestAnimationFrame(animate);
        };
        animate();
    };

    const render3DModel = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw 3D model components with animation
        const currentModel = currentModelData;
        const time = Date.now() * 0.001;
        
        currentModel.components.forEach((component, index) => {
            const x = width / 2 + component.position.x * 100;
            const y = height / 2 + component.position.y * 100;
            
            // Add floating animation
            const floatY = y + Math.sin(time + index) * 5;
            const size = component.size + Math.sin(time * 2 + index) * 3;
            
            // Draw component with gradient
            const gradient = ctx.createRadialGradient(x, floatY, 0, x, floatY, size);
            gradient.addColorStop(0, component.color);
            gradient.addColorStop(1, adjustColor(component.color, -30));
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, floatY, size, 0, 2 * Math.PI);
            ctx.fill();
            
            // Add border
            ctx.strokeStyle = adjustColor(component.color, 20);
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw component name with background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(x - 40, floatY + size + 5, 80, 20);
            
            ctx.fillStyle = '#fff';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(component.name, x, floatY + size + 18);
        });
        
        // Add connection lines for exploded view
        if (currentView === 'exploded') {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            
            const centerX = width / 2;
            const centerY = height / 2;
            
            currentModel.components.forEach(component => {
                const x = centerX + component.position.x * 100;
                const y = centerY + component.position.y * 100;
                
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.stroke();
            });
            
            ctx.setLineDash([]);
        }
    };

    // Helper function to adjust color brightness
    const adjustColor = (color, amount) => {
        const num = parseInt(color.replace("#", ""), 16);
        const r = Math.max(0, Math.min(255, (num >> 16) + amount));
        const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
        const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    };

    useEffect(() => {
        if (isARMode || isVRMode) {
            startAnimation();
        }
        
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isARMode, isVRMode, currentView]);

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
                    </div>
                </div>
            ) : (
                <div className="ar-vr-viewport">
                    {isARMode && (
                        <div className="ar-viewport">
                            <video 
                                ref={videoRef}
                                autoPlay 
                                playsInline 
                                muted
                                className="camera-feed"
                            />
                            <canvas 
                                ref={canvasRef}
                                className="ar-overlay"
                                width={640}
                                height={480}
                            />
                        </div>
                    )}
                    
                    {isVRMode && (
                        <div className="vr-viewport">
                            <canvas 
                                ref={canvasRef}
                                className="vr-canvas"
                                width={800}
                                height={600}
                            />
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

                    <div className="ar-vr-instructions">
                        <h4>Hướng dẫn sử dụng:</h4>
                        <ul>
                            <li>Di chuyển thiết bị để xem các góc độ khác nhau</li>
                            <li>Chạm vào các bộ phận để xem thông tin chi tiết</li>
                            <li>Sử dụng các nút để chuyển đổi chế độ xem</li>
                        </ul>
                    </div>
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
