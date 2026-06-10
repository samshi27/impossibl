import { Component, input } from '@angular/core';
import { Post } from '../../models/post';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Tags } from '../tags/tags';
import { readTime } from '../../utils/read-time';
import { CardVariant } from '../../constants/card_variant';

@Component({
  selector: 'app-post-card',
  imports: [DatePipe, RouterLink, Tags],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
})
export class PostCard {
  post = input<Post>();
  featured = input<boolean>(false);
  variant = input<CardVariant>('blue');
  readTime = readTime;
}
