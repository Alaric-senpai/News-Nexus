import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Renderer2, HostListener } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TopstoriesService } from '../../services/topstories.service';
import { CommonModule } from '@angular/common';
import 'boxicons'
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [CommonModule, RouterModule, RouterOutlet, FooterComponent]
})
export class HomeComponent implements OnInit, AfterViewInit {

  stories: any[] = [];
  error: string | null = null;

  @ViewChild('menu') menu!: ElementRef;

  constructor(
    private router: Router, 
    private topstories: TopstoriesService, 
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.fetchHomeStories();
  }

  ngAfterViewInit() {
    this.checkMenuPosition();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkMenuPosition();
  }

  private checkMenuPosition() {
    if (this.menu && this.menu.nativeElement) {
      const menuRect = this.menu.nativeElement.getBoundingClientRect();
      if (menuRect.top <= 0) {
        this.renderer.addClass(this.menu.nativeElement, 'sticky-shadow');
      } else {
        this.renderer.removeClass(this.menu.nativeElement, 'sticky-shadow');
      }
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  fetchHomeStories() {
    console.log("working");
  }

  showmenu() {
    if (this.menu.nativeElement.classList.contains('shown')) {
      this.renderer.removeClass(this.menu.nativeElement, 'shown');
    } else {
      this.renderer.addClass(this.menu.nativeElement, 'shown');
    }
  }
}