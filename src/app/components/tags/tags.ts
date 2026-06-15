import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tags',
  imports: [RouterLink],
  templateUrl: './tags.html',
  styleUrl: './tags.scss',
})
export class Tags {
  readonly tags = input<string[]>([]);
  readonly categoryBaseRoute = input<string>();
}
