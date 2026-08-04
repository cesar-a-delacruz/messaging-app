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
      const initial = { ...action.payload.response };
      console.log(initial);
      if (initial.error) {
        initial.data = {
          selected: {},
          messages: [],
          chatId: "",
        };
        return initial;
      }

      initial.data.messages.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      return { ...initial };

    case actions.add:
      prev.data.messages = [...prev.data.messages, action.payload.data];
      return { ...prev };

    case actions.select:
      prev.data.selected = action.payload.selectedMessage;
      return { ...prev };

    case actions.changeSelected:
      prev.data.selected[action.payload.id] = action.payload.value;
      return { ...prev };

    case actions.edit:
      prev.data.messages = prev.data.messages.map((message) => {
        if (message.id === state.data.selected.id)
          message.content = state.data.selected.content;
        return message;
      });
      prev.data.selected = {};
      return { ...prev };

    case actions.remove:
      prev.data.messages = prev.data.messages.filter(
        (message) => message.id !== state.data.selected.id,
      );
      prev.data.selected = {};
      return { ...prev };
  }

  return state;
}
