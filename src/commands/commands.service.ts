import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CommandType } from './dto/command.dto';
import { CreateCommandInput } from './dto/create-command.dto';
import { Command } from './interfaces/command.interface';

import { RemoveManyType } from '../shared/dto/remove-many.dto';

@Injectable()
export class CommandsService {

  constructor(
    @InjectModel('Command') private commandModel: Model<Command>,
  ) { }


  /**
   * Create Command
   */

  async create(createCommandDto: CreateCommandInput): Promise<CommandType> {
    const createdCommand = new this.commandModel(createCommandDto);
    return createdCommand.authorID === 'null' ? await Promise.reject() : await createdCommand.save();
  }


  /**
   * Find Command
   */

  async findCommand(commandName: string, guildID?: string): Promise<CommandType> {
    return await this.commandModel.findOne({
      deleted: false,
      commandName,
      ...guildID ? { guildID } : {}
    });
  }

  async findAllCommands(guildID?: string): Promise<CommandType[]> {
    return await this.commandModel.find({
      deleted: false,
      ...guildID ? { guildID } : {},
    }).exec();
  }

  async findDeletedCommands(guildID?: string): Promise<CommandType[]> {
    return await this.commandModel.find({
      deleted: true,
      ...guildID ? { guildID } : {},
    });
  }


  /**
   * Delete Command
   */

  async delete(id: string): Promise<CommandType> {
    return await this.commandModel.findByIdAndUpdate(id, { deleted: true });
  }

  async deleteByName(commandName: string, guildID: string): Promise<CommandType> {
    const filter = { commandName, guildID };

    return await this.commandModel.findOneAndDelete(filter);
  }

  async trueDelete(id: string): Promise<CommandType> {
    return await this.commandModel.findByIdAndDelete(id);
  }

  async deleteAll(guildID?: string): Promise<RemoveManyType> {
    return await this.commandModel.deleteMany({
      ...guildID ? { guildID } : {},
    });
  }

}
