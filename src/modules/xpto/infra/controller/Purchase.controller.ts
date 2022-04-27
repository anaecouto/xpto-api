import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseController } from 'src/shared/infra/controller/BaseController';
import { ProductsCustomerRepository } from '../repository/ProductsCustomerRepository';
import { PurchaseProductsUseCase } from '../../application/useCase/PurchaseProductsUseCase';
import { PurchaseDTO } from './dtos/PurchaseDTO';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { FilterPurchasesByIdUseCase } from '../../application/useCase/FilterPurchasesByIdUseCase';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilterCustomerPurchasesByDayUseCase } from '../../application/useCase/FilterCustomerPurchasesByDayUseCase';
import { FilterCustomerPurchasesByMonthUseCase } from '../../application/useCase/FilterCustomerPurchasesByMonthUseCase';
import { FilterCustomerPurchasesByYearUseCase } from '../../application/useCase/FilterCustomerPurchasesByYearUseCase';
import { ListMostSoldPurchasesByDayUseCase } from '../../application/useCase/ListMostSoldPurchasesByDayUseCase';
import { ListMostSoldPurchasesByMonthUseCase } from '../../application/useCase/ListMostSoldPurchasesByMonthUseCase';
import { ListMostSoldPurchasesByYearUseCase } from '../../application/useCase/ListMostSoldPurchasesByYearUseCase';

@ApiTags('Compras')
@Controller('purchase')
export class PurchaseController extends BaseController {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productRepository: IProductsCustomerRepo,
    @Inject(PurchaseProductsUseCase)
    private purchaseProductsUseCase: PurchaseProductsUseCase,
    @Inject(FilterPurchasesByIdUseCase)
    private filterPurchasesByIdUseCase: FilterPurchasesByIdUseCase,
    @Inject(FilterCustomerPurchasesByDayUseCase)
    private filterCustomerPurchasesByDayUseCase: FilterCustomerPurchasesByDayUseCase,
    @Inject(FilterCustomerPurchasesByMonthUseCase)
    private filterCustomerPurchasesByMonthUseCase: FilterCustomerPurchasesByMonthUseCase,
    @Inject(FilterCustomerPurchasesByYearUseCase)
    private filterCustomerPurchasesByYearUseCase: FilterCustomerPurchasesByYearUseCase,
    @Inject(ListMostSoldPurchasesByDayUseCase)
    private listMostSoldPurchasesByDayUseCase: ListMostSoldPurchasesByDayUseCase,
    @Inject(ListMostSoldPurchasesByMonthUseCase)
    private listMostSoldPurchasesByMonthUseCase: ListMostSoldPurchasesByMonthUseCase,
    @Inject(ListMostSoldPurchasesByYearUseCase)
    private listMostSoldPurchasesByYearUseCase: ListMostSoldPurchasesByYearUseCase,
  ) {
    super();
  }

  @ApiOperation({
    summary: 'Efetua uma compra',
  })
  @ApiBody({ type: PurchaseDTO, required: true })
  @ApiResponse({ status: 201 })
  @Post('new')
  async create(@Res() res: Response, @Body() dto: PurchaseDTO) {
    try {
      await this.purchaseProductsUseCase.execute(dto);
      this.ok(res, { message: 'Compra efetuada com sucesso!' });
    } catch (error) {
      this.handleAppError(res, error);
    }
  }

  @ApiOperation({
    summary: 'Filtra compras por id do cliente',
  })
  @ApiQuery({ name: 'id', example: '89e22db8-f5da-4694-a5cd-e7c5cc668d70' })
  @ApiResponse({ status: 200 })
  @Get('id')
  async filterPurchasesById(@Res() res: Response, @Query('id') id: string) {
    try {
      const result = await this.filterPurchasesByIdUseCase.execute(id);
      this.ok(res, result);
    } catch (error) {
      this.handleAppError(res, error);
    }
  }

  @ApiOperation({
    summary: 'Filtra compras do cliente por dia',
  })
  @ApiQuery({ name: 'id', example: '89e22db8-f5da-4694-a5cd-e7c5cc668d70' })
  @ApiQuery({ name: 'day', example: '27' })
  @ApiResponse({ status: 200 })
  @Get('day')
  async filterCustomerPurchasesByDay(
    @Res() res: Response,
    @Query('id') id: string,
    @Query('day') day: string,
  ) {
    try {
      const result = await this.filterCustomerPurchasesByDayUseCase.execute(
        id,
        day,
      );
      this.ok(res, result);
    } catch (error) {
      this.handleAppError(res, error);
    }
  }

  @ApiOperation({
    summary: 'Filtra compras do cliente por mês',
  })
  @ApiQuery({ name: 'id', example: '89e22db8-f5da-4694-a5cd-e7c5cc668d70' })
  @ApiQuery({ name: 'month', example: '04' })
  @ApiResponse({ status: 200 })
  @Get('month')
  async filterCustomerPurchasesByMonth(
    @Res() res: Response,
    @Query('id') id: string,
    @Query('month') month: string,
  ) {
    try {
      const result = await this.filterCustomerPurchasesByMonthUseCase.execute(
        id,
        month,
      );
      this.ok(res, result);
    } catch (error) {
      this.handleAppError(res, error);
    }
  }

  @ApiOperation({
    summary: 'Filtra compras do cliente por ano',
  })
  @ApiQuery({ name: 'id', example: '89e22db8-f5da-4694-a5cd-e7c5cc668d70' })
  @ApiQuery({ name: 'year', example: '2022' })
  @ApiResponse({ status: 200 })
  @Get('year')
  async filterCustomerPurchasesByYear(
    @Res() res: Response,
    @Query('id') id: string,
    @Query('year') year: string,
  ) {
    try {
      const result = await this.filterCustomerPurchasesByYearUseCase.execute(
        id,
        year,
      );
      this.ok(res, result);
    } catch (error) {
      this.handleAppError(res, error);
    }
  }

  @ApiOperation({
    summary: 'Lista produtos mais vendidos do dia',
  })
  @ApiQuery({ name: 'day', example: '27' })
  @ApiResponse({ status: 200 })
  @Get('sold/day')
  async listMostSoldProductsByDay(
    @Res() res: Response,
    @Query('day') day: string,
  ) {
    try {
      const result = await this.listMostSoldPurchasesByDayUseCase.execute(day);
      this.ok(res, result);
    } catch (error) {
      this.handleAppError(res, error);
    }
  }

  @ApiOperation({
    summary: 'Lista produtos mais vendidos do mês',
  })
  @ApiQuery({ name: 'mês', example: '04' })
  @ApiResponse({ status: 200 })
  @Get('sold/month')
  async listMostSoldProductsByMonth(
    @Res() res: Response,
    @Query('month') month: string,
  ) {
    try {
      const result = await this.listMostSoldPurchasesByMonthUseCase.execute(
        month,
      );
      this.ok(res, result);
    } catch (error) {
      this.handleAppError(res, error);
    }
  }

  @ApiOperation({
    summary: 'Lista produtos mais vendidos do ano',
  })
  @ApiQuery({ name: 'mês', example: '04' })
  @ApiResponse({ status: 200 })
  @Get('sold/year')
  async listMostSoldProductsByYear(
    @Res() res: Response,
    @Query('year') year: string,
  ) {
    try {
      const result = await this.listMostSoldPurchasesByYearUseCase.execute(
        year,
      );
      this.ok(res, result);
    } catch (error) {
      this.handleAppError(res, error);
    }
  }
}
