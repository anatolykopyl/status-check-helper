import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'
const { version } = packageJson

export default defineManifest(() => ({
  manifest_version: 3,
  name: "Status Check Hepler",
  description: "Helps you gather and format tasks for status checks",
  version: version,
  version_name: version,
  icons: {
    16: "public/icons/16.png",
    32: "public/icons/32.png",
    192: "public/icons/192.png"
  },
  action: {
    default_popup: "index.html"
  },
  content_scripts: [
    {
      matches: ["https://*.atlassian.net/*"],
      js: ["./src/content/index.tsx"]
    }
  ],
  permissions: [
    "storage"
  ]
}));
