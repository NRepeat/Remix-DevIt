export function formatString(inputString: string): string {
  const words = inputString.split("-");
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const formattedString = formattedWords.join(" ");

  return formattedString;
}
export function stringToSlug(str: string) {
  const slug = str.toLowerCase().replace(/\s+/g, "-");

  const cleanSlug = slug.replace(/[^\w-]/g, "");

  return cleanSlug;
}
