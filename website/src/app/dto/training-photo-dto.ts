export class TrainingPhotoCreateDto {
    name: string;
    description: string;
    target: string;
    time: string;
    city: string;
    exercises: string[];
    level: number;

    constructor(name: string, description:string, target:string, time:string, city:string,  exercises:string[], level: number) {
        this.name = name;
        this.description = description;
        this.target = target;
        this.time=time;
        this.city=city;
        this.exercises=exercises;
        this.level = level;
    }
}
            