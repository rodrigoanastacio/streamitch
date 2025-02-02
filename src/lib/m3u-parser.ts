export interface Channel {
  title: string;
  url: string;
  group?: string;
  thumbnail?: string;
}

export function parseM3U(content: string): Channel[] {
  const lines = content.split("\n");
  const channels: Channel[] = [];
  let currentChannel: Partial<Channel> = {};

  lines.forEach((line) => {
    line = line.trim();

    if (line.startsWith("#EXTINF:")) {
      const titleMatch = line.match(/,(.+)$/);
      if (titleMatch) {
        currentChannel.title = titleMatch[1].trim();
      }

      // Extract group if present
      const groupMatch = line.match(/group-title="([^"]+)"/);
      if (groupMatch) {
        currentChannel.group = groupMatch[1].trim();
      }

      // Extract thumbnail URL if present
      const thumbnailMatch = line.match(/tvg-logo="([^"]+)"/);
      if (thumbnailMatch) {
        currentChannel.thumbnail = thumbnailMatch[1].trim();
      }
    } else if (line.startsWith("http")) {
      currentChannel.url = line;
      if (currentChannel.title && currentChannel.url) {
        channels.push(currentChannel as Channel);
      }
      currentChannel = {};
    }
  });

  return channels;
}
