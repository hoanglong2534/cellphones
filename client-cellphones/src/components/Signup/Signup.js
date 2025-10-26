import React, { useState } from 'react';
import './Signup.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {SignupUser} from '../../actions/UserAction'
import {Link} from 'react-router-dom'

function Signup(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    
    const onSubmit = data => {
        if(password === confirmPassword) {
            dispatch(SignupUser(data))
            setPasswordError('')
        } else{
            setPasswordError('Mật khẩu xác nhận không khớp')
        }
    }
  
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <h1 className="auth-title">ĐĂNG KÝ</h1>
            <p className="auth-subtitle">Tạo tài khoản mới để bắt đầu mua sắm!</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="form-group">
              <label className="form-label">Họ và tên</label>
              <input 
                {...register("name")} 
                placeholder="Nhập họ và tên của bạn" 
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                {...register("email")}
                placeholder="Nhập email của bạn"
                type="email"
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Xác nhận mật khẩu</label>
              <input
                {...register("repeat password")}
                placeholder="Nhập lại mật khẩu"
                type="password"
                className="form-input"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {passwordError && (
              <div className="error-message">
                <span>⚠️</span>
                <span>{passwordError}</span>
              </div>
            )}

            <button type="submit" className="auth-button">
              <span>Đăng Ký</span>
              <span className="button-icon">→</span>
            </button>
            
            <div className="auth-footer">
              <p>Đã có tài khoản? <Link to="/login" className="auth-link">Đăng nhập ngay</Link></p>
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

export default Signup;