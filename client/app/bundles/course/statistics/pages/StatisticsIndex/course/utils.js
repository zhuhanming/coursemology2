export function computeStudentData(assessments, submissions, showPhantoms) {
  assessments.sort((a, b) => a.endAt - b.endAt);
  const assessmentIdToIndexMap = new Map(
    assessments.map((a, id) => [a.id, id]),
  );
  const studentData = submissions
    .filter((s) => (showPhantoms ? true : !s.isPhantom))
    .map((s) => {
      const orderedSubmissions = s.submissions
        .map((s2) => ({
          ...s2,
          key: assessmentIdToIndexMap.get(s2.assessmentId),
        }))
        .sort((a, b) => a.key - b.key);
      const indexToSubmissionMap = new Map(
        orderedSubmissions.map((s3) => [s3.key, s3]),
      );
      const total = orderedSubmissions.length;
      const result = [];
      let added = 0;
      for (let i = 0; i < assessments.length; i += 1) {
        if (added === total) {
          break;
        }
        if (indexToSubmissionMap.has(i)) {
          added += 1;
          result.push(indexToSubmissionMap.get(i));
        } else {
          result.push(null);
        }
      }
      return { ...s, submissions: result };
    });
  return studentData.filter((s) => s.submissions.length > 0);
}

export const titleRenderer = (items) =>
  `${items[0].raw.title} (${items.length})`;

export const labelRenderer = (items) => {
  if (items.raw.name) {
    return `${items.raw.name}: ${items.label}`;
  }
  return `Deadline: ${items.label}`;
};

export const footerRenderer = (items) => {
  if (items.length === 1) {
    return `Click to view ${items[0].raw.name}'s submissions`;
  }
  return undefined;
};
