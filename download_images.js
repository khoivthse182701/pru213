const fs = require('fs');
const https = require('https');
const path = require('path');

async function downloadImages(htmlPath, outDir) {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const html = fs.readFileSync(htmlPath, 'utf8');
  // Match attachment URLs
  const regex = /https:\/\/data\.fuoverflow\.com\/attachments\/[^\s\"']+/gi;
  const urls = [...new Set(html.match(regex) || [])];
  console.log(`Found ${urls.length} attachments in ${htmlPath}`);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const qNum = i + 1;
    const dest = path.join(outDir, `Q${qNum}.jpg`);
    
    // Check if already downloaded
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`Q${qNum} exists (${fs.statSync(dest).size} bytes)`);
      continue;
    }

    try {
      await new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            https.get(res.headers.location, (res2) => {
              res2.pipe(file);
              file.on('finish', () => { file.close(); resolve(); });
            }).on('error', reject);
          } else {
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
          }
        }).on('error', reject);
      });
      console.log(`Downloaded Q${qNum}.jpg (${fs.statSync(dest).size} bytes)`);
    } catch (err) {
      console.error(`Error downloading Q${qNum}:`, err.message);
    }
  }
}

async function run() {
  console.log('Downloading SP26 FE images...');
  await downloadImages(
    'C:/Users/namho/Downloads/FPT/PRU/OnTapTracNghiem/page1.html',
    'C:/Users/namho/Downloads/FPT/PRU/OnTapTracNghiem/De_SP26_FE/images'
  );

  console.log('\nDownloading SU26 FE images...');
  await downloadImages(
    'C:/Users/namho/Downloads/FPT/PRU/OnTapTracNghiem/page2.html',
    'C:/Users/namho/Downloads/FPT/PRU/OnTapTracNghiem/De_SU26_FE/images'
  );
  console.log('\nAll downloads complete!');
}

run();
