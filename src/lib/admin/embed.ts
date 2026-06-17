export type EmbedKind =
  | "youtube"
  | "vimeo"
  | "instagram"
  | "tiktok"
  | "pinterest"
  | "mp4"
  | "unknown";

export interface EmbedResult {
  kind: EmbedKind;
  embedUrl: string;
  thumb?: string;
}

export function detectEmbed(rawUrl: string): EmbedResult {
  try {
    new URL(rawUrl); // validate
  } catch {
    return { kind: "unknown", embedUrl: rawUrl };
  }

  // YouTube
  const ytMatch = rawUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/
  );
  if (ytMatch) {
    const id = ytMatch[1];
    return {
      kind: "youtube",
      embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&playsinline=1`,
      thumb: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    };
  }

  // Vimeo
  const vimeoMatch = rawUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    const id = vimeoMatch[1];
    return {
      kind: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1`,
    };
  }

  // Instagram
  const igMatch = rawUrl.match(/instagram\.com\/(reel|p|tv)\/([A-Za-z0-9_-]+)/);
  if (igMatch) {
    const type = igMatch[1];
    const id = igMatch[2];
    return {
      kind: "instagram",
      embedUrl: `https://www.instagram.com/${type}/${id}/embed`,
    };
  }

  // TikTok
  const ttMatch = rawUrl.match(/tiktok\.com\/.+\/video\/(\d+)/);
  if (ttMatch) {
    const id = ttMatch[1];
    return {
      kind: "tiktok",
      embedUrl: `https://www.tiktok.com/embed/v2/${id}`,
    };
  }

  // Pinterest
  const pinMatch = rawUrl.match(/pinterest\.com\/pin\/(\d+)/);
  if (pinMatch) {
    const id = pinMatch[1];
    return {
      kind: "pinterest",
      embedUrl: `https://assets.pinterest.com/ext/embed.html?id=${id}`,
    };
  }

  // Direct video file
  if (/\.(mp4|webm|mov)(\?|$)/i.test(rawUrl)) {
    return { kind: "mp4", embedUrl: rawUrl };
  }

  return { kind: "unknown", embedUrl: rawUrl };
}

export function toggleYouTubeMute(src: string, muted: boolean): string {
  const url = new URL(src);
  url.searchParams.set("mute", muted ? "1" : "0");
  return url.toString();
}
