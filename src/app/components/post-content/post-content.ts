import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { Tags } from '../tags/tags';
import { readTime } from '../../utils/read-time';
import { PostContentView } from '../../models/post-content-view';

@Component({
  selector: 'app-post-content',
  imports: [DatePipe, MarkdownComponent, Tags],
  templateUrl: './post-content.html',
  styleUrl: './post-content.scss',
})
export class PostContent {
  readonly categoryBaseRoute = input<string>();
  post = input.required<PostContentView>();
  protected readTime = readTime;
}
