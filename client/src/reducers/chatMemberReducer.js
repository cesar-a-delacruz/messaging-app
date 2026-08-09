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
      if (action.payload.error) return { ...action.payload };

      const initial = {
        selected: {},
        members: [...action.payload],
      };

      for (const member of initial.members) {
        if (member.userId === sessionHandler.user().id) {
          initial.currentMember = member;
          break;
        }
      }
      return initial;

    case actions.add:
      prev.members = [...prev.members, ...action.payload.data];
      return { ...prev };

    case actions.select:
      prev.selected = action.payload.selectedMember;
      return { ...prev };

    case actions.changeRole:
      prev.members = prev.members.map((member) => {
        if (member.id === state.selected.id)
          member.role = action.payload.memberRole;
        return member;
      });
      prev.selected = {};
      return { ...prev };

    case actions.remove:
      prev.members = prev.members.filter(
        (member) => member.id !== action.payload.id,
      );
      prev.selected = {};
      return { ...prev };
  }
}
