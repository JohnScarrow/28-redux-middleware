let validateCategory = (category) => {
  if (!category.id || !category.title || !category.timestamp) {
    throw new Error('VALIDATION ERROR: category must include id, title, and timestamp');
  }
}

let validateExpense = (expense) => {
  if (!expense.id || !expense.content || !expense.categoryID) {
    throw new Error('VALIDATION ERROR: expense must include id, content, and category id');
  }
}

let initialState = {};

export default (state=initialState, action) => {
  let {type, payload} = action;
  let categoryID, categoryExpenses;

  switch(type) {
    case 'CATEGORY_CREATE':
      validateCategory(payload);
      return {...state, [payload.id] : []};
    case 'CATEGORY_DELETE':
      validateCategory(payload);
      return {...state, [payload.id]: undefined};
    case 'CARD_CREATE':
      validateExpense(payload);
      categoryID = payload.categoryID;
      categoryExpenses = state[categoryID];
      return {...state, [categoryID]: [...categoryExpenses, payload]};
    case 'CARD_UPDATE':
      validateExpense(payload);
      categoryID = payload.categoryID;
      categoryExpenses = state[categoryID];

      return {
        ...state,
        [categoryID]: categoryExpenses.map(expense => {
          return expense.id === payload.id ? payload : expense;
        })
      }
    case 'CARD_DELETE':
      validateExpense(payload);
      categoryID = payload.categoryID;
      categoryExpenses = state[categoryID];

      return {
        ...state,
        [categoryID]: categoryExpenses.filter(expense => {
          return expense.id !== payload.id
        })
      }
    default:
      return state;
  }
}
