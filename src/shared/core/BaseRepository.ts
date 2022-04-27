import { PrismaRepository } from '../infra/database/prisma/PrismaRepository';
import { IPaginationMetadata } from './interfaces/paginationMetadata.interface';
import { IPaginationOptions } from './interfaces/paginationOptions.interface';

export class BaseRepository {
  public constructor(
    protected prisma: PrismaRepository,
    readonly entityName: string,
  ) {}

  async paginate(params: {
    options: IPaginationOptions;
    where?: any;
    select?: any;
    include?: any;
    rejectOnNotFound?: any;
    orderBy?: any;
  }): Promise<any> {
    const { options, where, include } = params;
    const skipCalc = (options.page - 1) * options.limit;

    const transaction = await this.prisma.$transaction([
      this.prisma[this.entityName].count({
        where,
        orderBy: {
          created_at: 'desc',
        },
      }),
      this.prisma[this.entityName].findMany({
        skip: skipCalc < 0 ? 0 : skipCalc,
        take: options.limit,
        where,
        include,
        orderBy: {
          created_at: 'desc',
        },
      }),
    ]);

    const metadata = {
      itemCount: transaction[1].length,
      totalItems: transaction[0],
      itemsPerPage: options.limit,
      totalPages: Math.ceil(transaction[0] / options.limit),
      currentPage: options.page == 0 ? 1 : options.page,
    } as IPaginationMetadata;

    return {
      items: transaction[1],
      meta: metadata,
    };
  }

  async findOne(params: { where: any }): Promise<any | undefined> {
    const { where } = params;
    if (!where) return undefined;
    return await this.prisma[this.entityName].findUnique({ where });
  }

  async findAll(params: {
    where: any;
    select?: any;
    include?: any;
    rejectOnNotFound?: any;
    orderBy?: any;
  }): Promise<any[] | undefined> {
    const { where, select, include, rejectOnNotFound, orderBy } = params;
    const result = await this.prisma[this.entityName].findMany({
      where,
      select,
      include,
      rejectOnNotFound,
      orderBy,
    });
    return result;
  }

  async count(params: { where: any }): Promise<any[] | undefined> {
    const { where } = params;
    const result = await this.prisma[this.entityName].count({ where });
    return result;
  }
}
