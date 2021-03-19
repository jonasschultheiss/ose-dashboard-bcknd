import { SingleTagDto } from 'src/tags/dto/single-tag.dto';

export class NetilionResponseDto {
  readonly id: number;
  readonly serial_number: string;
  readonly production_date: string;
  readonly last_seen_at: string;
  readonly status: {
    readonly id: number;
    readonly code: string;
    readonly name: string;
    readonly description: string;
  };
  readonly product: {
    readonly id: number;
    readonly name: string;
    readonly product_code: string;
    readonly manufacturer: {
      readonly name: string;
    };
  };
  readonly instrumentations: {
    readonly items: SingleTagDto[];
  };
}
