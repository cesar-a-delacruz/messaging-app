export const actions = {
  load: "LOAD",
  add: "ADD",
  select: "SELECT",
  changeSelected: "CHANGE_SELECTED",
  edit: "EDIT",
  remove: "REMOVE",
};

export function dispatcher(state, action) {
  const prev = state;

  switch (action.type) {
    case actions.load:
      const initial = {
        selected: {},
        ...action.payload.data,
      };

      initial.messages.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      return { ...initial };

    case actions.add:
      prev.messages = [...prev.messages, action.payload];
      return { ...prev };

    case actions.select:
      prev.selected = action.payload.selectedMessage;
      return { ...prev };

    case actions.changeSelected:
      prev.selected[action.payload.id] = action.payload.value;
      return { ...prev };

    case actions.edit:
      prev.messages = prev.messages.map((message) => {
        if (message.id === state.selected.id)
          message.content = state.selected.content;
        return message;
      });
      prev.selected = {};
      return { ...prev };

    case actions.remove:
      prev.messages = prev.messages.filter(
        (message) => message.id !== state.selected.id,
      );
      prev.selected = {};
      return { ...prev };
  }

  return state;
}
