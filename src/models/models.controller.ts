import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { AssetsService } from 'src/assets/assets.service';
import { Asset } from 'src/assets/entities/asset.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './entities/model.entity';
import { ModelsService } from './models.service';

@Controller()
export class ModelsController {
  constructor(private readonly modelsService: ModelsService, private assetsService: AssetsService) {}

  @Post('models')
  @UseGuards(JwtAuthGuard)
  async create(@Body(ValidationPipe) createModelDto: CreateModelDto, @Request() req): Promise<Model> {
    const user: User = req.user;
    return this.modelsService.create(createModelDto, user);
  }

  @Get('models')
  findAll() {
    return this.modelsService.findAll();
  }

  @Get('models/:id')
  findOne(@Param('id') id: string) {
    return this.modelsService.findOne(+id);
  }

  @Get('models/:id/assets')
  getAllAssets(@Param('id') id: string): Promise<Asset[]> {
    return this.assetsService.getAssetsOfModel(+id);
  }

  @Patch('models/:id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto) {
    return this.modelsService.update(+id, updateModelDto);
  }

  @Get('geolocation')
  async autoCompleteAddress(@Query('q') q: string) {
    return this.modelsService.autoCompleteAddress(q);
  }

  @Put('models/:id/location')
  @UseGuards(JwtAuthGuard)
  async updateLocation(@Param('id') id: string, @Body(ValidationPipe) UpdateLocationDto): Promise<Model> {
    return this.modelsService.updateLocation(id, UpdateLocationDto);
  }
}
