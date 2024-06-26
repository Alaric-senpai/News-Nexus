import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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

  constructor(private router: Router, private topstories: TopstoriesService, private renderer: Renderer2) {}
  @ViewChild('menu') menu!: ElementRef;

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    // this.fetchHomeStories();
  }

  fetchHomeStories() {
    // this.topstories.getHomestories().subscribe(
    //   (data: any) => {
    //     this.stories = data.results;
    //     console.log(this.stories);
    //   },
    //   error => {
    //     this.error = error.message;
    //     console.error("error detected", error);
    //   }
    // );
    console.log("working");
  }
  showmenu(){
    // document.getElementById("menu").classList.toggle("shown");
    if(this.menu.nativeElement.classList.contains('shown')){
    this.renderer.removeClass(this.menu.nativeElement, 'shown');
  }else{
    this.renderer.addClass(this.menu.nativeElement, 'shown');
  
  }
}
}