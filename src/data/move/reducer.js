import initialState from "initialState";

import { populateCarpool } from "data/solutions/utils";

const populateSelectedSolution = selectedSolution => solution => ({
  ...solution,
  selected: selectedSolution && solution.hash === selectedSolution.hash
});

export default function moveReducer(state = initialState.move, action) {
  switch (action.type) {
    case "MOVE_GET_DETAILS_PENDING":
      return {
        ...state,
        value: null,
        loading: true,
        solutions: null,
        error: null
      };

    case "MOVE_SELECT_SOLUTION_FULFILLED":
    case "MOVE_UNSELECT_SOLUTION_FULFILLED":
    case "MOVE_GET_DETAILS_FULFILLED":
      const move = action.payload.data;
      const selectedSolution = move.selected_solution;
      const driveSolution = move.drive_solution;
      return {
        ...state,
        value: {
          ...move,
          selected_solution:
            selectedSolution &&
            populateCarpool({
              ...selectedSolution,
              selected: true
            }),
          drive_solution:
            driveSolution &&
            populateCarpool({
              ...driveSolution,
              defaultDrive: true
            })
        },
        solutions:
          state.solutions &&
          state.solutions.map(populateSelectedSolution(selectedSolution)),
        loading: false
      };

    case "MOVE_GET_DETAILS_REJECTED":
    case "MOVE_DELETE_ONE_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case "MOVE_GET_SOLUTIONS_PENDING":
      return {
        ...state,
        solutions: [],
        solutionsLoading: true,
        solutionsError: null
      };

    case "MOVE_GET_SOLUTIONS_FULFILLED":
      return state.value
        ? {
            ...state,
            solutions: action.payload.data
              .map(populateCarpool)
              .map(populateSelectedSolution(state.value.selected_solution)),
            solutionsLoading: false
          }
        : { ...state };

    case "MOVE_GET_SOLUTIONS_REJECTED":
      return {
        ...state,
        solutionsLoading: false,
        solutionsError: action.payload
      };

    case "MOVE_DELETE_ONE_PENDING":
      return {
        ...state,
        loading: true
      };

    case "MOVE_DELETE_ONE_FULFILLED":
      return {
        ...initialState.move,
        loading: false
      };

    default:
      return state;
  }
}
