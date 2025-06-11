import { execSync } from "child_process";

const extensions = [
  "dbaeumer.vscode-eslint",
  "esbenp.prettier-vscode",
  "ms-vscode.vscode-typescript-next",
  "infeng.vscode-react-typescript",
  "pmneo.tsimporter",
  "aaron-bond.better-comments",
  "bradlc.vscode-tailwindcss",
  "naumovs.color-highlight",
  "usernamehw.errorlens",
  "wix.vscode-import-cost",
  "streetsidesoftware.code-spell-checker",
  "visualstudioexptteam.vscodeintellicode",
  "eamodio.gitlens",
  "mikestead.dotenv",
  "orta.vscode-jest",
  "csstools.postcss",
  "ms-azuretools.vscode-docker",
];

for (const ext of extensions) {
  try {
    execSync(`code --install-extension ${ext}`, { stdio: "inherit" });
  } catch (err) {
    console.error(`Failed to install ${ext}`);
  }
}
