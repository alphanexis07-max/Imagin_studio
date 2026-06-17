const fs = require('fs');
const path = 'src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add import for instagramPosts
content = content.replace(
  'import { ThemeToggle } from "@/components/ui/theme-toggle";',
  'import { ThemeToggle } from "@/components/ui/theme-toggle";\nimport { instagramPosts } from "@/data/instagramFeed";'
);

// Add extractEmbedUrl function
const extractEmbedUrlStr = `function extractEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const basePath = parsed.origin + parsed.pathname;
    const embedBase = basePath.endsWith("/") ? \`\${basePath}embed/\` : \`\${basePath}/embed/\`;
    return \`\${embedBase}?autoplay=1&mute=1\`;
  } catch {
    return url;
  }
}
`;
content = content.replace('export const Route = createFileRoute("/")({ component: Index });', extractEmbedUrlStr + '\nexport const Route = createFileRoute("/")({ component: Index });');

// Replace filmReels array
const filmReelsStr = `const filmReels = instagramPosts.slice(0, 4).map((post, i) => ({
  tag: ["Brand · Reel", "After Work", "Studio · Talk", "Street · B-roll"][i] || "Reel",
  title: ["Atlas — Origin", "Off-hours", "20:00 Live", "Walk & Talk"][i] || "Reel",
  src: post.url
}));`;
content = content.replace(/const filmReels = \[\s*\{[\s\S]*?\},\s*\];/m, filmReelsStr);
// Let's use a safer regex for filmReels array since it has 4 elements
const startIdx = content.indexOf('const filmReels = [');
const endIdx = content.indexOf('];', startIdx) + 2;
if (startIdx !== -1 && endIdx > startIdx) {
  content = content.substring(0, startIdx) + filmReelsStr + content.substring(endIdx);
}

// Remove ready state logic since iframe doesn't use onLoadedData in the same way
content = content.replace('const [ready, setReady] = useState<boolean[]>([false, false, false, false]);', '');
// Remove the <video> tag entirely and replace with iframe
const videoRegex = /<video[\s\S]*?<\/video>/g;
content = content.replace(videoRegex, `<iframe
                    src={extractEmbedUrl(reel.src)}
                    className="absolute inset-0 h-full w-full border-none"
                    loading="lazy"
                    title={reel.title}
                    allowTransparency={true}
                    allowFullScreen={true}
                  />`);

// Remove the ready[i] opacity transition since we removed the state
content = content.replace(/\{!ready\[i\] && \([\s\S]*?\)\}/g, '');
content = content.replace(/className=\{\`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 \$\{ready\[i\] \? "opacity-100" : "opacity-0"\}\`\}/g, 'className="absolute inset-0 h-full w-full object-cover"');

// Save file
fs.writeFileSync(path, content);
console.log('Replaced filmReels and video tag in index.tsx');
