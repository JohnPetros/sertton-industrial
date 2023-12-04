export const REGEX = {
  htmlTags: /<\/?[^>]+(>|$)/g,
  htmlList: /<li>(.*?)<\/li>/g,
  htmlLiTag: /<\/?li>/g,
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  phone: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  email: /^\S+@\S+\.\S+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W\S]{6,}$/g,
}
