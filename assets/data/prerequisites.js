export const prerequisites = [
  { subject_id: 8, required_subject_id: 4 }, // IPG202 requires IPG101
  { subject_id: 9, required_subject_id: 1 }, // INT101 requires GBS101
  { subject_id: 10, required_subject_id: 1 }, // IOS101 requires GBS101
  { subject_id: 12, required_subject_id: 5 }, // IIS201 requires IIS101
  { subject_id: 13, required_subject_id: 7 }, // Eng2 requires Eng1
  
  // IWB201 requires IWB101 AND IIS101
  { subject_id: 15, required_subject_id: 6 },
  { subject_id: 15, required_subject_id: 5 },
  
  // IOS201 requires IOS101 AND INT101
  { subject_id: 16, required_subject_id: 10 },
  { subject_id: 16, required_subject_id: 9 },
  
  { subject_id: 17, required_subject_id: 4 }, // IPG201 requires IPG101
  { subject_id: 18, required_subject_id: 4 }, // IPG203 requires IPG101
  { subject_id: 19, required_subject_id: 5 }, // IIS202 requires IIS101
  { subject_id: 20, required_subject_id: 13 }, // Eng3 requires Eng2
  
  // IOS202 requires IOS101 AND INT101 AND ENG3
  { subject_id: 21, required_subject_id: 10 },
  { subject_id: 21, required_subject_id: 9 },
  { subject_id: 21, required_subject_id: 20 },
  
  // IOS203 requires IOS101 AND INT101 AND ENG3
  { subject_id: 22, required_subject_id: 10 },
  { subject_id: 22, required_subject_id: 9 },
  { subject_id: 22, required_subject_id: 20 },
  
  // IIS303 requires IIS201 AND IIS202 AND ENG3
  { subject_id: 23, required_subject_id: 12 },
  { subject_id: 23, required_subject_id: 19 },
  { subject_id: 23, required_subject_id: 20 },
  
  // IIS203 requires IIS201 AND IIS202 AND ENG3
  { subject_id: 24, required_subject_id: 12 },
  { subject_id: 24, required_subject_id: 19 },
  { subject_id: 24, required_subject_id: 20 },
  
  { subject_id: 25, required_subject_id: 15 }, // IPG204 requires IWB201
  
  // IPI201 requires ENG3 AND IIS201 AND IWB201
  { subject_id: 26, required_subject_id: 20 },
  { subject_id: 26, required_subject_id: 12 },
  { subject_id: 26, required_subject_id: 15 }
];