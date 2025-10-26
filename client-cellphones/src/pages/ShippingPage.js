import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './PolicyPage.css';

function ShippingPage() {
    return (
        <div className="policy-page">
            <Header />
            
            {/* Hero Section */}
            <section className="policy-hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Phương Thức Giao Hàng</h1>
                        <p className="hero-subtitle">
                            Thông tin chi tiết về các phương thức giao hàng của Cellphones
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="policy-content">
                <div className="container">
                    <div className="content-wrapper">
                        
                        {/* Standard Shipping */}
                        <div className="policy-section">
                            <h2 className="section-title">Giao Hàng Tiêu Chuẩn</h2>
                            <div className="policy-card">
                                <div className="card-header">
                                    <h3>🚚 Giao hàng trong thành phố</h3>
                                    <span className="delivery-time">1-2 ngày làm việc</span>
                                </div>
                                <div className="card-content">
                                    <ul className="feature-list">
                                        <li>Giao hàng miễn phí cho đơn hàng từ 500.000đ</li>
                                        <li>Phí giao hàng: 30.000đ cho đơn hàng dưới 500.000đ</li>
                                        <li>Thời gian giao hàng: 8:00 - 18:00</li>
                                        <li>Hỗ trợ giao hàng vào cuối tuần</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Express Shipping */}
                        <div className="policy-section">
                            <h2 className="section-title">Giao Hàng Nhanh</h2>
                            <div className="policy-card">
                                <div className="card-header">
                                    <h3>⚡ Giao hàng trong ngày</h3>
                                    <span className="delivery-time">2-6 giờ</span>
                                </div>
                                <div className="card-content">
                                    <ul className="feature-list">
                                        <li>Phí giao hàng: 50.000đ</li>
                                        <li>Chỉ áp dụng cho đơn hàng trước 14:00</li>
                                        <li>Giao hàng trong bán kính 15km từ cửa hàng</li>
                                        <li>Hỗ trợ giao hàng vào cuối tuần</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Pickup */}
                        <div className="policy-section">
                            <h2 className="section-title">Nhận Hàng Tại Cửa Hàng</h2>
                            <div className="policy-card">
                                <div className="card-header">
                                    <h3>🏪 Tự đến lấy hàng</h3>
                                    <span className="delivery-time">Miễn phí</span>
                                </div>
                                <div className="card-content">
                                    <ul className="feature-list">
                                        <li>Miễn phí nhận hàng tại cửa hàng</li>
                                        <li>Thời gian chuẩn bị: 30 phút - 2 giờ</li>
                                        <li>Kiểm tra sản phẩm trước khi nhận</li>
                                        <li>Hỗ trợ tư vấn và hướng dẫn sử dụng</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Areas */}
                        <div className="policy-section">
                            <h2 className="section-title">Khu Vực Giao Hàng</h2>
                            <div className="delivery-areas">
                                <div className="area-group">
                                    <h3>Hồ Chí Minh</h3>
                                    <div className="area-list">
                                        <span className="area-item">Quận 1</span>
                                        <span className="area-item">Quận 2</span>
                                        <span className="area-item">Quận 3</span>
                                        <span className="area-item">Quận 4</span>
                                        <span className="area-item">Quận 5</span>
                                        <span className="area-item">Quận 6</span>
                                        <span className="area-item">Quận 7</span>
                                        <span className="area-item">Quận 8</span>
                                        <span className="area-item">Quận 9</span>
                                        <span className="area-item">Quận 10</span>
                                        <span className="area-item">Quận 11</span>
                                        <span className="area-item">Quận 12</span>
                                        <span className="area-item">Thủ Đức</span>
                                        <span className="area-item">Bình Thạnh</span>
                                        <span className="area-item">Tân Bình</span>
                                        <span className="area-item">Tân Phú</span>
                                        <span className="area-item">Phú Nhuận</span>
                                        <span className="area-item">Gò Vấp</span>
                                        <span className="area-item">Bình Tân</span>
                                        <span className="area-item">Hóc Môn</span>
                                        <span className="area-item">Củ Chi</span>
                                        <span className="area-item">Bình Chánh</span>
                                        <span className="area-item">Nhà Bè</span>
                                        <span className="area-item">Cần Giờ</span>
                                    </div>
                                </div>
                                
                                <div className="area-group">
                                    <h3>Hà Nội</h3>
                                    <div className="area-list">
                                        <span className="area-item">Ba Đình</span>
                                        <span className="area-item">Hoàn Kiếm</span>
                                        <span className="area-item">Tây Hồ</span>
                                        <span className="area-item">Long Biên</span>
                                        <span className="area-item">Cầu Giấy</span>
                                        <span className="area-item">Đống Đa</span>
                                        <span className="area-item">Hai Bà Trưng</span>
                                        <span className="area-item">Hoàng Mai</span>
                                        <span className="area-item">Thanh Xuân</span>
                                        <span className="area-item">Sóc Sơn</span>
                                        <span className="area-item">Đông Anh</span>
                                        <span className="area-item">Gia Lâm</span>
                                        <span className="area-item">Nam Từ Liêm</span>
                                        <span className="area-item">Thanh Trì</span>
                                        <span className="area-item">Bắc Từ Liêm</span>
                                        <span className="area-item">Mê Linh</span>
                                        <span className="area-item">Hà Đông</span>
                                        <span className="area-item">Sơn Tây</span>
                                        <span className="area-item">Ba Vì</span>
                                        <span className="area-item">Phúc Thọ</span>
                                        <span className="area-item">Đan Phượng</span>
                                        <span className="area-item">Hoài Đức</span>
                                        <span className="area-item">Quốc Oai</span>
                                        <span className="area-item">Thạch Thất</span>
                                        <span className="area-item">Chương Mỹ</span>
                                        <span className="area-item">Thanh Oai</span>
                                        <span className="area-item">Thường Tín</span>
                                        <span className="area-item">Phú Xuyên</span>
                                        <span className="area-item">Ứng Hòa</span>
                                        <span className="area-item">Mỹ Đức</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Important Notes */}
                        <div className="policy-section">
                            <h2 className="section-title">Lưu Ý Quan Trọng</h2>
                            <div className="notes-grid">
                                <div className="note-card">
                                    <div className="note-icon">📞</div>
                                    <h3>Liên Hệ Trước Khi Giao</h3>
                                    <p>Nhân viên sẽ gọi điện xác nhận trước khi giao hàng</p>
                                </div>
                                <div className="note-card">
                                    <div className="note-icon">📋</div>
                                    <h3>Kiểm Tra Hàng Hóa</h3>
                                    <p>Vui lòng kiểm tra sản phẩm trước khi ký nhận</p>
                                </div>
                                <div className="note-card">
                                    <div className="note-icon">🔄</div>
                                    <h3>Đổi Trả Miễn Phí</h3>
                                    <p>Hỗ trợ đổi trả miễn phí trong 7 ngày đầu</p>
                                </div>
                                <div className="note-card">
                                    <div className="note-icon">🛡️</div>
                                    <h3>Bảo Hiểm Hàng Hóa</h3>
                                    <p>Tất cả sản phẩm đều được bảo hiểm trong quá trình vận chuyển</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="contact-section">
                            <h2 className="section-title">Liên Hệ Hỗ Trợ</h2>
                            <div className="contact-info">
                                <div className="contact-item">
                                    <div className="contact-icon">📞</div>
                                    <div className="contact-details">
                                        <h3>Hotline Giao Hàng</h3>
                                        <p>1800 6936</p>
                                        <span>07:00 - 21:00 hàng ngày</span>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon">📧</div>
                                    <div className="contact-details">
                                        <h3>Email Hỗ Trợ</h3>
                                        <p>delivery@cellphones.com.vn</p>
                                        <span>Phản hồi trong 24h</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default ShippingPage;
