import sessionHandler from "@/handlers/sessionHandler";

export const actions = {
  load: "LOAD",
  add: "ADD",
  select: "SELECT",
  changeRole: "CHANGE_ROLE",
  remove: "REMOVE",
};

export function dispatcher(state, action) {
  const prev = state;

  switch (action.type) {
    case actions.load:
      action.payload.response.data = {
        selected: {},
        members: action.payload.response.data,
      };
      for (const member of action.payload.response.data.members) {
        if (member.userId === sessionHandler.user().id) {
          action.payload.response.data.currentMember = member;
          break;
        }
      }
      return { ...action.payload.response };

    case actions.add:
      prev.data.members = [...prev.data.members, ...action.payload.data];
      return { ...prev };

    case actions.select:
      prev.data.selected = action.payload.selectedMember;
      return { ...prev };

    case actions.changeRole:
      prev.data.members = prev.data.members.map((member) => {
        if (member.id === state.data.selected.id)
          member.role = action.payload.memberRole;
        return member;
      });
      prev.data.selected = {};
      return { ...prev };

    case actions.remove:
      prev.data.members = prev.data.members.filter(
        (member) => member.id !== action.payload.id,
      );
      prev.data.selected = {};
      return { ...prev };
  }

  return state;
}
