import { Attraction } from './types';

export const regions = [
  { id: 'north', name: 'ภาคเหนือ' },
  { id: 'central', name: 'ภาคกลาง' },
  { id: 'south', name: 'ภาคใต้' },
  { id: 'east', name: 'ภาคตะวันออก' },
  { id: 'west', name: 'ภาคตะวันตก' },
  { id: 'northeast', name: 'ภาคตะวันออกเฉียงเหนือ' },
];

export const attractions: Attraction[] = [
  {
    id: 1,
    name: 'ดอยอินทนนท์ (Doi Inthanon)',
    region: 'north',
    province: 'เชียงใหม่',
    description: 'ยอดเขาที่สูงที่สุดในประเทศไทย มีธรรมชาติที่สวยงามและอากาศหนาวเย็นตลอดปี',
    imageUrl: 'https://images.unsplash.com/photo-1590497558661-bc8d0111f185?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15124.965706915157!2d98.47164939116742!3d18.58882898950663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da57f6b8b0e77d%3A0xcb5db5042830f3a6!2z4LiU4Lit4Lii4Lit4Li04LiZ4LiX4LiZ4LiZ4LiX4LmM!5e0!3m2!1sth!2sth!4v1700000000000!5m2!1sth!2sth'
  },
  {
    id: 2,
    name: 'วัดพระธาตุดอยสุเทพ (Wat Phra That Doi Suthep)',
    region: 'north',
    province: 'เชียงใหม่',
    description: 'วัดคู่บ้านคู่เมืองเชียงใหม่ ตั้งอยู่บนดอยสุเทพ มีเจดีย์สีทองอร่าม',
    imageUrl: 'https://images.unsplash.com/photo-1582260668953-b097b6ff08f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15109.873200788373!2d98.91039860472421!3d18.804938637785365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da309c69335a11%3A0xe54fb7a216db8a00!2z4Lin4Lix4LiU4Lie4Lij4Liw4LiY4Liy4LiV4Li44LiU4Lit4Lii4Liq4Li44LmA4LiX4Lie!5e0!3m2!1sth!2sth!4v1700000000000!5m2!1sth!2sth'
  },
  {
    id: 3,
    name: 'วัดพระแก้ว (Temple of the Emerald Buddha)',
    region: 'central',
    province: 'กรุงเทพมหานคร',
    description: 'วัดที่สำคัญที่สุดในประเทศไทย ประดิษฐานพระพุทธมหามณีรัตนปฏิมากร (พระแก้วมรกต)',
    imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.4678846393527!2d100.48967921473136!3d13.750580990348737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299a3848b5941%3A0xc36761f7ef3a3f5a!2z4Lin4Lix4LiU4Lie4Lij4Liw4Liq4Lij4Li14Lij4Lix4LiV4LiZ4Lio4Liy4Liq4LiU4Liy4Lij4Liy4Lih!5e0!3m2!1sth!2sth!4v1700000000000!5m2!1sth!2sth'
  },
  {
    id: 4,
    name: 'อุทยานประวัติศาสตร์พระนครศรีอยุธยา (Ayutthaya Historical Park)',
    region: 'central',
    province: 'พระนครศรีอยุธยา',
    description: 'มรดกโลกทางวัฒนธรรม แหล่งรวมโบราณสถานสำคัญของอาณาจักรอยุธยา',
    imageUrl: 'https://images.unsplash.com/photo-1598967116850-84dc24888062?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15478.298280387547!2d100.54877395000002!3d14.3541315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e27448375a5e73%3A0x6436e053f3e792e3!2z4Li44LiX4Lii4Liy4LiZ4Lib4Lij4Liw4Lin4Lix4LiV4Li04Lio4Liy4Liq4LiV4Lij4LmM4Lie4Lij4Liw4LiZ4LiE4Lij4Lio4Lij4Li14Lit4Lii4Li44LiY4Lii4Liy!5e0!3m2!1sth!2sth!4v1700000000000!5m2!1sth!2sth'
  },
  {
    id: 5,
    name: 'เกาะพีพี (Phi Phi Islands)',
    region: 'south',
    province: 'กระบี่',
    description: 'หมู่เกาะที่มีชื่อเสียงระดับโลก น้ำทะเลใส หาดทรายขาว และปะการังที่สวยงาม',
    imageUrl: 'https://images.unsplash.com/photo-1552560880-2482c1bf194f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31613.623192008458!2d98.7610486!3d7.7410292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3051defb4074213d%3A0xc6c7c2f82ba86b8c!2z4LmA4LiB4Liy4Liw4Lie4Li14Lie4Li1!5e0!3m2!1sth!2sth!4v1700000000000!5m2!1sth!2sth'
  },
  {
    id: 6,
    name: 'หาดป่าตอง (Patong Beach)',
    region: 'south',
    province: 'ภูเก็ต',
    description: 'ชายหาดที่มีชื่อเสียงที่สุดของภูเก็ต เต็มไปด้วยกิจกรรมและสถานบันเทิง',
    imageUrl: 'https://images.unsplash.com/photo-1589394815804-964ce0ff96f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31640.852431766072!2d98.27786445!3d7.89617355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30503075b8ba17d5%3A0xd647a9b0c242e2b6!2z4Lir4Liy4LiU4Lib4LmI4Liy4LiV4Lit4LiH!5e0!3m2!1sth!2sth!4v1700000000000!5m2!1sth!2sth'
  },
  {
    id: 7,
    name: 'เกาะล้าน (Koh Larn)',
    region: 'east',
    province: 'ชลบุรี',
    description: 'เกาะยอดนิยมใกล้กรุงเทพฯ เดินทางสะดวก มีหาดทรายสวยงามหลายแห่ง',
    imageUrl: 'https://images.unsplash.com/photo-1549429532-601006ebc531?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31109.916896264902!2d100.7712399!3d12.9188062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102ea6036113b29%3A0xb0cb6db6a04bf54c!2z4LmA4LiB4Liy4Liw4Lil4LmJ4Liy4LiZ!5e0!3m2!1sth!2sth!4v1700000000000!5m2!1sth!2sth'
  },
  {
    id: 8,
    name: 'น้ำตกเอราวัณ (Erawan Waterfall)',
    region: 'west',
    province: 'กาญจนบุรี',
    description: 'น้ำตก 7 ชั้นที่มีความสวยงามเป็นเอกลักษณ์ น้ำใสสีฟ้าอมเขียว',
    imageUrl: 'https://images.unsplash.com/photo-1508003661271-92ba735959c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.7951336440243!2d99.14175371474075!3d14.375497290204787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e462d7c588afcd%3A0xc6baab51a66a1a4c!2z4LiZ4LmJ4Liz4LiV4LiB4LmA4Lit4Lij4Liy4Lin4Lix4LiT!5e0!3m2!1sth!2sth!4v1700000000000!5m2!1sth!2sth'
  },
  {
    id: 9,
    name: 'ปราสาทหินพนมรุ้ง (Phanom Rung Historical Park)',
    region: 'northeast',
    province: 'บุรีรัมย์',
    description: 'ปราสาทหินทรายศิลปะขอมโบราณ ตั้งอยู่บนยอดภูเขาไฟที่ดับสนิทแล้ว',
    imageUrl: 'https://images.unsplash.com/photo-1627993356828-568266209b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3851.6212571212877!2d102.93665791475245!3d14.823616690412852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311a3db6eb0c2a2b%3A0x8673f4438df3654!2z4Lit4Li44LiX4Lii4Liy4LiZ4Lib4Lij4Liw4Lin4Lix4LiV4Li04Lio4Liy4Liq4LiV4Lij4LmM4Lie4LiZ4Lih4Lij4Li44LmJ4LiH!5e0!3m2!1sth!2sth!4v1700000000000!5m2!1sth!2sth'
  }
];
