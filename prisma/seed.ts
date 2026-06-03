import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const attractions = [
  {
    name: 'อุทยานแห่งชาติดอยอินทนนท์',
    description: 'ยอดเขาที่สูงที่สุดในประเทศไทย มีธรรมชาติที่อุดมสมบูรณ์และอากาศหนาวเย็นตลอดทั้งปี เป็นจุดชมวิวพระอาทิตย์ขึ้นและทะเลหมอกที่สวยงามมาก',
    region: 'ภาคเหนือ',
    latitude: 18.5883,
    longitude: 98.4862,
    imageUrl: 'https://images.unsplash.com/photo-1590486821369-a1b75bb3cefc?w=800&auto=format&fit=crop',
  },
  {
    name: 'วัดขาว (วัดร่องขุ่น)',
    description: 'วัดที่ออกแบบและก่อสร้างโดยอาจารย์เฉลิมชัย โฆษิตพิพัฒน์ มีความโดดเด่นด้วยสีขาวสะอาดตาและศิลปะที่วิจิตรบรรจง',
    region: 'ภาคเหนือ',
    latitude: 19.8243,
    longitude: 99.7630,
    imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&auto=format&fit=crop',
  },
  {
    name: 'วัดพระศรีรัตนศาสดาราม (วัดพระแก้ว)',
    description: 'วัดคู่บ้านคู่เมืองของประเทศไทย ภายในประดิษฐานพระพุทธมหามณีรัตนปฏิมากร (พระแก้วมรกต) มีสถาปัตยกรรมที่งดงามยิ่ง',
    region: 'ภาคกลาง',
    latitude: 13.7516,
    longitude: 100.4927,
    imageUrl: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=800&auto=format&fit=crop',
  },
  {
    name: 'อุทยานประวัติศาสตร์พระนครศรีอยุธยา',
    description: 'อดีตราชธานีของไทยที่ได้รับการขึ้นทะเบียนเป็นมรดกโลก เต็มไปด้วยซากโบราณสถานและวัดเก่าแก่ที่มีคุณค่าทางประวัติศาสตร์',
    region: 'ภาคกลาง',
    latitude: 14.3555,
    longitude: 100.5585,
    imageUrl: 'https://images.unsplash.com/photo-1594931757805-4c07b46914b3?w=800&auto=format&fit=crop',
  },
  {
    name: 'อุทยานประวัติศาสตร์พนมรุ้ง',
    description: 'ปราสาทหินขอมที่งดงามที่สุดแห่งหนึ่งในประเทศไทย ตั้งอยู่บนยอดภูเขาไฟที่ดับสนิทแล้ว มีปรากฏการณ์พระอาทิตย์ลอด 15 ช่องประตู',
    region: 'ภาคตะวันออกเฉียงเหนือ',
    latitude: 14.5323,
    longitude: 102.9421,
    imageUrl: 'https://images.unsplash.com/photo-1579295556276-8051a89c9df4?w=800&auto=format&fit=crop',
  },
  {
    name: 'อุทยานแห่งชาติเขาใหญ่',
    description: 'อุทยานแห่งชาติแห่งแรกของไทยและเป็นมรดกโลก อุดมสมบูรณ์ไปด้วยป่าไม้ น้ำตก และสัตว์ป่านานาชนิด',
    region: 'ภาคตะวันออกเฉียงเหนือ',
    latitude: 14.4392,
    longitude: 101.3723,
    imageUrl: 'https://images.unsplash.com/photo-1550993952-b4c48cb15124?w=800&auto=format&fit=crop',
  },
  {
    name: 'เกาะพีพี',
    description: 'หมู่เกาะที่สวยงามระดับโลก น้ำทะเลใส หาดทรายขาว มีจุดดำน้ำที่อุดมสมบูรณ์ เป็นสถานที่ท่องเที่ยวยอดฮิตของนักท่องเที่ยวต่างชาติ',
    region: 'ภาคใต้',
    latitude: 7.7407,
    longitude: 98.7784,
    imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&auto=format&fit=crop',
  },
  {
    name: 'อุทยานแห่งชาติหมู่เกาะสิมิลัน',
    description: 'สวรรค์ของนักดำน้ำ มีแนวปะการังที่สวยงามและสัตว์ทะเลหลากหลายชนิด รวมถึงหินเรือใบที่เป็นสัญลักษณ์ของเกาะ',
    region: 'ภาคใต้',
    latitude: 8.6534,
    longitude: 97.6433,
    imageUrl: 'https://images.unsplash.com/photo-1512686129528-7e3e9d8cb4cb?w=800&auto=format&fit=crop',
  }
];

async function main() {
  console.log('Start seeding...');
  
  // Clear existing attractions
  await prisma.attraction.deleteMany({});
  
  for (const a of attractions) {
    const attraction = await prisma.attraction.create({
      data: a,
    });
    console.log(`Created attraction: ${attraction.name}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
