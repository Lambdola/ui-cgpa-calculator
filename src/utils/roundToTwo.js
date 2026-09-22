export default function roundToTwo(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}
