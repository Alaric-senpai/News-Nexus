import { Component, Input } from '@angular/core';
import { Uipagination } from '../../interfaces/uipagination';
import { ActivatedRoute, Router } from '@angular/router';
import { NewswireService } from '../../services/newswire.service';
import { Title } from '@angular/platform-browser';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.css'
})
export class RecentComponent {
  @Input() pagesize = 10;

  allStories: any[] = [];
  error: string | null = null;
  totalrecords = 0;
  // category: string = 'all';
  newsData: any[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newswire: NewswireService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    
        this.allpagination.page = 1;
        // this.updateTitle();
        this.fetchCategoryData();
        this.setupAutoReload();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  allpagination: Uipagination = {
    page: 1,
    pagesize: this.pagesize,
    totalpages: 0
  };

  fetchCategoryData(): void {
    this.newswire.getallnews().subscribe(
      (data: any) => {
        this.newsData = data.results;
        this.totalrecords = this.newsData.length;
        this.allpagination.totalpages = Math.ceil(this.totalrecords / this.pagesize);

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
    const startIndex = (this.allpagination.page - 1) * this.pagesize;
    const endIndex = startIndex + this.pagesize;
    this.allStories = this.newsData.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.allpagination.page < this.allpagination.totalpages) {
      this.allpagination.page++;
      this.updateDisplayedStories();
    }
  }

  prevPage() {
    if (this.allpagination.page > 1) {
      this.allpagination.page--;
      this.updateDisplayedStories();
    }
  }

  setupAutoReload() {
    this.subscriptions.add(
      interval(30000).subscribe(() => {
        // this.updateTitle();
        this.fetchCategoryData();
      })
    );
  }

  
}
