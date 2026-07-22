function shimmer(w: number, h: number) {
  return `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#e5e0d8" offset="20%" />
        <stop stop-color="#f2efe9" offset="50%" />
        <stop stop-color="#e5e0d8" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#e5e0d8" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
  </svg>`;
}

function toBase64(str: string) {
  if (typeof window === "undefined") {
    return Buffer.from(str).toString("base64");
  }
  return window.btoa(str);
}

export function blurDataURL(w = 700, h = 475) {
  return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
}
