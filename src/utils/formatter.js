export function capitalize(string) {
  if (typeof string !== "string" || string.length === 0) {
    return string;
  }

  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function lowercase(string) {
  if (typeof string !== "string" || string.length === 0) {
    return string;
  }

  return string.charAt(0).toLowerCase() + string.slice(1).toLowerCase();
}

export function formatNumber(input) {
  if (typeof input !== "number" || input < 0) {
    return "Invalid input. Please provide a positive number.";
  }

  let formatted = input.toString();

  if (formatted.length < 3) {
    formatted = formatted.padStart(3, "0");
  }

  return formatted;
}

export function getType(input) {
  const split = input.split("/");
  return lowercase(split[0]);
}
