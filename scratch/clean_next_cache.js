const fs = require('fs');
const path = require('path');

const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  try {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log('Successfully cleaned .next directory!');
  } catch (err) {
    console.log('Error cleaning .next directory:', err.message);
  }
} else {
  console.log('.next directory does not exist.');
}
