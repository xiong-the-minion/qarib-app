// Copy text to clipboard utility
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
}

// Format complete transcript for copying
export function formatCompleteTranscript(entries: Array<{
  speaker: string;
  timestamp: string;
  text: string;
}>): string {
  return entries
    .map(entry => `${entry.speaker} (${entry.timestamp}): ${entry.text}`)
    .join('\n\n');
}

// Format individual dialogue for copying
export function formatDialogue(entry: {
  speaker: string;
  timestamp: string;
  text: string;
}): string {
  return `${entry.speaker} (${entry.timestamp}): ${entry.text}`;
}
