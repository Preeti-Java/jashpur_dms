import { Component } from '@angular/core';
import { SingleUpload } from "../single-upload/single-upload";
import { BulkUpload } from "../bulk-upload/bulk-upload";
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';




@Component({
  selector: 'app-upload',
  imports: [SingleUpload, BulkUpload,
    MatIconModule,
    MatTabsModule  ],
  templateUrl: './upload.html',
  styleUrl: './upload.scss'
})
export class Upload {
  

}
