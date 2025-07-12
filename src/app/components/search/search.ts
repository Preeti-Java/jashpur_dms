import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { EntriesFilters } from "../entries-filters/entries-filters";
import { AllDocuments } from "../all-documents/all-documents";

@Component({
  selector: 'app-search',
  imports: [MatTabsModule, MatIconModule, EntriesFilters, AllDocuments],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {

}
