// eslint-disable-next-line import/prefer-default-export
export const processSubmission = (submission) => {
  const grade =
    submission.grade != null && typeof submission.grade === 'string'
      ? parseFloat(submission.grade)
      : submission.grade;
  const submittedAt =
    submission.submittedAt != null
      ? new Date(submission.submittedAt)
      : submission.submittedAt;
  const endAt =
    submission.endAt != null ? new Date(submission.endAt) : submission.endAt;
  const dayDifference =
    submittedAt != null && endAt != null
      ? Math.floor((submittedAt - endAt) / 86400000)
      : null;

  return {
    ...submission,
    grade,
    submittedAt,
    endAt,
    dayDifference,
  };
};
