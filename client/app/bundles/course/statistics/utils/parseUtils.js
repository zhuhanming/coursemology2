export const processStudent = (student) => ({
  ...student,
  level: parseInt(student.level ?? 0, 10),
  experiencePoints: parseInt(student.experiencePoints ?? 0, 10),
});

export const processStaff = (staff) => ({
  ...staff,
  numGraded: parseInt(staff.numGraded ?? 0, 10),
  numStudents: parseInt(staff.numStudents ?? 0, 10),
});

export const processAssessment = (assessment) => ({
  ...assessment,
  id: parseInt(assessment.id, 10),
  startAt: new Date(assessment.startAt),
  endAt: assessment.endAt ? new Date(assessment.endAt) : assessment.endAt,
});

export const processSubmissions = (submission) => ({
  ...submission,
  id: parseInt(submission.id, 10),
  submissions: submission.submissions.map((s) => ({
    assessmentId: parseInt(s.assessmentId, 10),
    submittedAt: new Date(s.submittedAt),
  })),
});

export const processStudentCourseStatistics = (student) => ({
  ...student,
  id: parseInt(student.id, 10),
  learningRate:
    student.learningRate != null
      ? Math.round(10000 / parseFloat(student.learningRate)) / 100
      : null,
  numSubmissions:
    student.numSubmissions != null ? parseInt(student.numSubmissions, 10) : 0,
  correctness:
    student.correctness != null ? parseFloat(student.correctness) * 100 : null,
  videoSubmissionCount: parseInt(student.videoSubmissionCount ?? 0, 10),
  videoPercentWatched: parseFloat(student.videoPercentWatched ?? 0),
});
