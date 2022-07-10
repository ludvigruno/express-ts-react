export default class UserAuthDto {
  id: string;
  email: string;
  isVerified: boolean;
  verifiedLink: string;

  constructor(model: any) {
    this.id = model._id;
    this.email = model.email;
    this.isVerified = model.isVerified;
    this.verifiedLink = model.verifiedLink;
  }
}
