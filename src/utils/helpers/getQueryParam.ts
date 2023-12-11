export function getSearchParams(url: string, param: string) {
  return url.split(param + '=')[1].split('&')[0]
}
