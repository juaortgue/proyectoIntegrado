export class ExerciseCreateDto {
    name: string;
    categoryId: string;
    series: number;
    repetitions: number;
    finishTime: string;
    restTime: string;
    gif: string;
    description: string;
    constructor(name: string, categoryId: string, series: number, 
        repetitions: number, finishTime: string, restTime: string, gif: string, description: string) {
        this.name = name;
        this.categoryId= categoryId;
        this.series = series;
        this.repetitions = repetitions;
        this.finishTime = finishTime;
        this.restTime = restTime;
        this.gif = gif;
        this.description = description;
    }

   
}
            