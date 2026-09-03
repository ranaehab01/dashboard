import { Component } from '@angular/core';
import { CategoriesService } from '../../../shared/service/categories/categories.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent {
  newCategory = {
    name: {
      en: '',
      ar: '',
    },
    description: {
      en: '',
      ar: '',
    },
  };

  constructor(private categoriesService: CategoriesService) {}

  addCategory(): void {
    this.categoriesService.addCategory(this.newCategory).subscribe({
      next: (response) => {
        console.log('Category added:', response);

        // Clear form
        this.newCategory = {
          name: {
            en: '',
            ar: '',
          },
          description: {
            en: '',
            ar: '',
          },
        };
      },

      error: (error) => {
        console.error('Add category error:', error);
      },
    });
  }
}
