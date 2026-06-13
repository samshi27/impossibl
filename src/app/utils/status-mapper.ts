import { PostStatus } from '../constants/post-status';

export function fromApiStatus(apiStatus: string): PostStatus {
  return apiStatus.toLowerCase() as PostStatus;
}

export function toApiStatus(status: PostStatus): string {
  return status.toUpperCase();
}
