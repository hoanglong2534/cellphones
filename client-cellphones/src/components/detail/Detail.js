import React, { useEffect, useState } from 'react';
import './Detail.css'
import DetailInfo from './DetailInfo'
import RateStar from './RateStar';
import {
    useParams,
    Link
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getproductById } from '../../actions/ProductAction';
import CommentProduct from './CommentProduct';
import BlogContent from './BlogContent';
import ARViewer from '../ARViewer/ARViewer';
import AIChatbot from '../AIChatbot/AIChatbot';

function Detail(props) {
    const dispatch = useDispatch()
    const { id } = useParams();
    const detailProduct = useSelector(state => state.getProductById.product)
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        dispatch(getproductById(id))
    }, [dispatch])

    // Mock data for additional images
    const productImages = detailProduct ? [
        detailProduct.image,
        detailProduct.image,
        detailProduct.image,
        detailProduct.image
    ] : [];

    // Lấy thông số kỹ thuật từ backend thay vì mock data
    const specifications = detailProduct?.specifications ? 
        Object.entries(detailProduct.specifications).map(([label, value]) => ({
            label,
            value
        })) : [];

    const features = detailProduct?.features || [];

    return (
        <section id="detail">
            {
                detailProduct ? (
            <div className="detail">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <div className="container">
                        <nav className="breadcrumb-nav">
                            <a href="/">Trang chủ</a>
                            <span>/</span>
                            <a href="/product">Sản phẩm</a>
                            <span>/</span>
                            <span>{detailProduct.name}</span>
                        </nav>
                    </div>
                </div>

                {/* Product Header */}
                <div className="product-header">
                    <div className="container">
                        <div className="product-title">
                            <h1>{detailProduct.name}</h1>
                            <div className="product-badges">
                                <span className="badge new">Mới</span>
                                <span className="badge discount">-{detailProduct.percentDiscount}%</span>
                                <span className="badge warranty">Bảo hành 12 tháng</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Product Info */}
                <div className="detail-info">
                    <div className="container">
                        <div className="detail-grid">
                            {/* Image Gallery */}
                            <div className="image-gallery">
                                <div className="main-image">
                                    <img src={productImages[selectedImage]} alt={detailProduct.name} />
                                    <div className="image-zoom">
                                        <span>🔍</span>
                                    </div>
                                </div>
                                <div className="thumbnail-images">
                                    {productImages.map((image, index) => (
                                        <div 
                                            key={index}
                                            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                            onClick={() => setSelectedImage(index)}
                                        >
                                            <img src={image} alt={`${detailProduct.name} ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Product Info */}
                            <DetailInfo product={detailProduct}></DetailInfo>
                        </div>
                    </div>
                </div>

                {/* Product Tabs */}
                <div className="product-tabs">
                    <div className="container">
                        <div className="tabs-header">
                            <button 
                                className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                                onClick={() => setActiveTab('description')}
                            >
                                Mô tả sản phẩm
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
                                onClick={() => setActiveTab('specifications')}
                            >
                                Thông số kỹ thuật
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                                onClick={() => setActiveTab('features')}
                            >
                                Tính năng nổi bật
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Đánh giá ({Math.floor(Math.random() * 100) + 50})
                            </button>
                        </div>

                        <div className="tabs-content">
                            {activeTab === 'description' && (
                                <div className="tab-panel">
                                    <BlogContent></BlogContent>
                                </div>
                            )}
                            
                            {activeTab === 'specifications' && (
                                <div className="tab-panel">
                                    <div className="specifications-grid">
                                        {specifications.map((spec, index) => (
                                            <div key={index} className="spec-item">
                                                <span className="spec-label">{spec.label}</span>
                                                <span className="spec-value">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {activeTab === 'features' && (
                                <div className="tab-panel">
                                    <div className="features-grid">
                                        {features.map((feature, index) => (
                                            <div key={index} className="feature-item">
                                                <span className="feature-icon">✓</span>
                                                <span className="feature-text">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {activeTab === 'reviews' && (
                                <div className="tab-panel">
                                    <RateStar></RateStar>
                                    <CommentProduct></CommentProduct>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                    {/* AR/VR Viewer */}
                    <div className="ar-vr-section">
                        <div className="container">
                            <ARViewer product={detailProduct} />
                        </div>
                    </div>

                    {/* Related Products */}
                    <div className="related-products">
                        <div className="container">
                            <h2 className="section-title">Sản phẩm liên quan</h2>
                            <div className="related-grid">
                                {/* Mock related products - sẽ được thay thế bằng data từ backend */}
                                {[1, 2, 3, 4].map(item => (
                                    <Link key={item} to={`/detail/${item}`} className="related-card">
                                        <div className="related-image">
                                            <img src={detailProduct.image} alt="Related product" />
                                            <div className="related-discount">-15%</div>
                                        </div>
                                        <div className="related-info">
                                            <h3>iPhone 14 Pro Max</h3>
                                            <div className="related-price">
                                                <span className="current-price">25.990.000đ</span>
                                                <span className="old-price">30.990.000đ</span>
                                            </div>
                                            <div className="related-rating">
                                                <span className="stars">★★★★☆</span>
                                                <span className="rating-count">(128)</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
            </div>
            ) : (
                <div className="loading-state">
                    <div className="container">
                        <div className="loading-content">
                            <div className="loading-spinner"></div>
                            <p>Đang tải thông tin sản phẩm...</p>
                        </div>
                    </div>
                </div>
            )
            }
            
            {/* AI Chatbot */}
            <AIChatbot products={[detailProduct]} />
        </section>
    );
}

export default Detail;