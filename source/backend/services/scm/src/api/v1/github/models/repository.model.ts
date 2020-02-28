import { RepositoryOwner } from './repository.owner.model';

export class Repository {

  id: number;
  name: string;
  fullname: string;
  description: string;
  language: string;
  defaultBranch: string;
  url: string;

  owner: RepositoryOwner;

  isFork: boolean;
  isPrivate: boolean;
  isArchived: boolean;
  isDisabled: boolean;

  starsCount: number;
  forksCount: number;
  watchersCount: number;

  openIssuesCount: number;

  createdAt: Date;
  lastUpdateAt: Date;

  static createFromResponse(data: any) {
    const owner: RepositoryOwner = RepositoryOwner.createFromResponse(data.owner);
    const repository: Repository = new Repository();

    repository.id = data.id;
    repository.name = data.name;
    repository.fullname = data.fullname;
    repository.description = data.description;
    repository.language = data.language;
    repository.defaultBranch = data.default_branch;
    repository.url = data.url;

    repository.owner = owner;

    repository.isFork = data.fork;
    repository.isPrivate = data.private;
    repository.isArchived = data.archived;
    repository.isDisabled = data.disabled;

    repository.starsCount = data.stargazers_count;
    repository.forksCount = data.forks_count;
    repository.watchersCount = data.watchers_count;

    repository.openIssuesCount = data.open_issues_count;

    repository.createdAt = data.created_at;
    repository.lastUpdateAt = data.updated_at;

    return repository;
  }

}
