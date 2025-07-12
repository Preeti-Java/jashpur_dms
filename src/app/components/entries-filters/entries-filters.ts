import { ChangeDetectionStrategy,Component, ViewChild, ɵComponentFactory } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserManagerService } from '../../services/user-manager-service';
import { Village } from '../../modals/Village';
import { FileData } from '../../modals/FileData';
import { File } from '../../services/file';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';



@Component({
  selector: 'app-entries-filters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule
  ],
  templateUrl: './entries-filters.html',
  styleUrl: './entries-filters.scss'
})
export class EntriesFilters {

  filterForm: FormGroup;
  showTable = false;

  districts = ['Jashpur'];
  fileData: FileData[]= [];
  
  //dataSource: any[] = [];
  dataSource!: MatTableDataSource<FileData>;
  
 private _villages: Village[] = [];

  public get villages(): Village[] {
    return this._villages;
  }
  public set villages(value: Village[]) {
    this._villages = value;
  }
 
   @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator;

  displayedColumns: string[] = [
    'district',
    'fileId',
    'tehsil',
    'tehsilHindi',
    'village',
    'villageHindiName',
    'villageCode',
    'khasraNo',
    'year',
    'totalPage',
    'action'
  ];

  constructor(
    private fb: FormBuilder,
  private _userManagerService: UserManagerService,
  private _fileService : File,
  private _snackBar : MatSnackBar
) {
    this.filterForm = this.fb.group({
      district: [''],
      village: [''],
      khasraNo: ['']
     
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

 ngOnInit(): void {
    this.allVillageName();
  }
  
  reset(){
    this.filterForm.reset();
  }

  onSubmit() : void {
const { district, village, khasraNo } = this.filterForm.value;

if(district == "" && village == "" && khasraNo == "")
  this._snackBar.open('Please select from dropdown' , 'close',{
             horizontalPosition: 'center',
             verticalPosition: 'top',
          });
else
  this._fileService.getAllFileDataByDistrictVillageKhasraNo(district, village, khasraNo).subscribe({
      next: (response: FileData[]) => {
            // fill the table
            this.fileData = response;
            this.showTable = true;          // show only when data is ready
            console.log("Sucess handler JSON response " + JSON.stringify(response));
          },
          error: (err: any) => {
          this._snackBar.open('Something wrong ! Try again.' + err, 'close',{
             horizontalPosition: 'center',
             verticalPosition: 'top',
          });
          }
    });
 
  }
 

allVillageName(): void {
   this._userManagerService.loadVillageList().subscribe({
    next: (response: any) => {
      this.villages = response;
    },
    error: (error) => {
      alert(error);
    }
  });
 
}

}


