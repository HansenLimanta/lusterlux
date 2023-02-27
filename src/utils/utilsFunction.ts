export function formatMoney(number: number) {
  let digits = number.toString().split("");
  digits.reverse();
  for (let i = 3; i < digits.length; i += 4) {
    digits.splice(i, 0, ".");
  }
  return digits.reverse().join("");
}
