import { Resolver, Query, Mutation, Args, ArgsOptions } from '@nestjs/graphql';

import { CommandsService } from './commands.service';

import { Command } from './interfaces/command.interface';
import { CommandType } from './dto/command.dto';
import { CreateCommandInput } from './dto/create-command.dto';

import { RemoveManyType } from '../shared/dto/remove-many.dto';

@Resolver()
export class CommandsResolver {

  constructor(
    private commandsService: CommandsService,
  ) { }


  /**
   * Create Quote
   */

  @Mutation(() => CommandType)
  async createCommand(
    @Args('command') command: CreateCommandInput,
  ): Promise<CommandType> {
    return this.commandsService.create({ ...command, ...{ createdAt: new Date() } });
  }


  /**
   * Find Quotes
   */

  @Query(() => CommandType)
  async findCommand(
    @Args('commandName') commandName: string,
    @Args({
      name: 'guildID',
      nullable: true,
      type: () => String,
    }) guildID?: string,
  ): Promise<CommandType> {
    return this.commandsService.findCommand(commandName, guildID);
  }


  /**
   * Dev Find Quotes
   */

  @Query(() => [CommandType])
  async findAllCommands(
    @Args({
      name: 'guildID',
      nullable: true,
      type: () => String,
    }) guildID?: string,
  ): Promise<CommandType[]> {
    return this.commandsService.findAllCommands(guildID);
  }

  @Query(() => [CommandType])
  async findDeletedCommmands(
    @Args({
      name: 'guildID',
      nullable: true,
      type: () => String,
    }) guildID?: string,
  ): Promise<CommandType[]> {
    return this.commandsService.findDeletedCommands(guildID);
  }


  /**
   * Delete Quote
   */

  @Mutation(() => CommandType)
  async deleteCommand(
    @Args('id') id: string,
  ): Promise<CommandType> {
    return this.commandsService.delete(id);
  }

  @Mutation(() => CommandType)
  async deleteByNameCommand(
    @Args('commandName') commandName: string,
    @Args('guildID') guildID: string,
  ): Promise<CommandType> {
    return this.commandsService.deleteByName(commandName, guildID);
  }

  @Mutation(() => CommandType)
  async trueDeleteCommand(
    @Args('id') id: string,
  ): Promise<CommandType> {
    return this.commandsService.trueDelete(id);
  }

  @Mutation(() => RemoveManyType)
  async deleteAllCommands(
    @Args({
      name: 'guildID',
      nullable: true,
      type: () => String,
    }) guildID?: string,
  ): Promise<RemoveManyType> {
    return this.commandsService.deleteAll(guildID);
  }

}
