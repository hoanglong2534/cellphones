import React, { useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './BlogPage.css';

function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'Tất Cả' },
        { id: 'news', name: 'Tin Tức' },
        { id: 'reviews', name: 'Đánh Giá' },
        { id: 'tips', name: 'Mẹo Vặt' },
        { id: 'tech', name: 'Công Nghệ' }
    ];

    const blogPosts = [
        {
            id: 1,
            title: 'iPhone 15 Pro Max: Đánh giá chi tiết sau 1 tháng sử dụng',
            excerpt: 'Trải nghiệm thực tế với iPhone 15 Pro Max - chiếc smartphone cao cấp nhất của Apple hiện tại.',
            category: 'reviews',
            author: 'Nguyễn Văn A',
            date: '15/12/2023',
            readTime: '8 phút',
            image: 'https://via.placeholder.com/400x250/007AFF/FFFFFF?text=iPhone+15+Pro+Max',
            featured: true
        },
        {
            id: 2,
            title: 'Top 10 điện thoại Android tốt nhất năm 2023',
            excerpt: 'Danh sách những chiếc điện thoại Android đáng mua nhất trong năm 2023.',
            category: 'news',
            author: 'Trần Thị B',
            date: '12/12/2023',
            readTime: '12 phút',
            image: 'https://via.placeholder.com/400x250/34C759/FFFFFF?text=Android+Phones',
            featured: false
        },
        {
            id: 3,
            title: 'Cách bảo vệ điện thoại khỏi virus và malware',
            excerpt: 'Hướng dẫn chi tiết cách bảo vệ thiết bị di động của bạn khỏi các mối đe dọa bảo mật.',
            category: 'tips',
            author: 'Lê Văn C',
            date: '10/12/2023',
            readTime: '6 phút',
            image: 'https://via.placeholder.com/400x250/FF9500/FFFFFF?text=Security',
            featured: false
        },
        {
            id: 4,
            title: 'Samsung Galaxy S24 Ultra: Những tính năng mới đáng chú ý',
            excerpt: 'Khám phá những tính năng độc đáo và cải tiến của Galaxy S24 Ultra.',
            category: 'tech',
            author: 'Phạm Thị D',
            date: '8/12/2023',
            readTime: '10 phút',
            image: 'https://via.placeholder.com/400x250/000000/FFFFFF?text=Galaxy+S24',
            featured: true
        },
        {
            id: 5,
            title: 'Xu hướng công nghệ di động năm 2024',
            excerpt: 'Dự đoán những xu hướng công nghệ sẽ thống trị thị trường smartphone trong năm tới.',
            category: 'tech',
            author: 'Hoàng Văn E',
            date: '5/12/2023',
            readTime: '15 phút',
            image: 'https://via.placeholder.com/400x250/5856D6/FFFFFF?text=2024+Trends',
            featured: false
        },
        {
            id: 6,
            title: 'Cách chọn điện thoại phù hợp với ngân sách',
            excerpt: 'Hướng dẫn chọn mua điện thoại phù hợp với túi tiền và nhu cầu sử dụng.',
            category: 'tips',
            author: 'Vũ Thị F',
            date: '3/12/2023',
            readTime: '7 phút',
            image: 'https://via.placeholder.com/400x250/FF3B30/FFFFFF?text=Budget+Guide',
            featured: false
        }
    ];

    const filteredPosts = selectedCategory === 'all' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === selectedCategory);

    const featuredPosts = blogPosts.filter(post => post.featured);

    return (
        <div className="blog-page">
            <Header />
            
            {/* Hero Section */}
            <section className="blog-hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Blog Công Nghệ</h1>
                        <p className="hero-subtitle">
                            Cập nhật tin tức, đánh giá và mẹo vặt về công nghệ mới nhất
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Posts */}
            <section className="featured-posts">
                <div className="container">
                    <h2 className="section-title">Bài Viết Nổi Bật</h2>
                    <div className="featured-grid">
                        {featuredPosts.map(post => (
                            <article key={post.id} className="featured-card">
                                <div className="card-image">
                                    <img src={post.image} alt={post.title} />
                                    <div className="card-badge">Nổi Bật</div>
                                </div>
                                <div className="card-content">
                                    <div className="card-meta">
                                        <span className="category">{categories.find(c => c.id === post.category)?.name}</span>
                                        <span className="date">{post.date}</span>
                                        <span className="read-time">{post.readTime}</span>
                                    </div>
                                    <h3 className="card-title">{post.title}</h3>
                                    <p className="card-excerpt">{post.excerpt}</p>
                                    <div className="card-footer">
                                        <span className="author">Bởi {post.author}</span>
                                        <button className="read-more">Đọc Thêm</button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="blog-posts">
                <div className="container">
                    <div className="posts-header">
                        <h2 className="section-title">Tất Cả Bài Viết</h2>
                        
                        {/* Category Filter */}
                        <div className="category-filter">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="posts-grid">
                        {filteredPosts.map(post => (
                            <article key={post.id} className="post-card">
                                <div className="post-image">
                                    <img src={post.image} alt={post.title} />
                                    <div className="post-category">
                                        {categories.find(c => c.id === post.category)?.name}
                                    </div>
                                </div>
                                <div className="post-content">
                                    <div className="post-meta">
                                        <span className="post-date">{post.date}</span>
                                        <span className="post-read-time">{post.readTime}</span>
                                    </div>
                                    <h3 className="post-title">{post.title}</h3>
                                    <p className="post-excerpt">{post.excerpt}</p>
                                    <div className="post-footer">
                                        <span className="post-author">Bởi {post.author}</span>
                                        <button className="post-read-more">Đọc Thêm</button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter">
                <div className="container">
                    <div className="newsletter-content">
                        <h2>Đăng Ký Nhận Tin</h2>
                        <p>Nhận thông tin về sản phẩm mới và bài viết hay nhất</p>
                        <div className="newsletter-form">
                            <input type="email" placeholder="Nhập email của bạn" />
                            <button>Đăng Ký</button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default BlogPage;
