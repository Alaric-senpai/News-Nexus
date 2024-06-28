import { Component, OnDestroy, OnInit } from '@angular/core';
import { RssService } from '../../services/rss.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sectiondetails',
  templateUrl: './sectiondetails.component.html',
  styleUrls: ['./sectiondetails.component.css']
})
export class SectiondetailsComponent implements OnInit, OnDestroy {
  section: string | null = null;
  sectiondata: any;
  error: string | null = null;

  constructor(private rssservice: RssService, private route: ActivatedRoute) {
    this.section = this.route.snapshot.paramMap.get('cat');
  }

  ngOnInit(): void {
    if (this.section) {
      this.getSectionData(this.section);
    } else {
      console.log("no section specified");
    }
  }

  ngOnDestroy(): void { }

  getSectionData(section: string): void {
    this.rssservice.getSectionData(section).subscribe(
      (data: string) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        const items = xml.querySelectorAll('item');
        const result = Array.from(items).map(item => ({
          title: item.querySelector('title')?.textContent,
          link: item.querySelector('link')?.textContent,
          description: item.querySelector('description')?.textContent
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
