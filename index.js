// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  // function getLearnerData(course, ag, submissions) {
  //   // here, we would process this data to achieve the desired result.
  //     const result = [];
  //     const Learners = {};

  //     // const totalPointObj = {};

  //     // if(ag.course_id === course.id) {
  //     //   ag.assignments.forEach(assignment => {
  //     //     const assignmentId = assignment.id;
  //     //     totalPointObj[assignmentId] = assignment.points_possible;
  //     //   })
  //     // }
  //     const assignmentSubmissions = {};
  //     ag.assignments.forEach(assignment => {
  //       assignmentSubmissions[assignment.id] = [];
  //     });
  //     submissions.forEach(learnData => {
  //       const assignmentId = learnData.assignment_id;
  //       if (assignmentSubmissions.hasOwnProperty(assignmentId)) {
  //         assignmentSubmissions[assignmentId].push(learnData.learner_id);
  //       }
  //     });
      

  //     submissions.forEach(learnData => {
  //       const learnerId = learnData.learner_id;
  //       const assignmentId = learnData.assignment_id;

  //       if(!Learners[learnerId]) {
  //         Learners[learnerId] = {
            
  //           totalScore: 0,
  //           totalCount: 0,
  //           totalPoints: 0,
  //           // scorePoint: 0,
  //           assignments: {}
  //         };
  //       }
  //       const assignInfo = ag.assignments.find(a => a.id === assignmentId);
  //       let score = learnData.submission.score;
  //       const submittedDate = new Date(learnData.submission.submitted_at);
  //       const dueDate = new Date(assignInfo.due_at);
  //       if(submittedDate > dueDate) {
  //         score -= 15;
  //       }
  //       if (assignmentSubmissions[assignmentId].includes(learnerId)) {
  //         // const scorePoint = score/totalPointObj[assignmentId];
  //         // Learners[learnerId].totalScore += score;
  //         // Learners[learnerId].totalCount += 1;
  //         // Learners[learnerId].totalPoints += totalPointObj[assignmentId];
  //         // Learners[learnerId].assignments[assignmentId] = scorePoint;
  //         Learners[learnerId].totalScore += score;
  //         Learners[learnerId].totalPoints += assignInfo.points_possible;
  //         Learners[learnerId].assignments[assignmentId] = score / assignInfo.points_possible;
  //       }
  //     })

  //     //数组才能用forEach, 遍历object 用 for...in 或者Object.keys(Learners).forEach()

  //     for(let learnerId in Learners) {
  //       const learner = Learners[learnerId];
  //       const agv = learner.totalScore/learner.totalPoints;
  //       const resultItem = {
  //         id: learnerId,
  //         agv: agv,
  //         // assignments: learner.assignments
  //       };
  //       Object.keys(learner.assignments).forEach(assignmentId => {
  //         resultItem[assignmentId] = learner.assignments[assignmentId];
  //       });
  //       result.push(resultItem);
        
  //     }

  //     return result;


  //   // const result = [
  //   //   {
  //   //     id: 125,
  //   //     avg: 0.985, // (47 + 150) / (50 + 150)
  //   //     1: 0.94, // 47 / 50
  //   //     2: 1.0 // 150 / 150
  //   //   },
  //   //   {
  //   //     id: 132,
  //   //     avg: 0.82, // (39 + 125) / (50 + 150)
  //   //     1: 0.78, // 39 / 50
  //   //     2: 0.833 // late: (140 - 15) / 150
  //   //   }
  //   // ];
  
  // }

  function getLearnerData(course, assignmentGroup, submissions) {
    // Extract the common assignments
    const assignments = assignmentGroup.assignments;
    
    // Get the list of unique learner IDs
    const learnerIds = [];
    submissions.forEach(submission => {
    if (!learnerIds.includes(submission.learner_id)) {
        learnerIds.push(submission.learner_id);
    }
    });
  
    // Find the assignments that are common among all learners
    const commonAssignments = assignments.filter(assignment => {
        // Initialize a Boolean variable to indicate whether the current assignment has been submitted by all learners
        let allSubmitted = true;
      
        // Iterate each learner
        learnerIds.forEach(learner_id => {
          // Check whether the current learner has submitted the current assignment
          const submitted = submissions.some(submission => submission.assignment_id === assignment.id && submission.learner_id === learner_id);
          
          // If the current learner has not submitted the current assignment, set allSubmitted to false
          if (!submitted) {
            allSubmitted = false;
          }
        });
      
        // Returns a Boolean value indicating whether the current assignment has been submitted by all learners.
        return allSubmitted;
      });
  
    // Extract the common assignment IDs
    const commonAssignmentIds = commonAssignments.map(a => a.id);
  
    // Calculate the results for each learner
    const results = learnerIds.map(learnerId=> {
      const learnerSubmissions = submissions.filter(s => s.learner_id === learnerId);
      
      let totalScore = 0;
      let totalPossible = 0;
      const result = {
        id: learnerId
      };
  
      commonAssignmentIds.forEach(id => {
        const submission = learnerSubmissions.find(s => s.assignment_id === id);
        const assignment = assignments.find(a => a.id === id);
        if (submission) {
          const score = submission.submission.score;
          const possible = assignment.points_possible;
  
          // Calculate score considering late submissions
          if (new Date(submission.submission.submitted_at) > new Date(assignment.due_at)) {
            const adjustedScore = (score - 15) > 0 ? (score - 15) : 0;
            result[id] = adjustedScore / possible;
            totalScore += adjustedScore;
          } else {
            result[id] = score / possible;
            totalScore += score;
          }
          totalPossible += possible;
        }
      });
  
      result.avg = totalScore / totalPossible;
  
      return result;
    });
    
    
    return results;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);
  
  