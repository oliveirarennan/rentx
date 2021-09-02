export default interface ICreateRentalDto {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
  id?: string;
  end_date?: Date;
  total?: number;
}
