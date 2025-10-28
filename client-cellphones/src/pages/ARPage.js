import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ARViewer from '../components/ARViewer/ARViewer';
import ImageWithFallback from '../components/ImageWithFallback';
import { mockProductsWithAR } from '../data/mockARProducts';
import './ARPage.css';

const ARPage = () => {
    // Use mock products with AR capabilities
    const sampleProducts = mockProductsWithAR;

    const [selectedProduct, setSelectedProduct] = React.useState(sampleProducts[0]);

    return (
        <div className="ar-page">
            <Header />

            {/* Removed hero/header for a cleaner, compact layout */}

            {/* Product Selection */}
            <div className="product-selection">
                <div className="container">
                    <h2>Chọn sản phẩm để trải nghiệm:</h2>
                    <div className="product-cards">
                        {sampleProducts.map(product => (
                            <div 
                                key={product.id}
                                className={`product-card ${selectedProduct.id === product.id ? 'active' : ''}`}
                                onClick={() => setSelectedProduct(product)}
                            >
                                <ImageWithFallback src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.price.toLocaleString('vi-VN')}₫</p>
                                {product.modelUrl && (
                                    <span className="model-badge">🚀 3D Model</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* AR/VR Viewer */}
            <div className="ar-viewer-section">
                <div className="container">
                    <ARViewer product={selectedProduct} />
                </div>
            </div>

            {/* Instructions */}
            <div className="instructions-section">
                <div className="container">
                    <div className="instruction-grid">
                        <div className="instruction-card">
                            <h3>📱 AR Mode</h3>
                            <ul>
                                <li>Cần có camera</li>
                                <li>In marker Hiro</li>
                                <li>Hướng camera vào marker</li>
                                <li>Xem model 3D xuất hiện</li>
                            </ul>
                        </div>
                        <div className="instruction-card">
                            <h3>🥽 VR Mode</h3>
                            <ul>
                                <li>Không cần camera</li>
                                <li>Xem model 3D trong không gian ảo</li>
                                <li>Di chuyển chuột để xoay view</li>
                                <li>Chuyển đổi các chế độ xem</li>
                            </ul>
                        </div>
                        <div className="instruction-card">
                            <h3>🔧 View Modes</h3>
                            <ul>
                                <li><strong>Exterior:</strong> Bên ngoài thiết bị</li>
                                <li><strong>Interior:</strong> Linh kiện bên trong</li>
                                <li><strong>Exploded:</strong> Các bộ phận tách rời</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ARPage;
