export function convertYoutubeUrl(url: string): string {
  const watchPattern = /https:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  const match = url.match(watchPattern);

  if (match) {
      const videoId = match[2];
      return `https://youtube.com/embed/${videoId}`;
  } else {
      throw new Error("Некорректный URL");
  }
}