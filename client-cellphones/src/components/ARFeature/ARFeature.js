import React from 'react';
import { Link } from 'react-router-dom';
import './ARFeature.css';

const ARFeature = () => {
    return (
        <section className="ar-feature-section">
            <div className="container">
                <div className="ar-feature-content">
                    <div className="ar-feature-text">
                        <h2>🚀 Trải nghiệm mới: Xem sản phẩm bằng AR/VR</h2>
                        <p>
                            Khám phá công nghệ thực tế tăng cường (AR) và thực tế ảo (VR) 
                            để xem chi tiết sản phẩm một cách sống động và chân thực nhất.
                        </p>
                        <div className="ar-features-list">
                            <div className="feature-item">
                                <span className="feature-icon">📱</span>
                                <div>
                                    <strong>AR Mode:</strong> Xem sản phẩm trong thế giới thật
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🥽</span>
                                <div>
                                    <strong>VR Mode:</strong> Khám phá trong môi trường 3D
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🔧</span>
                                <div>
                                    <strong>3 View Modes:</strong> Bên ngoài, bên trong, tách rời
                                </div>
                            </div>
                        </div>
                        <Link to="/ar-experience" className="ar-cta-button">
                            Trải nghiệm ngay
                        </Link>
                    </div>
                    <div className="ar-feature-visual">
                        <div className="ar-demo-card">
                            <div className="demo-phone">
                                <div className="phone-screen">
                                    <div className="ar-overlay">
                                        <div className="ar-object"></div>
                                        <div className="ar-particles">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="demo-text">
                                <p>Hướng camera vào marker để xem magic! ✨</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ARFeature;
