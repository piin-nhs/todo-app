# 📝 Minimalist Todo Application (Setup Guide)

Ứng dụng quản lý công việc (Todo App) được thiết kế theo phong cách tối giản Bắc Âu, xây dựng trên nền tảng **Spring Boot 3** (Backend), **React** (Frontend), và **PostgreSQL** (Database).

Dưới đây là 2 phương án khởi chạy ứng dụng: **Dùng Docker Compose (Khuyên dùng)** hoặc **Chạy Thủ Công Từng Phần Cục Bộ**.

---

## 🚀 CÁCH 1: KHỞI CHẠY BẰNG DOCKER COMPOSE (NHANH NHẤT)

Phương án này tự động cài đặt và khởi chạy toàn bộ Database, Backend, Frontend chỉ bằng một câu lệnh duy nhất.

### Yêu cầu hệ thống:
- Đã cài đặt **Docker** và **Docker Compose**.
- Ứng dụng **Docker Desktop** đã được mở và chạy dưới nền.

### Các bước thực hiện:
1. Mở Terminal/PowerShell tại thư mục gốc của dự án (`todo-app/`) và chạy lệnh:
   ```bash
   docker compose up --build -d
   ```
2. Sau khi container khởi chạy thành công:
   - **Frontend (Giao diện React + Nginx)**: Truy cập tại [http://localhost](http://localhost) (Cổng 80 mặc định).
   - **Backend API (Spring Boot)**: Truy cập tại [http://localhost:8082/api/todos](http://localhost:8082/api/todos).
3. Để dừng các container chạy ngầm:
   ```bash
   docker compose down
   ```

---

## 💻 CÁCH 2: CHẠY THỦ CÔNG CỤC BỘ (LOCAL RUN)

Dành cho nhà phát triển muốn chạy/sửa đổi code trực tiếp trên máy thật mà không sử dụng Docker container.

### Yêu cầu hệ thống:
- **Java JDK 17** hoặc mới hơn.
- **Node.js** (Phiên bản LTS).
- **PostgreSQL Database** đang chạy (hoặc sử dụng dịch vụ Database Cloud như Neon/Supabase).

### Các bước thực hiện:

#### 1. Cấu hình Database
- Mặc định, dự án được thiết lập để kết nối với PostgreSQL cục bộ tại địa chỉ `jdbc:postgresql://localhost:5432/todo_db` (Username: `postgres`, Password: `postgres`).
- Bạn có thể chỉnh sửa các thông tin kết nối này trong file [application.properties](backend/src/main/resources/application.properties) hoặc truyền qua biến môi trường.

#### 2. Chạy Backend (Spring Boot)
1. Mở terminal mới và di chuyển vào thư mục `backend/`:
   ```bash
   cd backend
   ```
2. Khởi chạy dự án Spring Boot bằng Maven Wrapper:
   - **Trên Windows**:
     ```bash
     ./mvnw.cmd spring-boot:run
     ```
   - **Trên macOS / Linux**:
     ```bash
     chmod +x mvnw
     ./mvnw spring-boot:run
     ```
3. Backend sẽ khởi chạy thành công trên cổng mặc định **`8085`** (Địa chỉ: [http://localhost:8085](http://localhost:8085)).

#### 3. Chạy Frontend (React + Vite)
1. Mở một terminal khác và di chuyển vào thư mục `frontend/`:
   ```bash
   cd frontend
   ```
2. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```
3. Khởi chạy dev server:
   ```bash
   npm run dev
   ```
4. Giao diện React sẽ chạy tại địa chỉ: [http://localhost:5173](http://localhost:5173) (Tự động kết nối tới API Backend ở cổng `8085`).