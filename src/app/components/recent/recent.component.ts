import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Uipagination } from '../../interfaces/uipagination';
import { ActivatedRoute, Router } from '@angular/router';
import { NewswireService } from '../../services/newswire.service';
import { DateService } from '../../services/date.service';
import { Title } from '@angular/platform-browser';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit, OnDestroy {
  @Input() pagesize = 10;

  allStories: any[] = [];
  error: string | null = null;
  totalrecords = 0;
  newsData: any[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newswire: NewswireService,
    private dateService: DateService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.allpagination.page = 1;
    this.fetchCategoryData();
    this.setupAutoReload();
    this.setupTimeDifferenceUpdate();
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
        this.fetchCategoryData();
      })
    );
  }

  setupTimeDifferenceUpdate() {
    this.subscriptions.add(
      interval(60000).subscribe(() => {
        this.updateDisplayedStories();
      })
    );
  }

  getTimeDifference(date: string) {
    return this.dateService.convertDate(date);
  }
}
