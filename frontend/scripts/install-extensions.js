import { execSync } from 'child_process';

const extensions = [
  'dbaeumer.vscode-eslint', // cspell:disable-line
  'esbenp.prettier-vscode', // cspell:disable-line
  'ms-vscode.vscode-typescript-next', // cspell:disable-line
  'infeng.vscode-react-typescript', // cspell:disable-line
  'pmneo.tsimporter', // cspell:disable-line
  'aaron-bond.better-comments',
  'bradlc.vscode-tailwindcss', // cspell:disable-line
  'naumovs.color-highlight', // cspell:disable-line
  'usernamehw.errorlens', // cspell:disable-line
  'wix.vscode-import-cost',
  'streetsidesoftware.code-spell-checker',
  'visualstudioexptteam.vscodeintellicode', // cspell:disable-line
  'eamodio.gitlens', // cspell:disable-line
  'mikestead.dotenv', // cspell:disable-line
  'orta.vscode-jest', // cspell:disable-line
  'csstools.postcss',
  'ms-azuretools.vscode-docker',
];

for (const ext of extensions) {
  try {
    execSync(`code --install-extension ${ext}`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Failed to install ${ext}`);
  }
}
