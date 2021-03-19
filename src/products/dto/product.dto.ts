export class ProductDto {
  readonly id: number;
  readonly name: string;
  readonly product_code: string;
  readonly manufacturer: {
    readonly name: string;
  };
}
