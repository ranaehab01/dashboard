import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../../shared/service/categories/categories.service';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss',
})
export class EditCategoryComponent implements OnInit {
  categoryId!: number;
  errorMessage = '';
  category = {
    category: {
      ar: '',
      en: '',
    },

    description: {
      ar: '',
      en: '',
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Invalid category ID';
      return;
    }

    this.categoryId = Number(id);
    this.loadCategory();
  }

  loadCategory(): void {
    this.categoriesService.getCategory(this.categoryId).subscribe({
      next: (response) => {
        const data = response.data;

        this.category = {
          category: {
            ar: data.name?.ar ?? '',
            en: data.name?.en ?? '',
          },

          description: {
            ar: data.description?.ar ?? '',
            en: data.description?.en ?? '',
          },
        };
      },
    });
  }

  updateCategory(): void {
    const updateData = {
      name: {
        en: this.category.category.en,
        ar: this.category.category.ar,
      },

      description: {
        en: this.category.description.en,
        ar: this.category.description.ar,
      },
    };

    this.categoriesService
      .updateCategory(this.categoryId, updateData)
      .subscribe({
        next: (response) => {
          setTimeout(() => {
            this.router.navigate(['/categories']);
          }, 1000);
        },
      });
  }
}
