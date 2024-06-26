import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TopstoriesService } from '../../services/topstories.service';
import { CommonModule } from '@angular/common';
import { Uipagination } from '../../interfaces/uipagination';
import { RecentComponent } from '../recent/recent.component';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, RecentComponent],
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
  @Input() pagesize = 1;
  stories: any[] = [];
  displayedStories: any[] = [];
  error: string | null = null;
  totalrecords = 0;

  pagination: Uipagination = {
    page: 1,
    pagesize: this.pagesize,
    totalpages: 0
  };

  constructor(private router: Router, private topstories: TopstoriesService) {}

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    this.fetchHomeStories();
  }

  fetchHomeStories() {
    this.topstories.getHomestories().subscribe(
      (data: any) => {
        this.stories = data.results;
        this.totalrecords = this.stories.length;
        this.pagination.totalpages = Math.ceil(this.totalrecords / this.pagesize);
        this.updateDisplayedStories();
        // console.log(this.stories);
      },
      error => {
        this.error = error.message;
        console.error("error detected", error);
      }
    );
  }

  updateDisplayedStories() {
    const startIndex = (this.pagination.page - 1) * this.pagesize;
    const endIndex = startIndex + this.pagesize;
    this.displayedStories = this.stories.slice(startIndex, endIndex);
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
