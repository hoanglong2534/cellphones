# AR/VR Viewer Component - Hướng dẫn sử dụng

## Tổng quan
Component ARViewer cho phép người dùng xem sản phẩm bằng công nghệ AR (Augmented Reality) và VR (Virtual Reality).

## Cài đặt thư viện

Thư viện A-Frame và AR.js đã được thêm vào file `public/index.html`:

```html
<script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@3.4.0/aframe/build/aframe-ar.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@3.4.0/three.js/build/ar-threex.min.js"></script>
```

## Cách sử dụng

### 1. Import component
```javascript
import ARViewer from '../ARViewer/ARViewer';
```

### 2. Sử dụng trong JSX
```javascript
<ARViewer product={productData} />
```

### 3. Dữ liệu sản phẩm
```javascript
const productData = {
    id: 1,
    name: "Tên sản phẩm",
    image: "URL ảnh sản phẩm",
    modelUrl: "URL file model 3D (tùy chọn)", // .gltf hoặc .glb
    // ... các thuộc tính khác
};
```

## Tính năng chính

### AR Mode (Thực tế tăng cường)
- Sử dụng camera để nhận diện marker
- Hiển thị model 3D trên marker
- Hỗ trợ marker preset (hiro, kanji) hoặc custom pattern (.patt)
- 3 chế độ xem: Exterior, Interior, Exploded

### VR Mode (Thực tế ảo)
- Hiển thị model 3D trong môi trường ảo
- Có thể xoay và di chuyển camera
- Chế độ xem tương tự AR

### 3 View Modes
1. **Exterior View**: Hiển thị các thành phần bên ngoài (màn hình, khung máy, camera, nút nguồn, speaker)
2. **Interior View**: Hiển thị các thành phần bên trong (CPU, RAM, Storage, Battery, Motherboard)
3. **Exploded View**: Hiển thị các bộ phận tách rời

## Hướng dẫn sử dụng AR

1. Bấm nút "Bắt đầu AR"
2. Cho phép truy cập camera khi được hỏi
3. In hoặc hiển thị marker Hiro trên màn hình khác
4. Hướng camera về marker
5. Model 3D sẽ xuất hiện trên marker

## Hướng dẫn sử dụng VR

1. Bấm nút "Bắt đầu VR"
2. Sử dụng chuột để di chuyển camera
3. Chọn các chế độ xem khác nhau bằng các nút điều khiển

## Marker

### Marker Preset
- **Hiro**: Marker mặc định, dễ nhận diện
- **Kanji**: Marker thay thế

### Custom Marker
- Upload file .patt để sử dụng marker tùy chỉnh
- Tạo marker tại: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

## Yêu cầu hệ thống

### Browser Support
- Chrome 67+
- Firefox 60+
- Safari 11.1+
- Edge 79+

### Mobile Support
- iOS Safari 11.3+
- Chrome Mobile 67+
- Samsung Internet 7.2+

### Permissions
- Camera access (cho AR mode)
- Motion sensors (cho tốt hơn trên mobile)

## Xử lý lỗi

### Lỗi thường gặp
1. **"Thư viện AR/VR chưa được tải"**: Đợi thư viện tải xong
2. **"Vui lòng cho phép truy cập camera"**: Cấp quyền camera trong browser
3. **"Không tìm thấy camera"**: Kiểm tra camera và kết nối
4. **"Lỗi khởi tạo AR"**: Thử làm mới trang

### Debug
- Mở Developer Tools để xem console logs
- Kiểm tra network tab để đảm bảo thư viện được tải
- Đảm bảo HTTPS nếu test trên domain khác localhost

## Performance Tips

1. **Mobile Optimization**:
   - Component tự động giảm chất lượng render trên mobile
   - Ẩn các UI element không cần thiết

2. **Memory Management**:
   - Component tự động cleanup khi unmount
   - Giải phóng camera stream khi thoát AR

3. **Loading States**:
   - Hiển thị loading indicator trong quá trình khởi tạo
   - Disable buttons khi chưa sẵn sàng

## Troubleshooting

### AR không hoạt động
1. Kiểm tra camera permission
2. Đảm bảo ánh sáng đủ
3. Marker phải rõ ràng và không bị che khuất
4. Thử marker khác nếu không nhận diện được

### VR lag/giật
1. Đóng các tab browser khác
2. Giảm chất lượng màn hình
3. Restart browser nếu cần

### Model không hiển thị
1. Kiểm tra URL model 3D (nếu có)
2. Đảm bảo file model đúng format (.gltf, .glb)
3. Kiểm tra CORS policy cho file model

## Files

- `ARViewer.js`: Component chính
- `ARViewer.css`: Styles
- `ARTest.js`: Component test (có thể xóa trong production)
