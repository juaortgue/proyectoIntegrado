export class TrainingCreateDto {
    name: string;
    description: string;
    target: string;
    time: string;
    city: string;
    picture: string;
    exercises: string[];

    constructor(name: string, description:string, target:string, time:string, city:string, picture:string, exercises:string[]) {
        this.name = name;
        this.description = description;
        this.target = target;
        this.time=time;
        this.city=city;
        this.picture=picture;
        this.exercises=exercises;
    }
}
            