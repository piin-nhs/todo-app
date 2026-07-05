# 📝 Minimalist Todo Application (Spring Boot 3 + React + PostgreSQL)

Một ứng dụng quản lý công việc (Todo App) được thiết kế theo phong cách tối giản Bắc Âu (Minimalist aesthetic), sử dụng gam màu trung tính, bo góc vuông vức tinh tế và các hiệu ứng chuyển động mượt mà bằng Framer Motion.

---

## 🛠️ Công Nghệ Sử Dụng

- **Backend**: Java 17, Spring Boot 3.x, Spring Data JPA, Hibernate, PostgreSQL Driver, Spring Auditing.
- **Frontend**: React, Vite, Tailwind CSS v4, Axios, Framer Motion.
- **DevOps**: Docker, Docker Compose, Nginx (Reverse Proxy).

---

## 🚀 Hướng Dẫn Chạy Cục Bộ (Local Development)

### Cách 1: Chạy bằng Docker Compose (Khuyên dùng - Nhanh nhất)

Yêu cầu máy tính đã cài đặt **Docker** và **Docker Compose**. Chỉ cần một câu lệnh duy nhất để tự động dựng Database PostgreSQL cục bộ, compile mã nguồn Backend & Frontend và chạy ứng dụng.

1. Mở Terminal tại thư mục gốc của dự án và chạy:
   ```bash
   docker compose up --build -d
   ```
2. Sau khi container khởi chạy thành công:
   - **Frontend (Giao diện người dùng)**: Truy cập tại [http://localhost](http://localhost) (Port 80)
   - **Backend API**: Truy cập tại [http://localhost:8080/api/todos](http://localhost:8080/api/todos)
3. Để dừng các container:
   ```bash
   docker compose down
   ```

---

### Cách 2: Chạy Thủ Công Không Dùng Docker

#### 1. Khởi động Database
Mặc định cấu hình dự án đang trỏ trực tiếp tới **Neon Cloud PostgreSQL** (không cần cài PostgreSQL local). Nếu muốn dùng DB local, vui lòng thay đổi các biến môi trường kết nối trong [application.properties](backend/src/main/resources/application.properties).

#### 2. Chạy Backend (Spring Boot)
Mở Terminal mới tại thư mục `backend/` và chạy:
```bash
# Windows
./mvnw.cmd spring-boot:run

# Linux / macOS
chmod +x mvnw
./mvnw spring-boot:run
```
API Backend sẽ chạy tại: [http://localhost:8080](http://localhost:8080)

#### 3. Chạy Frontend (React)
Mở Terminal mới tại thư mục `frontend/` và chạy:
```bash
npm install
npm run dev
```
Giao diện Frontend sẽ chạy tại: [http://localhost:5173](http://localhost:5173)

---

## ☁️ Hướng Dẫn Deploy Lên Cloud (DigitalOcean + Vercel + Neon)

Dưới đây là sơ đồ kiến trúc hệ thống khi đưa lên production:
```
[User Browser] 
       │
       ├───► (Frontend) Vercel Static Hosting (https://todo.vercel.app)
       │         │
       │         ▼ (API requests qua CORS)
       └───► (Backend) DigitalOcean App Platform / Droplet (Docker Container)
                 │
                 ▼ (Chỉ kết nối SSL an toàn)
             (Database) Neon Cloud PostgreSQL Console
```

### 1. Database (Neon Cloud PostgreSQL)
1. Truy cập [Neon Console](https://neon.tech/) đăng nhập và tạo một Project mới.
2. Sao chép chuỗi kết nối PostgreSQL (Connection String) dạng:
   `postgresql://neondb_owner:password@ep-host.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`

### 2. Backend (DigitalOcean App Platform)
DigitalOcean App Platform hỗ trợ deploy trực tiếp từ Github thông qua `Dockerfile`.
1. Đẩy mã nguồn lên một **Github Repository**.
2. Trên DigitalOcean Console, chọn **Create** -> **Apps**.
3. Kết nối với tài khoản Github và chọn repository của dự án.
4. Cấu hình Component cho **Backend**:
   - **Source Directory**: `/backend`
   - **Resource Type**: Web Service
   - **Environment Variables**: Thêm 3 biến môi trường tương ứng thông số kết nối Neon:
     - `SPRING_DATASOURCE_URL` = `jdbc:postgresql://ep-host.ap-southeast-1.aws.neon.tech/neondb?sslmode=require` *(Chú ý đổi tiền tố từ postgresql:// thành jdbc:postgresql://)*
     - `SPRING_DATASOURCE_USERNAME` = `neondb_owner`
     - `SPRING_DATASOURCE_PASSWORD` = `[Mật khẩu Neon của bạn]`
5. Nhấn **Deploy**. DigitalOcean sẽ tự động đọc `Dockerfile` trong thư mục `/backend` để build image và chạy Web Service, sau đó cấp cho bạn một URL Public (Ví dụ: `https://todo-backend-xyz.ondigitalocean.app`).

### 3. Frontend (Vercel)
Vercel tối ưu tốt nhất cho các dự án tĩnh như React + Vite.
1. Trên trang quản trị [Vercel](https://vercel.com/), chọn **Add New** -> **Project**.
2. Chọn Github Repository chứa dự án của bạn.
3. Cấu hình cài đặt deploy:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Environment Variables**: Thêm 1 biến trỏ URL về Backend trên DigitalOcean:
     - `VITE_API_URL` = `https://todo-backend-xyz.ondigitalocean.app/api`
4. Bấm **Deploy**. Vercel sẽ tự compile và cung cấp cho bạn một link public chạy Frontend cực kỳ nhanh và mượt mà.