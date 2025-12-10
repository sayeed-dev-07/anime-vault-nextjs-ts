export default function FormatSegment(segment: string) {
  return segment
    .replace(/%[0-9A-Fa-f]{2}/g, " ")     // Remove URL encoded characters like %20, %2F, etc. 
    .replace(/[^a-zA-Z0-9- ]+/g, " ")     // Remove any other symbols except letters, numbers, hyphens, spaces
    .replace(/^\d+-/, " ")                // Remove prefix like "10-fantasy"
    .replace(/[-_]?\d+[a-zA-Z0-9]*/g, " ") // Remove trailing numeric or season markers
    .replace(/-+/g, " ")                 // Replace leftover dashes with space
    .replace(/\s+/g, " ")                // Collapse extra spaces
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Title case
}
