export const processStudent = (student) => ({
  ...student,
  level: parseInt(student.level ?? 0, 10),
  experiencePoints: parseInt(student.experiencePoints ?? 0, 10),
  videoSubmissionCount: parseInt(student.videoSubmissionCount ?? 0, 10),
  videoPercentWatched: parseFloat(student.videoPercentWatched ?? 0),
});

export const processStaff = (staff) => ({
  ...staff,
  numGraded: parseInt(staff.numGraded ?? 0, 10),
  numStudents: parseInt(staff.numStudents ?? 0, 10),
});
