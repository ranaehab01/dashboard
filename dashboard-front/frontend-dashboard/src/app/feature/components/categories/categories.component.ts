import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  CategoriesService,
  Category,
} from '../../../shared/service/categories/categories.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  currentLanguage: 'en' | 'ar' = 'en';

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    // Clear old language data
    this.categories = [];

    this.categoriesService.getCategories(this.currentLanguage).subscribe({
      next: (response) => {
        this.categories = response.data;
      },
    });
  }

  changeLanguage(language: 'en' | 'ar'): void {
    if (this.currentLanguage === language) {
      return;
    }

    this.currentLanguage = language;
    this.loadCategories();
  }

  deleteCategory(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this category?');

    if (!confirmed) {
      return;
    }

    this.categoriesService.deleteCategory(id).subscribe({
      next: (response) => {
        this.categories = this.categories.filter(
          (category) => category.id !== id,
        );
      },
    });
  }
}
