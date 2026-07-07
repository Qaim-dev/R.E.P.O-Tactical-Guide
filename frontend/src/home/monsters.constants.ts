export const MONSTERS = [
  "apex-predator",
  "bela",
  "birthday-boy",
  "elsa",
  "gnome",
  "peeper",
  "shadow-child",
  "spewer",
  "tick",
  "animal",
  "banger",
  "bowtie",
  "chef",
  "gambit",
  "headgrab",
  "heart-hugger",
  "hidden",
  "mentalist",
  "oogly",
  "rugrat",
  "upscream",
  "cleanup-crew",
  "clown",
  "headman",
  "huntsman",
  "loom",
  "reaper",
  "robe",
  "trudge",
];

export function getMonsterDisplayName(filename: string): string {
  return filename
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
