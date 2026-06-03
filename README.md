# Project Travel - สถานที่ท่องเที่ยวไทย 🇹🇭

เว็บไซต์รวบรวมและแสดงแหล่งท่องเที่ยว Local ในประเทศไทย ที่ออกแบบมาเพื่อให้ผู้ใช้งานค้นพบสถานที่สวยงามและน่าสนใจในแต่ละภูมิภาค

## 🌟 ฟีเจอร์หลัก (Features)

- **หน้าแรก (Home Page):** แสดงรายการสถานที่ท่องเที่ยวยอดนิยมทั่วประเทศไทยในรูปแบบการ์ดที่สวยงาม
- **หมวดหมู่ตามภูมิภาค:** มีแถบเมนู (Navbar) สำหรับคัดกรองและเลือกดูสถานที่ท่องเที่ยวแยกตามภูมิภาค (ภาคเหนือ, ภาคกลาง, ภาคอีสาน, ภาคใต้) ได้อย่างสะดวก
- **หน้ารายละเอียดและแผนที่:** เมื่อคลิกที่สถานที่ท่องเที่ยว จะแสดงข้อมูลรายละเอียดแบบเต็ม พร้อมกับ **แผนที่ตั้ง (Google Maps Embed)** เพื่อดูพิกัดสถานที่จริง

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** PostgreSQL
- **ORM:** [Prisma](https://www.prisma.io/)
- **AI Assistant:** พัฒนาและช่วยเหลือโดย AI Gemini-cli

## 🚀 การติดตั้งและรันโปรเจกต์ (Getting Started)

1. **ติดตั้ง Dependencies:**
   ```bash
   npm install
   ```

2. **ตั้งค่า Database:**
   ตรวจสอบให้แน่ใจว่าได้ตั้งค่าการเชื่อมต่อ PostgreSQL ในไฟล์ `.env` เช่น:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/projecttravelnextjs"
   ```

3. **สร้าง Database Schema:**
   ```bash
   npx prisma db push
   ```

4. **เพิ่มข้อมูลจำลอง (Seed Data):**
   ```bash
   npx prisma db seed
   ```

5. **รันโปรเจกต์ (Development Server):**
   ```bash
   npm run dev
   ```
   จากนั้นเปิดเว็บบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)