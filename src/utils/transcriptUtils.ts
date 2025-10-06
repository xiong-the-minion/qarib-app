// Helper function to generate default tag colors
export function getDefaultTagColor(index: number): string {
  const colors = [
    "bg-green-100 text-green-800",
    "bg-blue-100 text-blue-800", 
    "bg-orange-100 text-orange-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-indigo-100 text-indigo-800",
  ];
  return colors[index % colors.length];
}

// Helper function to parse transcript content into structured entries
export function parseTranscriptContent(content: string) {
  // This is a simplified parser - in reality, you'd want more sophisticated parsing
  const lines = content.split('\n').filter(line => line.trim());
  return lines.map((line, index) => {
    // Simple regex to extract speaker and text (adjust based on your content format)
    const match = line.match(/^([^:]+):\s*(.+)$/);
    if (match) {
      const [, speaker, text] = match;
      return {
        id: index + 1,
        speaker: speaker.trim(),
        timestamp: "00:00", // You might want to extract this from the content
        text: text.trim(),
        avatar: speaker.trim().split(' ').map(n => n[0]).join('').toUpperCase(),
      };
    }
    return {
      id: index + 1,
      speaker: "Unknown",
      timestamp: "00:00",
      text: line.trim(),
      avatar: "U",
    };
  });
}
