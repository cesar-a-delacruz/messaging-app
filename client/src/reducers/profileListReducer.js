export const actions = {
  load: "LOAD",
  fetch: "FETCH",
};

export function dispatcher(state, action) {
  const prev = state;

  switch (action.type) {
    case actions.load:
      if (action.payload.error) return { ...action.payload };

      const initial = {
        page: 1,
        profiles: action.payload,
      };

      return { ...initial };

    case actions.fetch:
      if (action.payload.error) {
        alert("There are no more profiles.");
        return state;
      }
      const newProfiles = action.payload;
      prev.profiles = [...prev.profiles, ...newProfiles];
      prev.page++;
      return { ...prev };
  }

  return state;
}
