import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ServerConfigType } from './dto/server-config.dto';
import { CreateServerConfigInput } from './dto/create-server-config.dto';
import { ServerConfig } from './interfaces/server-config.interface';

@Injectable()
export class ServerConfigService {

  constructor(
    @InjectModel('ServerConfig') private serverConfigModel: Model<ServerConfig>,
  ) { }


  /**
   * Create Server Config
   */

  async create(createServerConfigDto: CreateServerConfigInput): Promise<ServerConfigType> {
    const createdServerConfig = new this.serverConfigModel(createServerConfigDto);
    return await createdServerConfig.save();
  }

  
  /**
   * Edit Server Config
   */

  async toggleNh(guildID: string, disabled: boolean): Promise<ServerConfigType> {
    return await this.serverConfigModel.findOneAndUpdate({guildID}, {nhenDisable: disabled})
  }

  async updateNhTimer(guildID: string, nhTimer: number): Promise<ServerConfigType> {
    return await this.serverConfigModel.findOneAndUpdate({guildID}, {nhenTimer: nhTimer})
  }


  /**
   * Find Server Config
   */

   async findServerConfig(guildID: string): Promise<ServerConfigType> {
    return await this.serverConfigModel.findOne({guildID});
  }

  async findAllServerConfigs(): Promise<ServerConfigType[]> {
    return await this.serverConfigModel.find().exec();
  }


  /**
   * Delete Server Config
   */

   async delete(id: string): Promise<ServerConfigType> {
    return await this.serverConfigModel.findByIdAndDelete(id);
  }
}
