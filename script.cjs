const fs = require('fs');
const path = 'src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add import for instagramPosts if not there
if (!content.includes('import { instagramPosts }')) {
  content = content.replace(
    'import { ThemeToggle } from "@/components/ui/theme-toggle";',
    'import { ThemeToggle } from "@/components/ui/theme-toggle";\nimport { instagramPosts } from "@/data/instagramFeed";'
  );
}

// Add extractEmbedUrl function if not there
if (!content.includes('function extractEmbedUrl')) {
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
}

// Replace filmReels array
const filmReelsStr = `const filmReels = instagramPosts.slice(0, 4).map((post, i) => ({
  tag: ["Brand · Reel", "After Work", "Studio · Talk", "Street · B-roll"][i] || "Reel",
  title: ["Atlas — Origin", "Off-hours", "20:00 Live", "Walk & Talk"][i] || "Reel",
  src: post.url,
  poster: ""
}));`;
const startIdx = content.indexOf('const filmReels = [');
const endIdx = content.indexOf('];', startIdx);
if (startIdx !== -1 && endIdx > startIdx) {
  content = content.substring(0, startIdx) + filmReelsStr + content.substring(endIdx + 2);
}

// Remove ready state
content = content.replace('const [ready, setReady] = useState<boolean[]>([false, false, false, false]);', '');

// Replace video tag with iframe
const videoRegex = /<video[\s\S]*?<\/video>/g;
content = content.replace(videoRegex, `<iframe
                    src={extractEmbedUrl(reel.src)}
                    className="absolute inset-0 h-full w-full border-none"
                    loading="lazy"
                    title={reel.title}
                    allowTransparency={true}
                    allowFullScreen={true}
                  />`);

content = content.replace(/\{!ready\[i\] && \([\s\S]*?\)\}/g, '');

fs.writeFileSync(path, content);
console.log('Replaced filmReels and video tag in index.tsx');
