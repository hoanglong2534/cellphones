import React from 'react';
import ARViewer from './ARViewer';

// Test component để test chức năng AR/VR
const ARTest = () => {
    const sampleProduct = {
        id: 1,
        name: "iPhone 15 Pro Max",
        image: "https://source.unsplash.com/600x800/?iphone,apple,smartphone",
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
