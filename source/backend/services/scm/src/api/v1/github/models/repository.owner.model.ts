export class RepositoryOwner {

  id: number;
  username: string;

  avatarUrl: string;
  profileUrl: string;

  type: string;

  static createFromResponse(data: any) {
    const owner = new RepositoryOwner();
    owner.id = data.id;
    owner.username = data.login;
    owner.avatarUrl = data.avatar_url;
    owner.profileUrl = data.url;
    owner.type = data.type;

    return owner;
  }

}
