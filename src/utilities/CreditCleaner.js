// period, dash, single quote excluded
const SPECIAL_CHARS = "~`!@#$%^&*()_+={}[]|\\:;\"<>,?/";

export const cleanCredit = (credit = '') => {
  let index = 0;
  for (let i = 0; i < credit.length; i++) {
    if (SPECIAL_CHARS.includes(credit.charAt(i))) {
      index = i;
      break;
    }
  }
  return index === 0 ? credit.trim() : credit.substring(0, index).trim();
}
