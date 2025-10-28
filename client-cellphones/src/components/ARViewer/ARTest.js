import React from 'react';
import ARViewer from './ARViewer';

// Test component để test chức năng AR/VR
const ARTest = () => {
    const sampleProduct = {
        id: 1,
        name: "iPhone 15 Pro Max",
        image: "https://via.placeholder.com/300x400/000000/FFFFFF?text=iPhone+15+Pro",
        modelUrl: null, // Có thể thêm URL model 3D thật nếu có
        price: 29990000,
        description: "Điện thoại iPhone 15 Pro Max mới nhất"
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>AR/VR Viewer Test</h1>
            <ARViewer product={sampleProduct} />
        </div>
    );
};

export default ARTest;
