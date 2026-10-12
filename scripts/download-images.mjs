import fs from 'fs';
import path from 'path';
import https from 'https';

const baseDir = path.resolve('public/images/projects');
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

const images = [
  {
    name: 'project-01-exposed-aggregate-driveway.jpg',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'project-02-machinery-shed-slab.jpg',
    url: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'project-03-house-foundation-pour.jpg',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'project-04-nil-exposure-polished.jpg',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'project-05-alfresco-entertaining-patio.jpg',
    url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'project-06-commercial-civic-slab.jpg',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'project-07-bobcat-excavation-prep.jpg',
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'project-08-formwork-steel-mesh.jpg',
    url: 'https://images.unsplash.com/photo-1584463699042-6e2c34cb2c4d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'project-09-aggregate-detail-texture.jpg',
    url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'project-10-curved-decorative-pathway.jpg',
    url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'project-11-shed-slab-before.jpg',
    url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'project-11-shed-slab-after.jpg',
    url: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'project-12-driveway-before.jpg',
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'project-12-driveway-after.jpg',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Downloading project images...');
  for (const img of images) {
    const dest = path.join(baseDir, img.name);
    try {
      await download(img.url, dest);
      console.log(`Downloaded ${img.name}`);
    } catch (e) {
      console.error(`Error downloading ${img.name}:`, e.message);
    }
  }
  console.log('Done downloading images.');
}

main();
