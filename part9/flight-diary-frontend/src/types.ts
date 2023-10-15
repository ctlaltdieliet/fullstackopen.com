export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}
export type AddedDiaryEntry = {
  date: string;
  weather: string;
  visibility: string;
}


export type NonSensitiveDiaryEntry = Omit<NewDiaryEntry, 'comment'>;
export interface NonSensitiveDiaryArray {
  flights: NonSensitiveDiaryEntry[]
}
