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
      const initial = { ...action.payload.response };
      initial.data = {
        selected: {},
        members: [...initial.data],
      };
      for (const member of initial.data.members) {
        if (member.userId === sessionHandler.user().id) {
          initial.data.currentMember = member;
          break;
        }
      }
      return initial;

    case actions.add:
      prev.data.members = [
        ...prev.data.members,
        ...action.payload.response.data,
      ];
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
}
