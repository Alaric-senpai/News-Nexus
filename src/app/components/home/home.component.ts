import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TopstoriesService } from '../../services/topstories.service';
import { CommonModule } from '@angular/common';
import 'boxicons'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  stories: any[] = [];
  error: string | null = null;

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
        console.log(this.stories);
      },
      error => {
        this.error = error.message;
        console.error("error detected", error);
      }
    );
  }
}
