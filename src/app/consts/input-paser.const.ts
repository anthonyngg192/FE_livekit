export class InputParser {
  NumberInput = (value: string) =>
    value
      .trim()
      .replace(/。/g, '.')
      .replace(/[^\w\.-]+/g, '');
}
