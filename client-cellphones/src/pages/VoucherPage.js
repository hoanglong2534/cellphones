import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './PolicyPage.css';

function VoucherPage() {
    return (
        <div className="policy-page">
            <Header />
            
            {/* Hero Section */}
            <section className="policy-hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Mã Giảm Giá</h1>
                        <p className="hero-subtitle">
                            Khám phá các chương trình khuyến mãi và mã giảm giá hấp dẫn
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="policy-content">
                <div className="container">
                    <div className="content-wrapper">
                        
                        {/* Current Vouchers */}
                        <div className="policy-section">
                            <h2 className="section-title">Mã Giảm Giá Hiện Tại</h2>
                            <div className="voucher-grid">
                                <div className="voucher-card featured">
                                    <div className="voucher-badge">Hot</div>
                                    <div className="voucher-header">
                                        <h3>GIAM50K</h3>
                                        <span className="voucher-value">50.000đ</span>
                                    </div>
                                    <div className="voucher-details">
                                        <p>Giảm 50.000đ cho đơn hàng từ 500.000đ</p>
                                        <div className="voucher-conditions">
                                            <span>• Áp dụng cho tất cả sản phẩm</span>
                                            <span>• Không áp dụng với khuyến mãi khác</span>
                                            <span>• Có hiệu lực đến 31/12/2023</span>
                                        </div>
                                    </div>
                                    <button className="voucher-button">Sử Dụng Ngay</button>
                                </div>

                                <div className="voucher-card">
                                    <div className="voucher-header">
                                        <h3>FREESHIP</h3>
                                        <span className="voucher-value">Miễn phí</span>
                                    </div>
                                    <div className="voucher-details">
                                        <p>Miễn phí vận chuyển cho đơn hàng từ 200.000đ</p>
                                        <div className="voucher-conditions">
                                            <span>• Áp dụng cho giao hàng tiêu chuẩn</span>
                                            <span>• Không áp dụng cho giao hàng nhanh</span>
                                            <span>• Có hiệu lực đến 31/12/2023</span>
                                        </div>
                                    </div>
                                    <button className="voucher-button">Sử Dụng Ngay</button>
                                </div>

                                <div className="voucher-card">
                                    <div className="voucher-header">
                                        <h3>NEWUSER</h3>
                                        <span className="voucher-value">100.000đ</span>
                                    </div>
                                    <div className="voucher-details">
                                        <p>Giảm 100.000đ cho khách hàng mới</p>
                                        <div className="voucher-conditions">
                                            <span>• Chỉ áp dụng cho lần mua đầu tiên</span>
                                            <span>• Đơn hàng từ 1.000.000đ</span>
                                            <span>• Có hiệu lực đến 31/12/2023</span>
                                        </div>
                                    </div>
                                    <button className="voucher-button">Sử Dụng Ngay</button>
                                </div>

                                <div className="voucher-card">
                                    <div className="voucher-header">
                                        <h3>VIP10</h3>
                                        <span className="voucher-value">10%</span>
                                    </div>
                                    <div className="voucher-details">
                                        <p>Giảm 10% cho khách hàng VIP</p>
                                        <div className="voucher-conditions">
                                            <span>• Chỉ áp dụng cho khách hàng VIP</span>
                                            <span>• Đơn hàng từ 2.000.000đ</span>
                                            <span>• Có hiệu lực đến 31/12/2023</span>
                                        </div>
                                    </div>
                                    <button className="voucher-button">Sử Dụng Ngay</button>
                                </div>
                            </div>
                        </div>

                        {/* How to Use */}
                        <div className="policy-section">
                            <h2 className="section-title">Cách Sử Dụng Mã Giảm Giá</h2>
                            <div className="steps-container">
                                <div className="step-item">
                                    <div className="step-number">1</div>
                                    <div className="step-content">
                                        <h3>Chọn Sản Phẩm</h3>
                                        <p>Thêm sản phẩm vào giỏ hàng và tiến hành thanh toán</p>
                                    </div>
                                </div>
                                <div className="step-item">
                                    <div className="step-number">2</div>
                                    <div className="step-content">
                                        <h3>Nhập Mã Giảm Giá</h3>
                                        <p>Nhập mã giảm giá vào ô "Mã khuyến mãi" trong trang thanh toán</p>
                                    </div>
                                </div>
                                <div className="step-item">
                                    <div className="step-number">3</div>
                                    <div className="step-content">
                                        <h3>Áp Dụng Mã</h3>
                                        <p>Nhấn "Áp dụng" để kiểm tra và áp dụng mã giảm giá</p>
                                    </div>
                                </div>
                                <div className="step-item">
                                    <div className="step-number">4</div>
                                    <div className="step-content">
                                        <h3>Hoàn Tất Đơn Hàng</h3>
                                        <p>Kiểm tra tổng tiền và hoàn tất đơn hàng</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="policy-section">
                            <h2 className="section-title">Điều Kiện Sử Dụng</h2>
                            <div className="terms-grid">
                                <div className="term-card">
                                    <div className="term-icon">📅</div>
                                    <h3>Thời Hạn Sử Dụng</h3>
                                    <ul className="feature-list">
                                        <li>Mỗi mã có thời hạn sử dụng riêng</li>
                                        <li>Không thể gia hạn hoặc chuyển nhượng</li>
                                        <li>Hết hạn sẽ không thể sử dụng</li>
                                    </ul>
                                </div>
                                <div className="term-card">
                                    <div className="term-icon">🛒</div>
                                    <h3>Điều Kiện Đơn Hàng</h3>
                                    <ul className="feature-list">
                                        <li>Mỗi mã có điều kiện đơn hàng tối thiểu</li>
                                        <li>Không áp dụng cho sản phẩm đã giảm giá</li>
                                        <li>Một mã chỉ sử dụng một lần</li>
                                    </ul>
                                </div>
                                <div className="term-card">
                                    <div className="term-icon">👤</div>
                                    <h3>Điều Kiện Khách Hàng</h3>
                                    <ul className="feature-list">
                                        <li>Một số mã chỉ dành cho khách hàng mới</li>
                                        <li>Một số mã chỉ dành cho khách hàng VIP</li>
                                        <li>Không áp dụng cho nhân viên công ty</li>
                                    </ul>
                                </div>
                                <div className="term-card">
                                    <div className="term-icon">❌</div>
                                    <h3>Trường Hợp Không Áp Dụng</h3>
                                    <ul className="feature-list">
                                        <li>Sản phẩm đã có khuyến mãi khác</li>
                                        <li>Đơn hàng trả góp</li>
                                        <li>Sản phẩm đặc biệt theo quy định</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Loyalty Program */}
                        <div className="policy-section">
                            <h2 className="section-title">Chương Trình Thành Viên</h2>
                            <div className="loyalty-program">
                                <div className="loyalty-card">
                                    <div className="loyalty-level bronze">
                                        <h3>Thành Viên Đồng</h3>
                                        <div className="level-benefits">
                                            <p>Mua sắm từ 1.000.000đ</p>
                                            <ul className="feature-list">
                                                <li>Giảm giá 2% cho đơn hàng tiếp theo</li>
                                                <li>Miễn phí vận chuyển từ 300.000đ</li>
                                                <li>Ưu tiên hỗ trợ khách hàng</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="loyalty-card">
                                    <div className="loyalty-level silver">
                                        <h3>Thành Viên Bạc</h3>
                                        <div className="level-benefits">
                                            <p>Mua sắm từ 5.000.000đ</p>
                                            <ul className="feature-list">
                                                <li>Giảm giá 5% cho đơn hàng tiếp theo</li>
                                                <li>Miễn phí vận chuyển từ 200.000đ</li>
                                                <li>Giao hàng nhanh miễn phí</li>
                                                <li>Tặng quà sinh nhật</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="loyalty-card">
                                    <div className="loyalty-level gold">
                                        <h3>Thành Viên Vàng</h3>
                                        <div className="level-benefits">
                                            <p>Mua sắm từ 10.000.000đ</p>
                                            <ul className="feature-list">
                                                <li>Giảm giá 10% cho đơn hàng tiếp theo</li>
                                                <li>Miễn phí vận chuyển không giới hạn</li>
                                                <li>Giao hàng trong ngày miễn phí</li>
                                                <li>Tặng quà sinh nhật và ngày lễ</li>
                                                <li>Tư vấn sản phẩm riêng</li>
                                            </ul>
                                        </div>
                                    </div>
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
                                        <h3>Hotline Khuyến Mãi</h3>
                                        <p>028.71.087.088</p>
                                        <span>07:00 - 21:00 hàng ngày</span>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon">📧</div>
                                    <div className="contact-details">
                                        <h3>Email Hỗ Trợ</h3>
                                        <p>promotion@cellphones.com.vn</p>
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

export default VoucherPage;
