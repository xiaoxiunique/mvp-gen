import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { <$ model.Name $>Service } from './<$ model.name $>.service';
import {
  Create<$ model.Name $>Req,
  Query<$ model.Name $>Req,
  Update<$ model.Name $>Req,
} from './<$ model.name $>.dto';

@UseGuards(JwtAuthGuard)
@Controller('<$ model.controllerName $>')
export class <$ model.Name $>Controller {
  @Inject()
  private readonly <$ model.name $>Service: <$ model.Name $>Service;

  @Get()
  async find(@Req() req, @Body() body, @Query() query: Query<$ model.Name $>Req) {
    return await this.<$ model.name $>Service.find(query);
  }

  @Post()
  async create(@Req() req, @Body() body: Create<$ model.Name $>Req, @Query() query) {
    return await this.<$ model.name $>Service.create(body);
  }

  @Patch(':id')
  async update(@Req() req, @Body() entity: Update<$ model.Name $>Req, @Query() query) {
    entity.id = req.query.id;
    return await this.<$ model.name $>Service.update(entity.id, entity);
  }

  @Delete(':id')
  async remove(@Req() req) {
    return await this.<$ model.name $>Service.remove({ id: req.query.id });
  }

  @Delete('/batch/delete')
  async batchRemove(@Req() req, @Query() query) {
    return await this.<$ model.name $>Service.batchRemove(query);
  }
}