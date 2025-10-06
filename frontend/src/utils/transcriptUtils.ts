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
  const lines = content.split('\n');
  const entries: Array<{
    id: number;
    speaker: string;
    timestamp: string;
    text: string;
    avatar: string;
  }> = [];
  
  let currentSpeaker = '';
  let currentTimestamp = '';
  let currentText = '';
  let entryId = 1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) {
      continue;
    }
    
    // Check if line starts with a speaker name and timestamp (format: "Speaker Name  MM:SS  ")
    const speakerMatch = line.match(/^([A-Za-z\s]+)\s+(\d+:\d+)\s*$/);
    
    if (speakerMatch) {
      // Save previous entry if we have one
      if (currentSpeaker && currentText) {
        entries.push({
          id: entryId++,
          speaker: currentSpeaker,
          timestamp: currentTimestamp,
          text: currentText.trim(),
          avatar: currentSpeaker.split(' ').map(n => n[0]).join('').toUpperCase(),
        });
      }
      
      // Start new entry
      currentSpeaker = speakerMatch[1].trim();
      currentTimestamp = speakerMatch[2];
      currentText = '';
      
      // Look for dialogue on the next line(s)
      i++;
      while (i < lines.length) {
        const nextLine = lines[i].trim();
        if (!nextLine) {
          i++;
          continue;
        }
        
        // Check if this is another speaker line
        const nextSpeakerMatch = nextLine.match(/^([A-Za-z\s]+)\s+(\d+:\d+)\s*$/);
        if (nextSpeakerMatch) {
          // This is a new speaker, don't consume this line yet
          i--; // Go back one line so the outer loop can process it
          break;
        }
        
        // This is dialogue content
        if (currentText) {
          currentText += ' ' + nextLine;
        } else {
          currentText = nextLine;
        }
        i++;
      }
    }
  }
  
  // Don't forget the last entry
  if (currentSpeaker && currentText) {
    entries.push({
      id: entryId,
      speaker: currentSpeaker,
      timestamp: currentTimestamp,
      text: currentText.trim(),
      avatar: currentSpeaker.split(' ').map(n => n[0]).join('').toUpperCase(),
    });
  }
  
  return entries;
}
