import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { WorkLogsService } from './work-logs.service';
import { CreateWorkLogDto } from './dto/work-log.dto';

@Controller('work-logs')
export class WorkLogsController {
    constructor(private readonly workLogsService: WorkLogsService) { }

    @Post()
    create(@Body() createWorkLogDto: CreateWorkLogDto) {
        return this.workLogsService.create(createWorkLogDto);
    }

    @Get()
    findByProject(@Query('projectId') projectId: string) {
        return this.workLogsService.findByProject(+projectId);
    }

    @Get('cost')
    getCost(@Query('projectId') projectId: string) {
        if (!projectId) return { cost: 0 };
        return this.workLogsService.getProjectLaborCost(+projectId).then(cost => ({ cost }));
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.workLogsService.remove(+id);
    }
}
