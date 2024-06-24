import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NewswireService } from '../../services/newswire.service';
import { CommonModule } from '@angular/common';
import { Uipagination } from '../../interfaces/uipagination';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() pagesize = 10;

  displayedStories: any[] = [];
  error: string | null = null;
  totalrecords = 0;
  category: string = '';
  newsData: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newswire: NewswireService
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('cat') ?? 'all';

    if (this.category) {
      this.fetchCategoryData(this.category);
    } else {
      this.router.navigate(['home']);
    }
  }

  pagination: Uipagination = {
    page: 1,
    pagesize: this.pagesize,
    totalpages: 0
  };

  fetchCategoryData(category: string): void {
    this.newswire.getCategory(category).subscribe(
      (data: any) => {
        this.newsData = data.results;
        this.totalrecords = this.newsData.length;
        this.pagination.totalpages = Math.ceil(this.totalrecords / this.pagesize);

        console.log(this.newsData);
        this.updateDisplayedStories();
      },
      (error: any) => {
        this.error = error.message;
        console.error('Error fetching category data:', error);
      }
    );
  }

  updateDisplayedStories() {
    const startIndex = (this.pagination.page - 1) * this.pagesize;
    const endIndex = startIndex + this.pagesize;
    this.displayedStories = this.newsData.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.pagination.page < this.pagination.totalpages) {
      this.pagination.page++;
      this.updateDisplayedStories();
    }
  }

  prevPage() {
    if (this.pagination.page > 1) {
      this.pagination.page--;
      this.updateDisplayedStories();
    }
  }
}
