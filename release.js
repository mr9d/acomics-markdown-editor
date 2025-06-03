import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'fs';
import { getSRIString } from 'sri';
import { version } from './package.json';

const dir = `versions/${version}`;

if (!existsSync(dir)){
  mkdirSync(dir, {recursive: true});
}

copyFileSync('dist/bundle.js', `${dir}/bundle.js`);
copyFileSync('dist/bundle.css', `${dir}/bundle.css`);

//
// See https://www.srihash.org/ for more info about this section
//
const jsSriHash = getSRIString(readFileSync(`${dir}/bundle.js`).toString());
const cssSriHash = getSRIString(readFileSync(`${dir}/bundle.css`).toString());

const readmeContent = `# Встраивание модуля на страницу

\`\`\`
<script defer src="https://cdn.jsdelivr.net/gh/mr9d/acomics-markdown-editor@master/versions/${version}/bundle.js" integrity="${jsSriHash}" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mr9d/acomics-markdown-editor@master/versions/${version}/bundle.css" integrity="${cssSriHash}" crossorigin="anonymous">
\`\`\`
`;

writeFileSync(`${dir}/README.md`, readmeContent);
