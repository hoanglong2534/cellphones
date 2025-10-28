import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './BlogPage.css';
import { blogPosts } from '../data/blogPosts';

function BlogDetailPage(){
  const { id } = useParams();
  const history = useHistory();
  const post = blogPosts.find(p => String(p.id) === String(id));

  if(!post){
    return (
      <div className="blog-page">
        <Header/>
        <section className="blog-hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Bài viết không tồn tại</h1>
              <p className="hero-subtitle">Vui lòng quay lại trang Blog</p>
            </div>
          </div>
        </section>
        <div className="container" style={{padding: '2rem 0'}}>
          <button className="post-read-more" onClick={()=>history.push('/blog')}>Về trang Blog</button>
        </div>
        <Footer/>
      </div>
    )
  }

  return (
    <div className="blog-page">
      <Header/>
      <section className="blog-hero" style={{background: '#fff', color: 'var(--text-primary)'}}>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title" style={{color: 'var(--text-primary)'}}>{post.title}</h1>
            <p className="hero-subtitle" style={{color: 'var(--text-secondary)'}}>
              {post.author} • {post.date} • {post.readTime}
            </p>
          </div>
        </div>
      </section>

      <section className="policy-content">
        <div className="container">
          <div className="content-wrapper">
            <article className="policy-card" style={{overflow: 'hidden'}}>
              <img src={post.image} alt={post.title} style={{width:'100%', borderRadius: '12px', marginBottom: '1rem'}}/>
              <div className="card-content">
                <div className="post-content" dangerouslySetInnerHTML={{__html: post.content}}/>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  )
}

export default BlogDetailPage;
