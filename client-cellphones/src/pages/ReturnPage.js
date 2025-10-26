import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './PolicyPage.css';

function ReturnPage() {
    return (
        <div className="policy-page">
            <Header />
            
            {/* Hero Section */}
            <section className="policy-hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Chính Sách Đổi Trả</h1>
                        <p className="hero-subtitle">
                            Thông tin chi tiết về chính sách đổi trả và hoàn tiền tại Cellphones
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="policy-content">
                <div className="container">
                    <div className="content-wrapper">
                        
                        {/* Return Conditions */}
                        <div className="policy-section">
                            <h2 className="section-title">Điều Kiện Đổi Trả</h2>
                            <div className="conditions-grid">
                                <div className="condition-card">
                                    <div className="condition-icon">✅</div>
                                    <h3>Được Phép Đổi Trả</h3>
                                    <ul className="feature-list">
                                        <li>Sản phẩm còn nguyên vẹn, chưa sử dụng</li>
                                        <li>Còn đầy đủ phụ kiện, hộp, hóa đơn</li>
                                        <li>Không có dấu hiệu sử dụng hoặc hỏng hóc</li>
                                        <li>Trong thời hạn 7 ngày kể từ ngày mua</li>
                                        <li>Sản phẩm lỗi từ nhà sản xuất</li>
                                    </ul>
                                </div>
                                <div className="condition-card">
                                    <div className="condition-icon">❌</div>
                                    <h3>Không Được Đổi Trả</h3>
                                    <ul className="feature-list">
                                        <li>Sản phẩm đã sử dụng hoặc có dấu hiệu hỏng</li>
                                        <li>Thiếu phụ kiện, hộp hoặc hóa đơn</li>
                                        <li>Quá thời hạn 7 ngày</li>
                                        <li>Sản phẩm đã được tùy chỉnh theo yêu cầu</li>
                                        <li>Sản phẩm thuộc danh mục không đổi trả</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Return Process */}
                        <div className="policy-section">
                            <h2 className="section-title">Quy Trình Đổi Trả</h2>
                            <div className="process-steps">
                                <div className="process-step">
                                    <div className="step-number">1</div>
                                    <div className="step-content">
                                        <h3>Liên Hệ Hỗ Trợ</h3>
                                        <p>Gọi hotline hoặc gửi email để thông báo về việc đổi trả</p>
                                        <div className="step-details">
                                            <span>📞 Hotline: 028.71.087.088</span>
                                            <span>📧 Email: support@cellphones.com.vn</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="process-step">
                                    <div className="step-number">2</div>
                                    <div className="step-content">
                                        <h3>Chuẩn Bị Sản Phẩm</h3>
                                        <p>Đóng gói sản phẩm cùng đầy đủ phụ kiện và hóa đơn</p>
                                        <div className="step-details">
                                            <span>📦 Đóng gói cẩn thận</span>
                                            <span>📄 Kèm theo hóa đơn</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="process-step">
                                    <div className="step-number">3</div>
                                    <div className="step-content">
                                        <h3>Gửi Sản Phẩm</h3>
                                        <p>Gửi sản phẩm về địa chỉ được chỉ định hoặc mang đến cửa hàng</p>
                                        <div className="step-details">
                                            <span>🚚 Miễn phí vận chuyển</span>
                                            <span>🏪 Hoặc mang đến cửa hàng</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="process-step">
                                    <div className="step-number">4</div>
                                    <div className="step-content">
                                        <h3>Kiểm Tra & Xử Lý</h3>
                                        <p>Chúng tôi sẽ kiểm tra và xử lý đổi trả trong 3-5 ngày làm việc</p>
                                        <div className="step-details">
                                            <span>🔍 Kiểm tra chất lượng</span>
                                            <span>💰 Hoàn tiền hoặc đổi sản phẩm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Return Methods */}
                        <div className="policy-section">
                            <h2 className="section-title">Phương Thức Đổi Trả</h2>
                            <div className="return-methods">
                                <div className="method-card">
                                    <div className="method-icon">🏪</div>
                                    <h3>Đổi Tại Cửa Hàng</h3>
                                    <div className="method-details">
                                        <ul className="feature-list">
                                            <li>Mang sản phẩm đến cửa hàng gần nhất</li>
                                            <li>Kiểm tra và đổi ngay tại chỗ</li>
                                            <li>Miễn phí dịch vụ</li>
                                            <li>Thời gian: 8:00 - 22:00 hàng ngày</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="method-card">
                                    <div className="method-icon">🚚</div>
                                    <h3>Đổi Qua Giao Hàng</h3>
                                    <div className="method-details">
                                        <ul className="feature-list">
                                            <li>Gọi hotline để đặt lịch nhận hàng</li>
                                            <li>Nhân viên đến nhà nhận sản phẩm</li>
                                            <li>Miễn phí vận chuyển</li>
                                            <li>Thời gian: 3-5 ngày làm việc</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="method-card">
                                    <div className="method-icon">📦</div>
                                    <h3>Gửi Qua Bưu Điện</h3>
                                    <div className="method-details">
                                        <ul className="feature-list">
                                            <li>Gửi qua dịch vụ bưu điện</li>
                                            <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</li>
                                            <li>Hoàn phí vận chuyển</li>
                                            <li>Thời gian: 5-7 ngày làm việc</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Refund Policy */}
                        <div className="policy-section">
                            <h2 className="section-title">Chính Sách Hoàn Tiền</h2>
                            <div className="refund-policy">
                                <div className="refund-card">
                                    <h3>Hoàn Tiền 100%</h3>
                                    <div className="refund-conditions">
                                        <ul className="feature-list">
                                            <li>Sản phẩm còn nguyên vẹn, chưa sử dụng</li>
                                            <li>Còn đầy đủ phụ kiện và hóa đơn</li>
                                            <li>Trong thời hạn 7 ngày</li>
                                            <li>Không phải lỗi từ phía khách hàng</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="refund-card">
                                    <h3>Hoàn Tiền Có Phí</h3>
                                    <div className="refund-conditions">
                                        <ul className="feature-list">
                                            <li>Sản phẩm đã sử dụng nhưng còn tốt</li>
                                            <li>Trừ phí kiểm tra và vận chuyển</li>
                                            <li>Hoàn tiền theo giá trị thực tế</li>
                                            <li>Phí trừ: 5-10% giá trị sản phẩm</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="refund-card">
                                    <h3>Đổi Sản Phẩm</h3>
                                    <div className="refund-conditions">
                                        <ul className="feature-list">
                                            <li>Đổi sang sản phẩm cùng loại</li>
                                            <li>Bù thêm tiền nếu giá cao hơn</li>
                                            <li>Hoàn tiền nếu giá thấp hơn</li>
                                            <li>Miễn phí dịch vụ đổi</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Special Cases */}
                        <div className="policy-section">
                            <h2 className="section-title">Trường Hợp Đặc Biệt</h2>
                            <div className="special-cases">
                                <div className="case-card">
                                    <div className="case-icon">📱</div>
                                    <h3>Điện Thoại & Máy Tính Bảng</h3>
                                    <ul className="feature-list">
                                        <li>Kiểm tra IMEI và serial number</li>
                                        <li>Không được unlock hoặc jailbreak</li>
                                        <li>Pin không được sạc quá 50%</li>
                                        <li>Màn hình không có vết xước</li>
                                    </ul>
                                </div>
                                <div className="case-card">
                                    <div className="case-icon">💻</div>
                                    <h3>Laptop & Máy Tính</h3>
                                    <ul className="feature-list">
                                        <li>Không được cài đặt phần mềm</li>
                                        <li>Hệ điều hành còn nguyên bản</li>
                                        <li>Không được tháo lắp linh kiện</li>
                                        <li>Bảo hành còn nguyên vẹn</li>
                                    </ul>
                                </div>
                                <div className="case-card">
                                    <div className="case-icon">🎧</div>
                                    <h3>Phụ Kiện</h3>
                                    <ul className="feature-list">
                                        <li>Không được sử dụng</li>
                                        <li>Còn nguyên tem và nhãn</li>
                                        <li>Không có dấu hiệu mài mòn</li>
                                        <li>Đóng gói còn nguyên vẹn</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Warranty */}
                        <div className="policy-section">
                            <h2 className="section-title">Bảo Hành & Đổi Trả</h2>
                            <div className="warranty-info">
                                <div className="warranty-card">
                                    <h3>Bảo Hành Chính Hãng</h3>
                                    <div className="warranty-details">
                                        <ul className="feature-list">
                                            <li>Bảo hành theo tiêu chuẩn nhà sản xuất</li>
                                            <li>Thời gian bảo hành: 12-24 tháng</li>
                                            <li>Đổi mới nếu không sửa được</li>
                                            <li>Miễn phí sửa chữa trong thời hạn</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="warranty-card">
                                    <h3>Bảo Hành Mở Rộng</h3>
                                    <div className="warranty-details">
                                        <ul className="feature-list">
                                            <li>Gia hạn bảo hành thêm 12 tháng</li>
                                            <li>Chi phí: 5-10% giá trị sản phẩm</li>
                                            <li>Bảo hành toàn diện</li>
                                            <li>Hỗ trợ tại nhà</li>
                                        </ul>
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
                                        <h3>Hotline Đổi Trả</h3>
                                        <p>028.71.087.088</p>
                                        <span>07:00 - 21:00 hàng ngày</span>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon">📧</div>
                                    <div className="contact-details">
                                        <h3>Email Hỗ Trợ</h3>
                                        <p>return@cellphones.com.vn</p>
                                        <span>Phản hồi trong 24h</span>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon">🏪</div>
                                    <div className="contact-details">
                                        <h3>Cửa Hàng</h3>
                                        <p>123 Đường ABC, Quận XYZ</p>
                                        <span>8:00 - 22:00 hàng ngày</span>
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

export default ReturnPage;
