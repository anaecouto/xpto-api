import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomerRepository } from '../repository/CustomerRepository';
import CustomerQuery from '../../application/query/CustomerQuery';
import { CustomerDTO } from './dtos/CustomerDTO';
import { BaseController } from 'src/shared/infra/controller/BaseController';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ICustomerRepo } from '../../domain/repository/ICustomerRepo';

@ApiTags('Clientes')
@Controller('customer')
export class CustomerController extends BaseController {
  constructor(
    @Inject(CustomerRepository)
    private customerRepository: ICustomerRepo,
    @Inject(CustomerQuery)
    private customerQuery: CustomerQuery,
  ) {
    super();
  }

  @ApiOperation({
    summary: 'Cria um novo cliente',
  })
  @ApiBody({ type: CustomerDTO, required: true })
  @ApiResponse({ status: 201 })
  @Post('create')
  async create(@Res() res: Response, @Body() dto: CustomerDTO) {
    try {
      await this.customerQuery.createCustomer(dto);
      this.ok(res, { message: 'Cliente cadastrado com sucesso!' });
    } catch (error) {
      this.handleAppError(res, error);
    }
  }

  @ApiOperation({
    summary: 'Encontra um cliente pelo cpf',
  })
  @ApiQuery({ name: 'cpf', example: '44931857914' })
  @ApiResponse({ status: 200 })
  @Get()
  async findCustomer(@Res() res: Response, @Query('cpf') cpf: string) {
    try {
      const customer = await this.customerQuery.findCustomer(cpf);
      this.ok(res, { customer: customer.props });
    } catch (error) {
      this.handleAppError(res, error);
    }
  }

  @ApiOperation({
    summary: 'Atualiza um cliente',
  })
  @ApiQuery({ name: 'id', example: '89e22db8-f5da-4694-a5cd-e7c5cc668d70' })
  @ApiBody({ type: CustomerDTO, required: true })
  @ApiResponse({ status: 200 })
  @Put()
  async updateCustomer(
    @Res() res: Response,
    @Query('id') id: string,
    @Body() customerParams: CustomerDTO,
  ) {
    try {
      const customer = await this.customerQuery.updateCustomer(
        id,
        customerParams,
      );
      this.ok(res, { customer: customer.props });
    } catch (error) {
      this.handleAppError(res, error);
    }
  }

  @ApiOperation({
    summary: 'Deleta um cliente',
  })
  @ApiQuery({ name: 'id', example: '89e22db8-f5da-4694-a5cd-e7c5cc668d70' })
  @ApiResponse({ status: 200 })
  @Delete()
  async deleteCustomer(@Res() res: Response, @Query('id') id: string) {
    try {
      await this.customerQuery.deleteCustomer(id);
      this.ok(res, { message: 'Cliente deletado com sucesso!' });
    } catch (error) {
      this.handleAppError(res, error);
    }
  }
}
