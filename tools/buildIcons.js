import path from 'path';
import gm from 'gm';
import { makeDir, cleanDir } from './lib/fs';
import display from './display';

const SIZES = [48, 70, 96, 150, 152, 192, 256, 310, 384, 512];
const INPUT_ICON = path.join(__dirname, '../public/logo.png');
const OUTPUT_DIR = path.join(__dirname, '../build/public/icons');

async function buildicons() {
  display.info('Generating Icons');
  await cleanDir('build/public/icons');
  await makeDir('build/public/icons');
  const promises = SIZES.map(
    size =>
      new Promise((resolve, reject) => {
        gm(INPUT_ICON)
          .resize(size, size)
          .write(path.join(OUTPUT_DIR, `${size}x${size}.png`), err => {
            if (err) {
              reject(err);
              return;
            }

            resolve();
            display.success(`Size ${size} created`);
          });
      }),
  );

  return Promise.all(promises).catch(err => {
    setTimeout(() => {
      display.error(err);
      throw err;
    }, 0);
  });
}

export default buildicons;
