import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  Res,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { Response } from 'express';
import { AssetsService } from 'src/assets/assets.service';
import { Asset } from 'src/assets/entities/asset.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateModelDto } from './dto/create-model.dto';
import { ManualLinkDto } from './dto/manual-link.dto';
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

  @Post('models/:id/autolink')
  @UseGuards(JwtAuthGuard)
  autoLinkAssets(@Param('id') id: string) {
    return this.modelsService.autoLinkAssets(+id);
  }

  @Post('/models/:modelId/assets/:assetId/link')
  @UseGuards(JwtAuthGuard)
  manuallyLinkAsset(
    @Param('modelId') modelId: string,
    @Param('assetId') assetId: string,
    @Body(ValidationPipe) manualLinkDto: ManualLinkDto
  ) {
    return this.modelsService.manuallyLinkAsset(+modelId, +assetId, manualLinkDto);
  }

  // @Delete('/models/:modelId/assets/:assetId/link')
  // @UseGuards(JwtAuthGuard)
  // unlinkAsset(@Param('modelId') modelId: string, @Param('assetId') assetId: string) {
  //   return this.modelsService.unlinkAsset(+modelId, +assetId);
  // }

  @Patch('models/:id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto) {
    return this.modelsService.update(+id, updateModelDto);
  }

  @Get('geolocation')
  async autoCompleteAddress(@Query('q') q: string) {
    return this.modelsService.autoCompleteAddress(q);
  }

  @Get('mapview')
  @Header('Content-Type', 'image/jpeg; charset=UTF-8')
  async getMapView(@Query('lat') lat: string, @Query('long') long: string, @Res() response: Response) {
    const stream = await this.modelsService.getMapView(+lat, +long);

    response.end(Buffer.from(stream, 'base64'));
  }

  @Get('models/:id/location')
  async getModelLocation(@Param('id') id: string) {
    return this.modelsService.getModelLocation(+id);
  }

  @Put('models/:id/location')
  @UseGuards(JwtAuthGuard)
  async updateLocation(@Param('id') id: string, @Body(ValidationPipe) UpdateLocationDto): Promise<Model> {
    return this.modelsService.updateLocation(id, UpdateLocationDto);
  }
}
