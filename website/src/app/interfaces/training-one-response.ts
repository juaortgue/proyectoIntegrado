import { ExerciseResponse } from "./exercise-response";

export interface TrainingOneResponse {
    id: string;
    name: string;
    target: string;
    time: string;
    description: string;
    picture: string;
    exercises: ExerciseResponse[];
    
}
