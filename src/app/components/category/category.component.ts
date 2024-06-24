import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{

  storyuri: string| null = null;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
      this.storyuri = this.route.snapshot.params['get'](['id']);
  }
}
