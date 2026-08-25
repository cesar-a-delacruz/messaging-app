export const actions = {
  load: "LOAD",
  add: "ADD",
  fetch: "FETCH",
  select: "SELECT",
  changeSelected: "CHANGE_SELECTED",
  edit: "EDIT",
  remove: "REMOVE",
};

export function dispatcher(state, action) {
  const prev = state;

  switch (action.type) {
    case actions.load:
      if (action.payload.error) return { ...action.payload };

      const initial = {
        selected: {},
        page: 1,
        ...action.payload,
      };

      initial.messages.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      return { ...initial };

    case actions.add:
      prev.messages = [...prev.messages, action.payload.data];
      return { ...prev };

    case actions.fetch:
      if (action.payload.error) {
        prev.page = 0;
        return { ...prev };
      }
      const newMessages = action.payload.messages;
      newMessages.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      prev.messages = [...newMessages, ...prev.messages];
      prev.page++;
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
