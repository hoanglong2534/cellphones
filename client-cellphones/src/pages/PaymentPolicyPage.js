import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './PolicyPage.css';

function PaymentPage() {
    return (
        <div className="policy-page">
            <Header />
            
            {/* Hero Section */}
            <section className="policy-hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Chính Sách Thanh Toán</h1>
                        <p className="hero-subtitle">
                            Các phương thức thanh toán an toàn và tiện lợi tại PL Store
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="policy-content">
                <div className="container">
                    <div className="content-wrapper">
                        
                        {/* Payment Methods */}
                        <div className="policy-section">
                            <h2 className="section-title">Phương Thức Thanh Toán</h2>
                            <div className="payment-methods">
                                <div className="payment-card">
                                    <div className="payment-icon">💳</div>
                                    <h3>Thanh Toán Khi Nhận Hàng (COD)</h3>
                                    <div className="payment-details">
                                        <ul className="feature-list">
                                            <li>Thanh toán bằng tiền mặt khi nhận hàng</li>
                                            <li>Kiểm tra sản phẩm trước khi thanh toán</li>
                                            <li>Miễn phí phí thanh toán</li>
                                            <li>Áp dụng cho tất cả đơn hàng</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="payment-card">
                                    <div className="payment-icon">🏦</div>
                                    <h3>Chuyển Khoản Ngân Hàng</h3>
                                    <div className="payment-details">
                                        <ul className="feature-list">
                                            <li>Chuyển khoản qua Internet Banking</li>
                                            <li>Chuyển khoản tại ATM</li>
                                            <li>Miễn phí phí chuyển khoản</li>
                                            <li>Xác nhận đơn hàng nhanh chóng</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="payment-card">
                                    <div className="payment-icon">💳</div>
                                    <h3>Thẻ Tín Dụng/Ghi Nợ</h3>
                                    <div className="payment-details">
                                        <ul className="feature-list">
                                            <li>Visa, Mastercard, JCB</li>
                                            <li>Thẻ ATM nội địa</li>
                                            <li>Thanh toán trực tuyến an toàn</li>
                                            <li>Hỗ trợ trả góp 0% lãi suất</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="payment-card">
                                    <div className="payment-icon">📱</div>
                                    <h3>Ví Điện Tử</h3>
                                    <div className="payment-details">
                                        <ul className="feature-list">
                                            <li>MoMo, ZaloPay, ViettelPay</li>
                                            <li>Thanh toán nhanh chóng</li>
                                            <li>Bảo mật cao</li>
                                            <li>Nhận mã giảm giá đặc biệt</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bank Accounts */}
                        <div className="policy-section">
                            <h2 className="section-title">Thông Tin Tài Khoản Ngân Hàng</h2>
                            <div className="bank-accounts">
                                <div className="bank-card">
                                    <div className="bank-logo">🏦</div>
                                    <div className="bank-info">
                                        <h3>Ngân hàng Vietcombank</h3>
                                        <div className="account-details">
                                            <p><strong>Số tài khoản:</strong> 1234567890</p>
                                            <p><strong>Chủ tài khoản:</strong> CÔNG TY TNHH PL STORE</p>
                                            <p><strong>Chi nhánh:</strong> Hồ Chí Minh</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bank-card">
                                    <div className="bank-logo">🏦</div>
                                    <div className="bank-info">
                                        <h3>Ngân hàng BIDV</h3>
                                        <div className="account-details">
                                            <p><strong>Số tài khoản:</strong> 0987654321</p>
                                            <p><strong>Chủ tài khoản:</strong> CÔNG TY TNHH PL STORE</p>
                                            <p><strong>Chi nhánh:</strong> Hà Nội</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bank-card">
                                    <div className="bank-logo">🏦</div>
                                    <div className="bank-info">
                                        <h3>Ngân hàng Techcombank</h3>
                                        <div className="account-details">
                                            <p><strong>Số tài khoản:</strong> 1122334455</p>
                                            <p><strong>Chủ tài khoản:</strong> CÔNG TY TNHH PL STORE</p>
                                            <p><strong>Chi nhánh:</strong> Đà Nẵng</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Installment Plans */}
                        <div className="policy-section">
                            <h2 className="section-title">Chương Trình Trả Góp</h2>
                            <div className="installment-plans">
                                <div className="plan-card featured">
                                    <div className="plan-badge">Phổ Biến</div>
                                    <h3>Trả Góp 0% Lãi Suất</h3>
                                    <div className="plan-details">
                                        <ul className="feature-list">
                                            <li>Áp dụng cho sản phẩm từ 3.000.000đ</li>
                                            <li>Kỳ hạn: 3, 6, 9, 12 tháng</li>
                                            <li>Thủ tục đơn giản, duyệt nhanh</li>
                                            <li>Không cần chứng minh thu nhập</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="plan-card">
                                    <h3>Trả Góp Lãi Suất Thấp</h3>
                                    <div className="plan-details">
                                        <ul className="feature-list">
                                            <li>Lãi suất từ 0.8%/tháng</li>
                                            <li>Kỳ hạn: 6, 12, 18, 24 tháng</li>
                                            <li>Áp dụng cho tất cả sản phẩm</li>
                                            <li>Hỗ trợ từ các ngân hàng đối tác</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="plan-card">
                                    <h3>Trả Góp Qua Thẻ Tín Dụng</h3>
                                    <div className="plan-details">
                                        <ul className="feature-list">
                                            <li>Chia nhỏ hóa đơn trên thẻ</li>
                                            <li>Lãi suất theo quy định ngân hàng</li>
                                            <li>Thanh toán tự động hàng tháng</li>
                                            <li>Không cần thủ tục phức tạp</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security */}
                        <div className="policy-section">
                            <h2 className="section-title">Bảo Mật Thanh Toán</h2>
                            <div className="security-features">
                                <div className="security-item">
                                    <div className="security-icon">🔒</div>
                                    <h3>Mã Hóa SSL</h3>
                                    <p>Tất cả thông tin thanh toán được mã hóa SSL 256-bit</p>
                                </div>
                                <div className="security-item">
                                    <div className="security-icon">🛡️</div>
                                    <h3>PCI DSS</h3>
                                    <p>Tuân thủ tiêu chuẩn bảo mật quốc tế PCI DSS</p>
                                </div>
                                <div className="security-item">
                                    <div className="security-icon">🔐</div>
                                    <h3>3D Secure</h3>
                                    <p>Xác thực 3D Secure cho thẻ tín dụng</p>
                                </div>
                                <div className="security-item">
                                    <div className="security-icon">📱</div>
                                    <h3>OTP</h3>
                                    <p>Xác thực OTP qua SMS cho giao dịch</p>
                                </div>
                            </div>
                        </div>

                        {/* Refund Policy */}
                        <div className="policy-section">
                            <h2 className="section-title">Chính Sách Hoàn Tiền</h2>
                            <div className="refund-policy">
                                <div className="refund-card">
                                    <h3>Hoàn Tiền Trong 7 Ngày</h3>
                                    <ul className="feature-list">
                                        <li>Sản phẩm chưa sử dụng, còn nguyên vẹn</li>
                                        <li>Còn đầy đủ phụ kiện và hóa đơn</li>
                                        <li>Không có dấu hiệu sử dụng</li>
                                        <li>Hoàn tiền 100% giá trị sản phẩm</li>
                                    </ul>
                                </div>
                                <div className="refund-card">
                                    <h3>Hoàn Tiền Sau 7 Ngày</h3>
                                    <ul className="feature-list">
                                        <li>Áp dụng cho sản phẩm lỗi từ nhà sản xuất</li>
                                        <li>Có giấy xác nhận từ trung tâm bảo hành</li>
                                        <li>Hoàn tiền hoặc đổi sản phẩm mới</li>
                                        <li>Miễn phí vận chuyển</li>
                                    </ul>
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
                                        <h3>Hotline Thanh Toán</h3>
                                        <p>028.71.087.088</p>
                                        <span>07:00 - 21:00 hàng ngày</span>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon">📧</div>
                                    <div className="contact-details">
                                        <h3>Email Hỗ Trợ</h3>
                                        <p>payment@plstore.vn</p>
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

export default PaymentPage;
