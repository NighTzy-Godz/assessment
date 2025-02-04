export default interface IUser {
  first_name: string;
  last_name: string;
  middle_name?: string;
  email: string;
  phone_number: string;
  profile_image: string;
}

export interface UserTokenEntity {
  _id: string;
  first_name: string;
}
