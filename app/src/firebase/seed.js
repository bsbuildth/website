// One-time seed: imports initial data from app/public/api-data.json into Firestore.
//
// Run from the app/ directory after creating your Firebase project, enabling
// Firestore + Email/Password auth, and creating one admin user:
//
//   node src/firebase/seed.js
//
// Requires these env vars (put them in app/.env, loaded below):
//   VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID,
//   VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID,
//   SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD   (the admin user you created)
//
// It signs in as the admin so the writes satisfy the security rules.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDocs, collection } from 'firebase/firestore';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Minimal .env loader (avoids adding a dotenv dependency).
function loadEnv() {
  try {
    const txt = readFileSync(resolve(__dirname, '../../.env'), 'utf8');
    for (const line of txt.split('\n')) {
      const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch { /* no .env file — rely on real env */ }
}
loadEnv();

const cfg = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(cfg);
const auth = getAuth(app);
const db = getFirestore(app);

const data = JSON.parse(readFileSync(resolve(__dirname, '../../public/api-data.json'), 'utf8'));

async function isEmpty(col) {
  const snap = await getDocs(collection(db, col));
  return snap.empty;
}

async function seed() {
  if (!process.env.SEED_ADMIN_EMAIL || !process.env.SEED_ADMIN_PASSWORD) {
    throw new Error('Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in app/.env');
  }
  await signInWithEmailAndPassword(auth, process.env.SEED_ADMIN_EMAIL, process.env.SEED_ADMIN_PASSWORD);
  console.log('Signed in as admin ✔');

  // Projects
  if (await isEmpty('projects')) {
    await Promise.all(data.projects.map((p, i) =>
      setDoc(doc(db, 'projects', String(p.id)), {
        title: p.title, category: p.category, description: p.description,
        img: p.img, sort_order: i, process_images: [],
      })));
    console.log(`Seeded ${data.projects.length} projects`);
  } else console.log('projects not empty — skipped');

  // Reviews (map api-data shape -> admin shape)
  if (await isEmpty('reviews')) {
    await Promise.all(data.reviews.map((r, i) =>
      setDoc(doc(db, 'reviews', String(r.id)), {
        name: r.name, role: r.role || 'ลูกค้า', text: r.comment || r.text || '',
        stars: r.rating || r.stars || 5, is_visible: 1, sort_order: i,
      })));
    console.log(`Seeded ${data.reviews.length} reviews`);
  } else console.log('reviews not empty — skipped');

  // Calculator types
  if (await isEmpty('calculator_types')) {
    await Promise.all(data.calculatorTypes.map((t, i) =>
      setDoc(doc(db, 'calculator_types', String(t.id)), {
        type_name: t.type_name, base_price: t.base_price, sort_order: i,
        example_image_path: '',
      })));
    console.log(`Seeded ${data.calculatorTypes.length} calculator types`);
  } else console.log('calculator_types not empty — skipped');

  // Services (map name/description -> title_thai/description_thai)
  if (await isEmpty('services')) {
    await Promise.all((data.services || []).map((s, i) =>
      setDoc(doc(db, 'services', String(s.id)), {
        icon: s.icon, title_thai: s.name || s.title_thai,
        description_thai: s.description || s.description_thai, sort_order: i,
      })));
    console.log(`Seeded ${(data.services || []).length} services`);
  } else console.log('services not empty — skipped');

  // Business info (single doc 'main')
  await setDoc(doc(db, 'business_info', 'main'), {
    company_name: data.businessInfo.company_name || data.businessInfo.name || 'BS Build',
    address: data.businessInfo.address || '',
    phone: data.businessInfo.phone || '',
    email: data.businessInfo.email || '',
    line_id: data.businessInfo.line_id || '',
    messenger_url: data.businessInfo.messenger_url || '',
    description: data.businessInfo.description || '',
  }, { merge: true });
  console.log('Seeded business_info/main');

  // Settings
  const settings = { projects_count: '500', team_count: '30', satisfaction_percent: '95' };
  await Promise.all(Object.entries(settings).map(([k, v]) =>
    setDoc(doc(db, 'settings', k), { setting_key: k, setting_value: v }, { merge: true })));
  console.log('Seeded settings');

  // Website content (editable Thai text)
  const content = {
    hero_title: { section_key: 'hero_title', section_name: 'Hero Title', thai_content: 'EXCEPTIONAL CRAFTSMANSHIP' },
    hero_subtitle: { section_key: 'hero_subtitle', section_name: 'Hero Subtitle', thai_content: 'LUXURY & PREMIUM DESIGN' },
    hero_description: { section_key: 'hero_description', section_name: 'Hero Description', thai_content: 'ทีมงาน | ประสบการณ์ 30+ ปี' },
    about_description: { section_key: 'about_description', section_name: 'About Description', thai_content: data.businessInfo.description || 'เราคือทีมผู้รับเหมาที่มีประสบการณ์ยาวนานกว่า 30 ปี' },
  };
  await Promise.all(Object.entries(content).map(([k, v]) =>
    setDoc(doc(db, 'content', k), v, { merge: true })));
  console.log('Seeded content');

  // Menus
  if (await isEmpty('menus')) {
    const menus = [
      { label_thai: 'บริการ', label_english: 'Services', link_url: '#services', is_cta: false, sort_order: 0 },
      { label_thai: 'ประเมินราคา', label_english: 'Estimate', link_url: '#calculator', is_cta: false, sort_order: 1 },
      { label_thai: 'ผลงาน', label_english: 'Projects', link_url: '#projects', is_cta: false, sort_order: 2 },
      { label_thai: 'ขอใบเสนอราคา', label_english: 'Get Quote', link_url: '#contact', is_cta: true, sort_order: 3 },
    ];
    await Promise.all(menus.map((m, i) => setDoc(doc(db, 'menus', String(i + 1)), m)));
    console.log('Seeded menus');
  } else console.log('menus not empty — skipped');

  // Hero background placeholder (so admin can update it in place)
  await setDoc(doc(db, 'images', 'hero_background'), {
    image_key: 'hero_background', image_category: 'hero', image_path: '', media_type: 'image', sort_order: 0,
  }, { merge: true });
  console.log('Seeded images/hero_background');

  console.log('\n✅ Seed complete.');
  process.exit(0);
}

seed().catch((e) => { console.error('❌ Seed failed:', e.message); process.exit(1); });
