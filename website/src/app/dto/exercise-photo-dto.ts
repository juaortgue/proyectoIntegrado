export class ExercisePhotoDto {
    name: string;
    categoryId: string;
    series: number;
    repetitions: number;
    finishTime: string;
    restTime: string;
    description: string;
    constructor(name: string, categoryId: string, series: number, 
        repetitions: number, finishTime: string, restTime: string, description: string) {
        this.name = name;
        this.categoryId= categoryId;
        this.series = series;
        this.repetitions = repetitions;
        this.finishTime = finishTime;
        this.restTime = restTime;
        this.description = description;
    }

   
}
            