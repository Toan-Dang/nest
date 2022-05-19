import { InventoryService } from './inventory.service';
import { Controller, Get } from '@nestjs/common';

@Controller('inventory')
export class InventoryController {
  constructor(private invenservice: InventoryService) {}

  @Get()
  getAllInven() {
    return this.invenservice.getAllInvent();
  }
}
