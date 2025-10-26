import React, { useState, useEffect, useRef } from 'react';
import './AIChatbot.css';

function AIChatbot({ products = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Xin chào! Tôi là AI Assistant của Cellphones. Tôi có thể giúp bạn tìm hiểu về các sản phẩm điện thoại, so sánh tính năng, và đưa ra gợi ý phù hợp. Bạn muốn hỏi gì?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Mock AI responses - sẽ được thay thế bằng API thực tế
    const getAIResponse = async (userMessage) => {
        setIsTyping(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        const lowerMessage = userMessage.toLowerCase();
        let response = '';
        
        // Simple keyword-based responses (sẽ được thay thế bằng AI thực tế)
        if (lowerMessage.includes('iphone') || lowerMessage.includes('apple')) {
            response = `iPhone là dòng điện thoại cao cấp của Apple với nhiều tính năng nổi bật:
            
📱 **iPhone 15 Pro Max** - 25.990.000đ
• Chip A17 Pro mạnh mẽ
• Camera 48MP với zoom 5x
• Màn hình Super Retina XDR 6.7"
• Pin sử dụng cả ngày

📱 **iPhone 14** - 18.990.000đ  
• Chip A15 Bionic
• Camera 12MP chất lượng cao
• Màn hình 6.1" OLED
• Face ID bảo mật cao

Bạn quan tâm đến model nào? Tôi có thể so sánh chi tiết hơn!`;
        } else if (lowerMessage.includes('samsung') || lowerMessage.includes('galaxy')) {
            response = `Samsung Galaxy là dòng điện thoại Android hàng đầu với nhiều lựa chọn:

📱 **Galaxy S23 Ultra** - 22.990.000đ
• Chip Snapdragon 8 Gen 2
• Camera 200MP với S Pen
• Màn hình Dynamic AMOLED 6.8"
• Pin 5000mAh

📱 **Galaxy A54** - 8.990.000đ
• Chip Exynos 1380
• Camera 50MP OIS
• Màn hình Super AMOLED 6.4"
• Pin 5000mAh

Bạn muốn tìm hiểu về model nào?`;
        } else if (lowerMessage.includes('giá') || lowerMessage.includes('price') || lowerMessage.includes('tiền')) {
            response = `Tôi có thể giúp bạn tìm sản phẩm theo ngân sách:

💰 **Dưới 5 triệu:**
• Samsung Galaxy A14 - 3.990.000đ
• Xiaomi Redmi Note 12 - 4.290.000đ

💰 **5-10 triệu:**
• Samsung Galaxy A54 - 8.990.000đ
• iPhone 12 - 9.990.000đ

💰 **10-20 triệu:**
• iPhone 13 - 15.990.000đ
• Samsung Galaxy S23 - 18.990.000đ

💰 **Trên 20 triệu:**
• iPhone 15 Pro Max - 25.990.000đ
• Samsung Galaxy S23 Ultra - 22.990.000đ

Bạn có ngân sách bao nhiêu? Tôi sẽ gợi ý sản phẩm phù hợp!`;
        } else if (lowerMessage.includes('so sánh') || lowerMessage.includes('compare')) {
            response = `Tôi có thể so sánh các sản phẩm cho bạn! Hãy cho tôi biết:

🔍 **Bạn muốn so sánh:**
• iPhone vs Samsung
• Các model trong cùng hãng
• Sản phẩm cụ thể nào

📊 **Tiêu chí so sánh:**
• Giá cả
• Camera
• Hiệu năng
• Pin
• Màn hình

Ví dụ: "So sánh iPhone 15 Pro Max và Galaxy S23 Ultra về camera"`;
        } else if (lowerMessage.includes('camera') || lowerMessage.includes('chụp ảnh')) {
            response = `📸 **Top điện thoại có camera tốt nhất:**

🥇 **iPhone 15 Pro Max** - Camera 48MP
• Zoom quang học 5x
• Chế độ chụp đêm tuyệt vời
• Video 4K ProRes

🥈 **Samsung Galaxy S23 Ultra** - Camera 200MP
• Zoom quang học 10x
• Chế độ chụp đêm AI
• Video 8K

🥉 **Google Pixel 8 Pro** - Camera 50MP
• AI Magic Eraser
• Night Sight xuất sắc
• Real Tone chính xác

Bạn quan tâm về khả năng chụp ảnh nào? Chụp đêm, zoom, hay video?`;
        } else if (lowerMessage.includes('pin') || lowerMessage.includes('battery')) {
            response = `🔋 **Điện thoại có pin tốt nhất:**

⚡ **Samsung Galaxy S23 Ultra** - 5000mAh
• Sử dụng cả ngày không lo hết pin
• Sạc nhanh 45W
• Sạc không dây

⚡ **iPhone 15 Pro Max** - Pin cả ngày
• Sạc nhanh 20W
• MagSafe sạc không dây
• Tối ưu iOS

⚡ **Xiaomi Redmi Note 12** - 5000mAh
• Pin giá rẻ tốt nhất
• Sạc nhanh 33W
• Tiết kiệm điện

Bạn cần pin dùng được bao lâu? Tôi sẽ gợi ý phù hợp!`;
        } else if (lowerMessage.includes('cảm ơn') || lowerMessage.includes('thank')) {
            response = `😊 Cảm ơn bạn! Tôi rất vui được giúp đỡ. 

Nếu bạn có thêm câu hỏi về sản phẩm nào khác, đừng ngần ngại hỏi nhé! Tôi luôn sẵn sàng hỗ trợ bạn tìm được sản phẩm phù hợp nhất.

Chúc bạn mua sắm vui vẻ! 🛒✨`;
        } else {
            response = `Tôi hiểu bạn đang tìm hiểu về "${userMessage}". 

Để tôi có thể hỗ trợ tốt nhất, bạn có thể hỏi về:

📱 **Sản phẩm cụ thể:** iPhone, Samsung, Xiaomi...
💰 **Ngân sách:** Dưới 5tr, 5-10tr, 10-20tr...
🔍 **Tính năng:** Camera, pin, hiệu năng...
📊 **So sánh:** Giữa các sản phẩm

Hoặc bạn có thể mô tả chi tiết hơn về nhu cầu của mình! 😊`;
        }
        
        setIsTyping(false);
        return response;
    };

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');

        const botResponse = await getAIResponse(inputText);
        
        const botMessage = {
            id: Date.now() + 1,
            text: botResponse,
            sender: 'bot',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const quickQuestions = [
        "iPhone nào tốt nhất?",
        "So sánh Samsung và iPhone",
        "Điện thoại nào pin tốt?",
        "Camera nào chụp đêm tốt?"
    ];

    return (
        <div className={`ai-chatbot ${isOpen ? 'open' : ''}`}>
            {/* Chat Button */}
            <button 
                className="chat-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="chat-icon">🤖</span>
                <span className="chat-text">AI Assistant</span>
            </button>

            {/* Chat Window */}
            <div className="chat-window">
                <div className="chat-header">
                    <div className="bot-info">
                        <div className="bot-avatar">🤖</div>
                        <div className="bot-details">
                            <h3>AI Assistant</h3>
                            <span className="status">Đang hoạt động</span>
                        </div>
                    </div>
                    <button 
                        className="close-btn"
                        onClick={() => setIsOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                <div className="chat-messages">
                    {messages.map((message) => (
                        <div 
                            key={message.id} 
                            className={`message ${message.sender}`}
                        >
                            <div className="message-content">
                                <div className="message-text">
                                    {message.text.split('\n').map((line, index) => (
                                        <div key={index}>
                                            {line}
                                            {index < message.text.split('\n').length - 1 && <br />}
                                        </div>
                                    ))}
                                </div>
                                <div className="message-time">
                                    {message.timestamp.toLocaleTimeString('vi-VN', { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="message bot">
                            <div className="message-content">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length === 1 && (
                    <div className="quick-questions">
                        <h4>Câu hỏi thường gặp:</h4>
                        <div className="question-buttons">
                            {quickQuestions.map((question, index) => (
                                <button 
                                    key={index}
                                    className="question-btn"
                                    onClick={() => setInputText(question)}
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="chat-input">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Nhập câu hỏi của bạn..."
                        className="message-input"
                    />
                    <button 
                        onClick={handleSendMessage}
                        className="send-btn"
                        disabled={!inputText.trim()}
                    >
                        <span>📤</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AIChatbot;
