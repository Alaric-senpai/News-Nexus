import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.css'
})
export class SectionsComponent {

  sections = [
    'Africa',
    'Americas',
    'ArtandDesign',
    'Arts',
    'AsiaPacific',
    'Automobiles',
    'Baseball',
    'Books/Review',
    'Business',
    'Climate',
    'CollegeBasketball',
    'CollegeFootball',
    'Dance',
    'Dealbook',
    'DiningandWine',
    'Economy',
    'Education',
    'EnergyEnvironment',
    'Europe',
    'FashionandStyle',
    'Golf',
    'Health',
    'Hockey',
    'HomePage',
    'Jobs',
    'Lens',
    'MediaandAdvertising',
    'MiddleEast',
    'MostEmailed',
    'MostShared',
    'MostViewed',
    'Movies',
    'Music',
    'NYRegion',
    'Obituaries',
    'PersonalTech',
    'Politics',
    'ProBasketball',
    'ProFootball',
    'RealEstate',
    'Science',
    'SmallBusiness',
    'Soccer',
    'Space',
    'Sports',
    'SundayBookReview',
    'Sunday-Review',
    'Technology',
    'Television',
    'Tennis',
    'Theater',
    'TMagazine',
    'Travel',
    'Upshot',
    'US',
    'Weddings',
    'Well',
    'World',
    'YourMoney'
]


}
