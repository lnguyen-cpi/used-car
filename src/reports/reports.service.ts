import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reports } from './reports.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { Users } from 'src/users/users.entity';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(Reports) private repo: Repository<Reports> ) {}

    create(reportDto: CreateReportDto, user: Users) {
        const report = this.repo.create(reportDto);
        report.user = user
        return this.repo.save(report);
    }

    async changeApproval(id: string, approve: boolean): Promise<Reports> {

        // const report = await this.repo.find(
        //     {
        //         where: {
        //             id: parseInt(id)
        //         }
        //     }
        // )
        const report = await this.repo.findOneBy({id: parseInt(id)});

        if (!report) {
            throw new NotFoundException('Not Found Report')
        }

        report.approved = approve
        return this.repo.save(report);
    }
}
