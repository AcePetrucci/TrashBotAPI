import { Resolver, Query, Mutation, Args, ArgsOptions } from '@nestjs/graphql';

import { ServerConfigService } from './server-config.service';

import { ServerConfig } from './interfaces/server-config.interface';
import { ServerConfigType } from './dto/server-config.dto';
import { CreateServerConfigInput } from './dto/create-server-config.dto';

@Resolver()
export class ServerConfigResolver {

  constructor(
    private serverConfigService: ServerConfigService,
  ) { }


  /**
   * Create Server Config
   */

  @Mutation(() => ServerConfigType)
  async createServerConfig(
    @Args('serverConfig') serverConfig: CreateServerConfigInput,
  ): Promise<ServerConfigType> {
    return this.serverConfigService.create(serverConfig);
  }


  /**
   * Find Server Config
   */

  @Query(() => ServerConfigType, { nullable: true })
  async findServerConfig(
    @Args('guildID') guildID: string,
  ): Promise<ServerConfigType> {
    return this.serverConfigService.findServerConfig(guildID);
  }

  @Query(() => [ServerConfigType])
  async findAllServerConfigs(): Promise<ServerConfigType[]> {
    return this.serverConfigService.findAllServerConfigs();
  }


  /**
   * Edit Server Config
   */

  @Mutation(() => ServerConfigType)
  async toggleNh(
    @Args('guildID') guildID: string,
    @Args('disabled') disabled: boolean,
  ): Promise<ServerConfigType> {
    return this.serverConfigService.toggleNh(guildID, disabled);
  }

  @Mutation(() => ServerConfigType)
  async updateNhTimer(
    @Args('guildID') guildID: string,
    @Args('nhTimer') nhTimer: number,
  ): Promise<ServerConfigType> {
    return this.serverConfigService.updateNhTimer(guildID, nhTimer);
  }


  /**
   * Delete Server Config
   */

  @Mutation(() => ServerConfigType)
  async deleteServerConfig(
    @Args('id') id: string,
  ): Promise<ServerConfigType> {
    return this.serverConfigService.delete(id);
  }
}
