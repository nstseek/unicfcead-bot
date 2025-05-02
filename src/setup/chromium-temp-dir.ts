import fs from "fs";
import path from "path";

export const setupChromiumTempDir = () => {
  const chromiumTmpDirPath = path.join(
    process.cwd(),
    process.env.CHROMIUM_TMP_DIR
  );

  fs.mkdirSync(chromiumTmpDirPath, { recursive: true });
};
