import React, { useEffect } from 'react';
import './Login.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import {login} from '../../actions/UserAction'
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom'

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.userSignin);
  const { userInfo, error } = user;

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  });

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">ĐĂNG NHẬP</h1>
          <p className="auth-subtitle">Chào mừng bạn quay trở lại!</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              {...register("email")} 
              placeholder="Nhập email của bạn" 
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <input
              {...register("password")}
              placeholder="Nhập mật khẩu"
              type="password"
              className="form-input"
              required
            />
          </div>

          {error && (
            <div className="error-message">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <button type="submit" className="auth-button">
            <span>Đăng Nhập</span>
            <span className="button-icon">→</span>
          </button>
          
          <div className="auth-footer">
            <p>Chưa có tài khoản? <Link to="/register" className="auth-link">Đăng ký ngay</Link></p>
          </div>
        </form>
      </div>
      
      <div className="auth-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
    </div>
  );
}

export default Login;