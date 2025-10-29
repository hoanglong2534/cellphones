import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ModelViewerAR from '../components/ARViewer/ModelViewerAR';
import { mockProductsWithAR } from '../data/mockARProducts';

export default function ARModelViewerPage() {
    const sampleProducts = mockProductsWithAR;
    const [selectedProduct, setSelectedProduct] = React.useState(sampleProducts[0]);

    return (
        <div className="ar-page">
            <Header />

            <div className="ar-page-header">
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                    <div>
                        <h1>✨ AR với model-viewer</h1>
                        <p>AR nhanh gọn trên Android (Scene Viewer) và iOS (Quick Look)</p>
                    </div>
                    <div style={{ display: 'grid', gap: 8, gridAutoFlow: 'column' }}>
                        <Link to="/ar-experience" className="btn btn-secondary">← Trình AR/VR cũ</Link>
                        <Link to="/ar-webxr" className="btn btn-secondary">WebXR (R3F)</Link>
                        <Link to="/" className="btn btn-secondary">Trang chủ</Link>
                    </div>
                </div>
            </div>

            <div className="product-selection">
                <div className="container">
                    <h2>Chọn sản phẩm:</h2>
                    <div className="product-cards">
                        {sampleProducts.map(product => (
                            <div
                                key={product.id}
                                className={`product-card ${selectedProduct.id === product.id ? 'active' : ''}`}
                                onClick={() => setSelectedProduct(product)}
                            >
                                <img src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.price.toLocaleString('vi-VN')}₫</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="ar-viewer-section">
                <div className="container">
                    <ModelViewerAR
                        src={selectedProduct?.modelUrl || 'https://modelviewer.dev/shared-assets/models/Astronaut.glb'}
                        iosSrc={selectedProduct?.usdzUrl /* optional .usdz if you have */}
                        alt={selectedProduct?.name}
                        arScale="fixed"
                        arPlacement="floor"
                    />
                </div>
            </div>

            <Footer />
        </div>
    );
}


