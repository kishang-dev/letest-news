import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDs39amkJgk1bHf1hHIbS9wQbhDuAuEROg',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'news-9a080.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'news-9a080',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'news-9a080.firebasestorage.app',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '880522837815',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:880522837815:web:2b24feeab89513d66ae4b2'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const BASE_URL = "https://worldwideshortnews.com";

async function generateSitemap() {
    console.log("Generating sitemap...");
    try {
        const newsRef = collection(db, "news");
        const q = query(newsRef, orderBy("createdAt", "desc"), limit(1000));
        const snapshot = await getDocs(q);

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/world/</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/business/</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/contact-us/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/about-us/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/privacy-policy/</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${BASE_URL}/terms-of-use/</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${BASE_URL}/cookie-policy/</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  ${snapshot.docs
                .map((doc) => {
                    const data = doc.data();
                    let lastMod = new Date().toISOString();
                    if (data.createdAt && typeof data.createdAt.toDate === 'function') {
                        lastMod = data.createdAt.toDate().toISOString();
                    }

                    return `
  <url>
    <loc>${BASE_URL}/${doc.id}/</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
                })
                .join("")}
</urlset>`;

        const publicPath = path.join(__dirname, "..", "public", "sitemap.xml");
        fs.writeFileSync(publicPath, sitemap);
        console.log(`Sitemap generated successfully at ${publicPath}`);
        process.exit(0);
    } catch (error) {
        console.error("Error generating sitemap:", error);
        process.exit(1);
    }
}

generateSitemap();
