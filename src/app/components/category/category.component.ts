import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NewswireService } from '../../services/newswire.service';
import { CommonModule } from '@angular/common';
import { Uipagination } from '../../interfaces/uipagination';
import { Subscription, interval } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  @Input() pagesize = 10;

  displayedStories: any[] = [];
  error: string | null = null;
  totalrecords = 0;
  category: string = '';
  newsData: any[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newswire: NewswireService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        this.category = params.get('cat') ?? 'all';
        this.pagination.page = 1;
        this.updateTitle();
        this.fetchCategoryData();
        this.setupAutoReload();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  pagination: Uipagination = {
    page: 1,
    pagesize: this.pagesize,
    totalpages: 0
  };

  fetchCategoryData(): void {
    this.newswire.getCategory(this.category).subscribe(
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

  setupAutoReload() {
    this.subscriptions.add(
      interval(30000).subscribe(() => {
        this.updateTitle();
        this.fetchCategoryData();
      })
    );
  }

  updateTitle() {
    const newTitle = `Category: ${this.category.charAt(0).toUpperCase() + this.category.slice(1)}`;
    this.titleService.setTitle(newTitle);
  }
}
