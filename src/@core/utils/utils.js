export const findDepartment = ( DepartmentsData, staffDepartmentId) => {
    for (const department of DepartmentsData) {
      if (department?.id === staffDepartmentId) {
        return department;
      }
    }

    return null; // Return null if the department is not found
  };

  export const findDeductionCategory = ( deductionscategoryArray, deductionId) => {
    for (const deduction of deductionscategoryArray) {
      if (deduction?.id === deductionId) {
        return deduction;
      }
    }

    return null; // Return null if the department is not found
  };