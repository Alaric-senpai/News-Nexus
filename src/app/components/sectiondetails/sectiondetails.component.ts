import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RssService } from '../../services/rss.service';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sectiondetails',
  standalone: true,
  imports: [CommonModule,RouterModule, RouterOutlet],
  templateUrl: './sectiondetails.component.html',
  styleUrls: ['./sectiondetails.component.css']
})
export class SectiondetailsComponent implements OnInit, OnDestroy {
  section: string | null = null;
  sectiondata: any[] = [];
  error: string | null = null;

  constructor(private rssservice: RssService, private route: ActivatedRoute) {
    this.section = this.route.snapshot.paramMap.get('cat');
  }

  ngOnInit(): void {
    if (this.section) {
      this.getSectionData(this.section);
    } else {
      console.log('No section specified');
    }
  }

  ngOnDestroy(): void {}

  getSectionData(section: string): void {
    this.rssservice.getSectionData(section).subscribe(
      (data: string) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');

        if (xml.getElementsByTagName('parsererror').length) {
          console.error('Error parsing XML');
          this.error = 'Error parsing XML';
          return;
        }

        const items = xml.querySelectorAll('item');
        const result = Array.from(items).map(item => ({
          title: item.querySelector('title')?.textContent || 'No title',
          link: item.querySelector('link')?.textContent || 'No link',
          description: item.querySelector('description')?.textContent || 'No description',
          pubDate: item.querySelector('pubDate')?.textContent || 'No date'
        }));

        this.sectiondata = result;
        console.log('Parsed RSS Data:', this.sectiondata);
      },
      (error) => {
        this.error = 'Error fetching section data';
        console.error(error);
      }
    );
  }
}
