const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Use tar or powershell script to unzip
const docxPath = path.resolve('done ppt.docx');
const outDir = path.resolve('scratch_docx');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Extract using tar (built into modern Windows)
try {
  execSync(`tar -xf "${docxPath}" -C "${outDir}"`);
  console.log('Unzipped docx successfully with tar');
  const xmlPath = path.join(outDir, 'word', 'document.xml');
  if (fs.existsSync(xmlPath)) {
    const xml = fs.readFileSync(xmlPath, 'utf8');
    const text = xml.replace(/<w:p[^>]*>/g, '\n').replace(/<[^>]+>/g, '').replace(/[ \t]+/g, ' ');
    fs.writeFileSync('scratch_docx_text.txt', text);
    console.log('Extracted text length:', text.length);
    console.log('Preview:\n', text.slice(0, 1500));
  }
} catch (e) {
  console.error(e);
}
