export interface Channel {
  title: string;
  url: string;
  group?: string;
  logo?: string;
}

export function parseM3U(content: string): Channel[] {
  const lines = content.split('\n');
  const channels: Channel[] = [];
  let currentChannel: Partial<Channel> = {};

  lines.forEach(line => {
    line = line.trim();
    
    if (line.startsWith('#EXTINF:')) {
      // Parse channel info
      const titleMatch = line.match(/,(.+)$/);
      if (titleMatch) {
        currentChannel.title = titleMatch[1].trim();
      }

      // Parse tvg-logo if exists
      const logoMatch = line.match(/tvg-logo="([^"]+)"/);
      if (logoMatch) {
        currentChannel.logo = logoMatch[1];
      }

      // Parse group-title if exists
      const groupMatch = line.match(/group-title="([^"]+)"/);
      if (groupMatch) {
        currentChannel.group = groupMatch[1];
      }
    } else if (line.startsWith('http') || line.startsWith('https')) {
      // This is the channel URL
      currentChannel.url = line;
      if (currentChannel.title && currentChannel.url) {
        channels.push(currentChannel as Channel);
      }
      currentChannel = {};
    }
  });

  return channels;
}