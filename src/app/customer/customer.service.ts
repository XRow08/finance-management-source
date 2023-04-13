import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {

  constructor (private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.customer.findMany({
      select: {
        id: true,
        name: true,
        cpfCnpj: true,
        email: true,
        cellphone: true,
      },
      where: {
        deletedAt: null,
      },
    });
  }

  async createNew(data: CreateCustomerDto, userId: string) {
    try {
      return await this.prismaService.customer.create({
        data: {
          ...data,
          user: { connect: { id: userId } },
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneById(id: string) {
    try {
      return await this.prismaService.customer.findFirstOrThrow({
        select: {
          id: true,
          name: true,
          cpfCnpj: true,
          email: true,
          cellphone: true,
        },
        where: { id, deletedAt: null },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateById(id: string, data: UpdateCustomerDto) {
    await this.findOneById(id);
    return await this.prismaService.customer.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteById(id: string) {
    await this.findOneById(id);
    await this.prismaService.customer.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  /* async findOneOrCreateAnExternalCustomer(
    data: CreateCustomerDto,
  ): Promise<string> {
    let paymentCustomer = await this.payment.findOneCustomerByDocument(
      data.cpfCnpj,
    );
    if (!paymentCustomer) {
      const externalCustomer = new PaymentCustomer({
        name: data.name,
        cpfCnpj: data.cpfCnpj,
      });
      paymentCustomer = await this.payment.createCustomer(externalCustomer);
    }
    const externalId = paymentCustomer.id;
    return externalId;
  } */
}
