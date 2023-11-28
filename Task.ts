class Exercise {
  id: number;
  title: string;
  createdAt: Date;
  createdBy: number;
  workoutId: number;
  exerciseTypes: r_ExerciseType[];
  exerciseFocuses: r_ExerciseFocus[];
  equipment: r_Equipment[];
}

class r_ExerciseType {
  exerciseId: number;
  typeId: number;
  order: number;
}

class r_ExerciseFocus {
  exerciseId: number;
  focusId: number;
  order: number;
}

class r_Equipment {
  exerciseId: number;
  equipmentId: number;
  order: number;
}

class ExerciseType {
  id: number;
  title: string;
}

class ExerciseFocus {
  id: number;
  title: string;
}

class Equipment {
  id: number;
  title: string;
}

// Data
const exercises: Exercise[] = [];
const exerciseTypes: ExerciseType[] = [];
const r_exerciseTypes: r_ExerciseType[] = [];
const exerciseFocuses: ExerciseFocus[] = [];
const r_exerciseFocuses: r_ExerciseFocus[] = [];
const equipments: Equipment[] = [];
const r_equipments: r_Equipment[] = [];

// Script
const yearlyStatistics: {
  [year: number]: { totalExercises: number; coreStrengthNoEquipment: number };
} = {};

exercises.forEach((exercise) => {
  const year = new Date(exercise.createdAt).getFullYear();
  if (year >= new Date().getFullYear() - 10) {
    yearlyStatistics[year] = yearlyStatistics[year] || {
      totalExercises: 0,
      coreStrengthNoEquipment: 0,
    };
    yearlyStatistics[year].totalExercises++;
    if (
      IsStrengthExercise(exercise) &&
      IsCoreExercise(exercise) &&
      ExerciseUsesNoEquipment(exercise)
    )
      yearlyStatistics[year].coreStrengthNoEquipment++;
  }
});

console.log(
  "Percentage of exercises which are core strength exercises using no equipment"
);
for (const year in yearlyStatistics) {
  const stats = yearlyStatistics[year];
  const percentage =
    (stats.coreStrengthNoEquipment / stats.totalExercises) * 100;
  console.log(`${year}: ${percentage.toFixed(2)}%`);
}

// Funcs
function IsStrengthExercise(exercise: Exercise): boolean {
  const r_exerciseType = r_exerciseTypes.find(
    (type) => type.exerciseId === exercise.id
  );
  return r_exerciseType !== undefined && r_exerciseType.typeId === 1;
}

function IsCoreExercise(exercise: Exercise): boolean {
  const r_exerciseFocus = r_exerciseFocuses.find(
    (focus) => focus.exerciseId === exercise.id
  );
  return r_exerciseFocus !== undefined && r_exerciseFocus.focusId === 4;
}

function ExerciseUsesNoEquipment(exercise: Exercise): boolean {
  const r_equipment = r_equipments.find(
    (equipment) => equipment.exerciseId === exercise.id
  );
  if (r_equipment === undefined) return true;
  return IsNoEquipment(r_equipment);
}

function IsNoEquipment(r_equipment: r_Equipment): boolean {
  const noEquipment = equipments.find(
    (equipment) => equipment.title === "No equipment"
  );
  return noEquipment?.id === r_equipment.equipmentId;
}
