import { Controller, Post, Body, UseGuards, Patch, Param, Query, Get} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decotators';
import { Users } from 'src/users/users.entity';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { Reports } from './reports.entity';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateReportDto } from './dtos/get-estimate.dto';

@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {

    constructor(private reportService: ReportsService) {}

    @Post('/')
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: Users) {
        return this.reportService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto): Promise<Reports> {
        const report = this.reportService.changeApproval(id, body.approve);
        return report
    }

    @Get('/')
    getEstimate(@Query() query: GetEstimateReportDto) {
        console.log(query);
    }
}
