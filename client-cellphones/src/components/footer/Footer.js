import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'

function Footer(props) {
    return (
        <section id="footer">
            <div className="footer">
                <div className="footer-top">
                    <div className="footer-top-name">
                        <h2>pl store</h2>
                    </div>
                    <div className="footer-top-about">
                        <h2>PL Store</h2>
                        <ul>
                            <li>
                                <Link to="/about">Về Chúng Tôi</Link>
                            </li>
                            <li>
                                <Link to="/blog">Blog</Link>
                            </li>
                            <li>
                                <Link to="/careers">Cơ Hội Nghề Nghiệp</Link>
                            </li>
                            <li>
                                <Link to="/stores">Cửa Hàng</Link>
                            </li>
                            <li>
                                <a><img src="https://theme.hstatic.net/1000075078/1000610097/14/gov.png?v=664" alt="Government certification"></img></a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-top-sp">
                        <h2>Always-on Support</h2>
                        <p>Support 028.71.087.088 (07:00-21:00)</p>
                        <p>Delivery 1800 6936 (07:00-21:00)</p>
                    </div>
                    <div className="footer-top-delivery">
                        <h2>Giao Hàng</h2>
                        <ul>
                            <li>
                                <Link to="/shipping">Phương thức giao hàng</Link>
                            </li>
                            <li>
                                <Link to="/payment-policy">Thanh toán</Link>
                            </li>
                            <li>
                                <Link to="/voucher">Mã giảm giá</Link>
                            </li>
                            <li>
                                <Link to="/return">Chính sách đổi trả</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bot">
                    <p>Copyright © 2025 PL Store. All rights reserved.</p>
                </div>
            </div>
        </section>
    );
}

export default Footer;