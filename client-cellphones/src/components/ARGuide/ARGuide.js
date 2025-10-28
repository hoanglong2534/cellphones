import React, { useState } from 'react';
import './ARGuide.css';

const ARGuide = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('ar');

    if (!isOpen) return null;

    return (
        <div className="ar-guide-overlay">
            <div className="ar-guide-modal">
                <div className="ar-guide-header">
                    <h2>📚 Hướng dẫn sử dụng AR/VR</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>
                
                <div className="ar-guide-tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'ar' ? 'active' : ''}`}
                        onClick={() => setActiveTab('ar')}
                    >
                        📱 AR Mode
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'vr' ? 'active' : ''}`}
                        onClick={() => setActiveTab('vr')}
                    >
                        🥽 VR Mode
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'troubleshoot' ? 'active' : ''}`}
                        onClick={() => setActiveTab('troubleshoot')}
                    >
                        🔧 Xử lý lỗi
                    </button>
                </div>

                <div className="ar-guide-content">
                    {activeTab === 'ar' && (
                        <div className="guide-section">
                            <h3>🎯 Chuẩn bị cho AR</h3>
                            <div className="guide-steps">
                                <div className="step">
                                    <div className="step-number">1</div>
                                    <div className="step-content">
                                        <h4>Tải marker Hiro</h4>
                                        <p>In marker trên giấy A4 hoặc hiển thị trên màn hình khác</p>
                                        <a href="/hiro-marker.html" target="_blank" className="download-link">
                                            📥 Tải marker
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="step">
                                    <div className="step-number">2</div>
                                    <div className="step-content">
                                        <h4>Chuẩn bị môi trường</h4>
                                        <ul>
                                            <li>Đảm bảo ánh sáng đủ (không quá tối hoặc quá sáng)</li>
                                            <li>Marker phải phẳng, không bị uốn cong</li>
                                            <li>Camera sạch, không bị mờ</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="step">
                                    <div className="step-number">3</div>
                                    <div className="step-content">
                                        <h4>Bắt đầu AR</h4>
                                        <ul>
                                            <li>Bấm nút "Bắt đầu AR"</li>
                                            <li>Cho phép truy cập camera</li>
                                            <li>Hướng camera vào marker</li>
                                            <li>Giữ khoảng cách 15-30cm</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="ar-demo">
                                <img 
                                    src="https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png" 
                                    alt="Hiro Marker" 
                                    className="marker-preview"
                                />
                                <p>Marker Hiro - hướng camera vào đây</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'vr' && (
                        <div className="guide-section">
                            <h3>🌟 Trải nghiệm VR</h3>
                            <div className="guide-steps">
                                <div className="step">
                                    <div className="step-number">1</div>
                                    <div className="step-content">
                                        <h4>Khởi động VR</h4>
                                        <p>Bấm nút "Bắt đầu VR" - không cần camera</p>
                                    </div>
                                </div>
                                
                                <div className="step">
                                    <div className="step-number">2</div>
                                    <div className="step-content">
                                        <h4>Điều khiển view</h4>
                                        <ul>
                                            <li><strong>Chuột:</strong> Kéo để xoay camera</li>
                                            <li><strong>Touch:</strong> Vuốt để di chuyển góc nhìn</li>
                                            <li><strong>Nút điều khiển:</strong> Chuyển đổi view modes</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="step">
                                    <div className="step-number">3</div>
                                    <div className="step-content">
                                        <h4>3 chế độ xem</h4>
                                        <ul>
                                            <li><strong>📱 Exterior:</strong> Bề mặt ngoài thiết bị</li>
                                            <li><strong>🔧 Interior:</strong> Linh kiện bên trong</li>
                                            <li><strong>💥 Exploded:</strong> Các bộ phận tách rời</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'troubleshoot' && (
                        <div className="guide-section">
                            <h3>🚨 Xử lý sự cố</h3>
                            <div className="troubleshoot-list">
                                <div className="issue">
                                    <h4>❌ AR không nhận diện marker</h4>
                                    <ul>
                                        <li>Kiểm tra ánh sáng - không quá tối/sáng</li>
                                        <li>Làm sạch camera điện thoại</li>
                                        <li>Đảm bảo marker không bị che khuất</li>
                                        <li>Thử di chuyển marker gần/xa hơn</li>
                                        <li>In marker trên giấy trắng, mực đen</li>
                                    </ul>
                                </div>
                                
                                <div className="issue">
                                    <h4>📷 Không truy cập được camera</h4>
                                    <ul>
                                        <li>Kiểm tra quyền camera trong browser</li>
                                        <li>Đảm bảo không có app khác đang dùng camera</li>
                                        <li>Thử làm mới trang (F5)</li>
                                        <li>Dùng HTTPS thay vì HTTP</li>
                                    </ul>
                                </div>
                                
                                <div className="issue">
                                    <h4>🐌 AR/VR chạy chậm</h4>
                                    <ul>
                                        <li>Đóng các tab browser khác</li>
                                        <li>Kiểm tra RAM còn trống</li>
                                        <li>Restart browser</li>
                                        <li>Sử dụng Chrome/Firefox mới nhất</li>
                                    </ul>
                                </div>
                                
                                <div className="issue">
                                    <h4>📱 Lỗi trên mobile</h4>
                                    <ul>
                                        <li>Xoay màn hình về dọc</li>
                                        <li>Đảm bảo không bật chế độ tiết kiệm pin</li>
                                        <li>Dùng browser mặc định của hệ thống</li>
                                        <li>Tăng độ sáng màn hình</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ARGuide;
