import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DownloadService } from '../../services/download-service';




@Component({
  selector: 'app-bulk-upload',
 standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatCard,
    MatIcon
  ],
  templateUrl: './bulk-upload.html',
  styleUrl: './bulk-upload.scss'
})
export class BulkUpload {

  
  uploadForm: FormGroup;
  csvData: any[] = [];
  csvFile: File | null = null;
  bulkPdfPath = '';

  uploadStatus: { fileId: string, status: 'pending' | 'uploading' | 'success' | 'failed' }[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient,
   private  _downloadService: DownloadService
  ) {
    this.uploadForm = this.fb.group({
      bulkPdfPath: ['']
    });
  }

  onReset() {
throw new Error('Method not implemented.');
}
downloadCSV(): void {
  this._downloadService.downloadCSV().subscribe({
    next: (blob: Blob) => {
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'users.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error: (error) => {
      alert('Download failed: ' + error.message);
    }
  });
}


  onCsvChange(event: any) {
    this.csvFile = event.target.files[0];
   if (this.csvFile) {
  this.parseCsvFile(this.csvFile); // ✅ Only called if not null
}
  }

  parseCsvFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const lines = text.split('\n').filter(line => line.trim().length > 0);
      this.csvData = lines.slice(1).map(line => {
        const [sno, fileId, villageName] = line.split(',').map(v => v.trim());
        return { sno, fileId, villageName };
      });

      // Initialize status list
      this.uploadStatus = this.csvData.map(row => ({
        fileId: row.fileId,
        status: 'pending'
      }));
    };
    reader.readAsText(file);
  }

  async onSubmit() {
    this.bulkPdfPath = this.uploadForm.value.bulkPdfPath;

    for (let i = 0; i < this.csvData.length; i++) {
      const entry = this.csvData[i];
      this.uploadStatus[i].status = 'uploading';

      const pdfFile = await this.getPdfFile(entry.fileId);
      if (!pdfFile) {
        this.uploadStatus[i].status = 'failed';
        continue;
      }

      const formData = new FormData();
      formData.append('pdfFile', pdfFile);
      formData.append('sno', entry.sno);
      formData.append('fileId', entry.fileId);
      formData.append('villageName', entry.villageName);

      try {
        await this.http.post('http://localhost:8080/api/upload-single', formData).toPromise();
        this.uploadStatus[i].status = 'success';
      } catch (err) {
        this.uploadStatus[i].status = 'failed';
      }
    }

    alert('Upload finished!');
  }

  async getPdfFile(fileId: string): Promise<File | null> {
    try {
      const path = `${this.bulkPdfPath}/${fileId}.pdf`;
      const response = await fetch(path);
      const blob = await response.blob();
      return new File([blob], `${fileId}.pdf`, { type: 'application/pdf' });
    } catch {
      return null;
    }
  }

}
