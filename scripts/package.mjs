import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

const artifactsDir = path.join(root, "artifacts");
fs.mkdirSync(artifactsDir, { recursive: true });

const vsixName = `${pkg.name}-${pkg.version}.vsix`;
const vsixPath = path.join(artifactsDir, vsixName);
const shaPath = path.join(artifactsDir, `${vsixName}.sha256`);

const stage = path.join(artifactsDir, `.stage-${pkg.name}-${pkg.version}`);
fs.rmSync(stage, { recursive: true, force: true });
const extDir = path.join(stage, "extension");
fs.mkdirSync(extDir, { recursive: true });

const escapeXml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const contentTypes = `<?xml version="1.0" encoding="utf-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension=".css" ContentType="text/css"/><Default Extension=".gif" ContentType="image/gif"/><Default Extension=".html" ContentType="text/html"/><Default Extension=".jpg" ContentType="image/jpeg"/><Default Extension=".js" ContentType="application/javascript"/><Default Extension=".json" ContentType="application/json"/><Default Extension=".license" ContentType="application/octet-stream"/><Default Extension=".md" ContentType="text/markdown"/><Default Extension=".mjs" ContentType="application/javascript"/><Default Extension=".png" ContentType="image/png"/><Default Extension=".svg" ContentType="image/svg+xml"/><Default Extension=".ttf" ContentType="font/ttf"/><Default Extension=".txt" ContentType="text/plain"/><Default Extension=".vsixmanifest" ContentType="text/xml"/><Default Extension=".wasm" ContentType="application/wasm"/><Default Extension=".wavedrom" ContentType="application/octet-stream"/><Default Extension=".woff" ContentType="font/woff"/><Default Extension=".woff2" ContentType="font/woff2"/></Types>`;

const tags = [...(pkg.keywords || []), "keybindings"].join(",");
const categories = (pkg.categories || []).join(",");
const extensionKind = Array.isArray(pkg.extensionKind) ? pkg.extensionKind.join(",") : pkg.extensionKind || "ui";

const manifest = `<?xml version="1.0" encoding="utf-8"?>
\t<PackageManifest Version="2.0.0" xmlns="http://schemas.microsoft.com/developer/vsx-schema/2011" xmlns:d="http://schemas.microsoft.com/developer/vsx-schema-design/2011">
\t\t<Metadata>
\t\t\t<Identity Language="en-US" Id="${escapeXml(pkg.name)}" Version="${escapeXml(pkg.version)}" Publisher="${escapeXml(pkg.publisher)}" />
\t\t\t<DisplayName>${escapeXml(pkg.displayName)}</DisplayName>
\t\t\t<Description xml:space="preserve">${escapeXml(pkg.description)}</Description>
\t\t\t<Tags>${escapeXml(tags)}</Tags>
\t\t\t<Categories>${escapeXml(categories)}</Categories>
\t\t\t<GalleryFlags>Public</GalleryFlags>
\t\t\t<Properties>
\t\t\t\t<Property Id="Microsoft.VisualStudio.Code.Engine" Value="${escapeXml(pkg.engines?.vscode || "^1.95.0")}" />
\t\t\t\t<Property Id="Microsoft.VisualStudio.Code.ExtensionDependencies" Value="" />
\t\t\t\t<Property Id="Microsoft.VisualStudio.Code.ExtensionPack" Value="" />
\t\t\t\t<Property Id="Microsoft.VisualStudio.Code.ExtensionKind" Value="${escapeXml(extensionKind)}" />
\t\t\t\t<Property Id="Microsoft.VisualStudio.Code.LocalizedLanguages" Value="" />
\t\t\t\t<Property Id="Microsoft.VisualStudio.Code.EnabledApiProposals" Value="" />
\t\t\t\t<Property Id="Microsoft.VisualStudio.Code.ExecutesCode" Value="true" />
\t\t\t\t<Property Id="Microsoft.VisualStudio.Services.GitHubFlavoredMarkdown" Value="true" />
\t\t\t\t<Property Id="Microsoft.VisualStudio.Services.Content.Pricing" Value="Free"/>
\t\t\t</Properties>
\t\t\t<License>extension/LICENSE.txt</License>
\t\t\t<Icon>extension/media/brand/icon.png</Icon>
\t\t</Metadata>
\t\t<Installation>
\t\t\t<InstallationTarget Id="Microsoft.VisualStudio.Code"/>
\t\t</Installation>
\t\t<Dependencies/>
\t\t<Assets>
\t\t\t<Asset Type="Microsoft.VisualStudio.Code.Manifest" Path="extension/package.json" Addressable="true" />
\t\t\t<Asset Type="Microsoft.VisualStudio.Services.Content.Details" Path="extension/readme.md" Addressable="true" />
\t\t\t<Asset Type="Microsoft.VisualStudio.Services.Content.Changelog" Path="extension/changelog.md" Addressable="true" />
\t\t\t<Asset Type="Microsoft.VisualStudio.Services.Content.License" Path="extension/LICENSE.txt" Addressable="true" />
\t\t\t<Asset Type="Microsoft.VisualStudio.Services.Icons.Default" Path="extension/media/brand/icon.png" Addressable="true" />
\t\t</Assets>
\t</PackageManifest>`;

fs.writeFileSync(path.join(stage, "[Content_Types].xml"), contentTypes, "utf8");
fs.writeFileSync(path.join(stage, "extension.vsixmanifest"), manifest, "utf8");

fs.copyFileSync(path.join(root, "package.json"), path.join(extDir, "package.json"));
fs.copyFileSync(path.join(root, "README.md"), path.join(extDir, "readme.md"));
fs.copyFileSync(path.join(root, "CHANGELOG.md"), path.join(extDir, "changelog.md"));
fs.copyFileSync(path.join(root, "LICENSE"), path.join(extDir, "LICENSE.txt"));
fs.copyFileSync(path.join(root, "THIRD_PARTY_NOTICES.md"), path.join(extDir, "THIRD_PARTY_NOTICES.md"));
fs.cpSync(path.join(root, "dist"), path.join(extDir, "dist"), { recursive: true });
fs.cpSync(path.join(root, "media"), path.join(extDir, "media"), { recursive: true });
fs.mkdirSync(path.join(extDir, "node_modules"), { recursive: true });
fs.cpSync(path.join(root, "node_modules", "playwright-core"), path.join(extDir, "node_modules", "playwright-core"), {
  recursive: true
});

fs.rmSync(vsixPath, { force: true });
execFileSync("/usr/bin/zip", ["-r", "-q", vsixPath, "."], { cwd: stage });
fs.rmSync(stage, { recursive: true, force: true });

const hash = createHash("sha256").update(fs.readFileSync(vsixPath)).digest("hex");
fs.writeFileSync(shaPath, `${hash}  ${vsixName}\n`, "utf8");

console.log(`Packaged ${vsixPath} (${fs.statSync(vsixPath).size} bytes)`);
console.log(`SHA-256: ${hash}`);
