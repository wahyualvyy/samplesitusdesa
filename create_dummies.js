const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 1x1 white JPEG base64
const dummyJpgBase64 = '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=';

const buffer = Buffer.from(dummyJpgBase64, 'base64');

fs.writeFileSync(path.join(uploadDir, 'placeholder1.jpg'), buffer);
fs.writeFileSync(path.join(uploadDir, 'placeholder2.jpg'), buffer);
fs.writeFileSync(path.join(uploadDir, 'placeholder3.jpg'), buffer);
fs.writeFileSync(path.join(uploadDir, 'placeholder4.jpg'), buffer);

console.log('Created dummy placeholder images in public/uploads/');
