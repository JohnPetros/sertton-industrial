export function removeHTMLTags(text: string, tag: string) {
  return text.replace(new RegExp(`</?${tag}>`, 'g'), '')
}
