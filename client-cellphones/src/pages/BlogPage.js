import React, { useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './BlogPage.css';
import { blogPosts } from '../data/blogPosts';
import { useHistory } from 'react-router-dom';

function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const history = useHistory();

    const categories = [
        { id: 'all', name: 'Tất Cả' },
        { id: 'news', name: 'Tin Tức' },
        { id: 'reviews', name: 'Đánh Giá' },
        { id: 'tips', name: 'Mẹo Vặt' },
        { id: 'tech', name: 'Công Nghệ' }
    ];

    const filteredPosts = selectedCategory === 'all' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === selectedCategory);

    const featuredPosts = blogPosts.filter(post => post.featured);

    const openPost = (id) => history.push(`/blog/${id}`);

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
                            <article key={post.id} className="featured-card" onClick={() => openPost(post.id)} style={{cursor:'pointer'}}>
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
                                        <button className="read-more" onClick={(e)=>{e.stopPropagation();openPost(post.id)}}>Đọc Thêm</button>
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
                                        <button className="post-read-more" onClick={() => openPost(post.id)}>Đọc Thêm</button>
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
