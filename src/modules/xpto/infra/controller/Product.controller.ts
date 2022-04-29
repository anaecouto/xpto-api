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
import { ProductRepository } from '../repository/ProductRepository';
import ProductQuery from '../../application/query/ProductQuery';
import { BaseController } from 'src/shared/infra/controller/BaseController';
import { ProductDTO } from './dtos/ProductDTO';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IProductRepo } from '../../domain/repository/IProductRepo';

@ApiTags('Produtos')
@Controller('product')
export class ProductController extends BaseController {
  constructor(
    @Inject(ProductRepository)
    private productRepository: IProductRepo,
    @Inject(ProductQuery)
    private productQuery: ProductQuery,
  ) {
    super();
  }

  @ApiOperation({
    summary: 'Insere um novo produto',
  })
  @ApiBody({ type: ProductDTO, required: true })
  @ApiResponse({ status: 201 })
  @Post('create')
  async create(@Res() res: Response, @Body() dto: ProductDTO) {
    try {
      await this.productQuery.createProduct(dto);
      this.ok(res, { message: 'Produto cadastrado com sucesso!' });
    } catch (error) {
      this.handleAppError(res, error);
    }
  }

  @ApiOperation({
    summary: 'Encontra um produto pelo id',
  })
  @ApiQuery({ name: 'id', example: 'd4c90ffa-d4c9-4c5a-8b3a-e4f6f355112b' })
  @ApiResponse({ status: 200 })
  @Get('')
  async find(@Res() res: Response, @Query('id') id: string) {
    try {
      const result = await this.productQuery.findById(id);
      this.ok(res, { product: result.props });
    } catch (error) {
      this.handleAppError(res, error);
    }
  }

  @ApiOperation({
    summary: 'Atualiza um produto',
  })
  @ApiQuery({ name: 'id', example: 'd4c90ffa-d4c9-4c5a-8b3a-e4f6f355112b' })
  @ApiBody({ type: ProductDTO, required: true })
  @ApiResponse({ status: 200 })
  @Put()
  async updateProduct(
    @Res() res: Response,
    @Query('id') id: string,
    @Body() productParams: ProductDTO,
  ) {
    try {
      const product = await this.productQuery.updateProduct(id, productParams);
      this.ok(res, { product: product.props });
    } catch (error) {
      this.handleAppError(res, error);
    }
  }

  @ApiOperation({
    summary: 'Deleta um produto',
  })
  @ApiQuery({ name: 'id', example: 'd4c90ffa-d4c9-4c5a-8b3a-e4f6f355112b' })
  @ApiResponse({ status: 200 })
  @Delete()
  async deleteProduct(@Res() res: Response, @Query('id') id: string) {
    try {
      await this.productQuery.deleteProduct(id);
      this.ok(res, { message: 'Produto deletado com sucesso!' });
    } catch (error) {
      this.handleAppError(res, error);
    }
  }
}
