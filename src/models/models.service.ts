import { Injectable } from '@nestjs/common';
import ICredentials from 'src/netilion-request/interfaces/credentials.interface';
import IToken from 'src/netilion-request/interfaces/token.interface';
import { NetilionRequestService } from 'src/netilion-request/netilion-request.service';
import { OAuthService } from 'src/netilion-request/oauth.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';

@Injectable()
export class ModelsService {
  constructor(private oauthService: OAuthService, private netilionRequestService: NetilionRequestService) {}

  async create(createModelDto: CreateModelDto) {
    const { client_id, client_secret, username, password } = createModelDto;

    const credentials: ICredentials = {
      client_id,
      client_secret,
      username,
      password
    };
    let token: IToken;
    try {
      token = await this.oauthService.getAccessToken(credentials);
    } catch (error) {
      console.log('🚀 ~ file: models.service.ts ~ line 30 ~ ModelsService ~ create ~ error', error);
    }
    console.log('🚀 ~ file: models.service.ts ~ line 28 ~ ModelsService ~ create ~ token', token);

    // const requestCredentials: IRequestCredentials = {
    //   clientId: client_id,
    //   accessToken: token.accessToken,
    //   tokenType: token.tokenType
    // };

    console.log('token', token);
    // const technicalUser = await this.netilionRequestService.getTechnicalUser(requestCredentials, username);

    // then try get get technical user id
    // try create a new model with technical user id
    // if fails because not unique, return error
    // if success enter information
    // create token table
    // create token and link
    // if assets dont exist
    // get all assets
    // safe all assets and link
    // safe model
    // else
    // set refresh timer
    // safe model

    return 'This action adds a new model';
  }

  findAll() {
    return `This action returns all models`;
  }

  findOne(id: number) {
    return `This action returns a #${id} model`;
  }

  update(id: number, updateModelDto: UpdateModelDto) {
    return `This action updates a #${id} model`;
  }

  remove(id: number) {
    return `This action removes a #${id} model`;
  }
}
