import { fsmStore, fsmUpdateState, fsmUpdateAction } from "./fsm";



describe("finite state machine", () => {
  describe("GIVEN initial state", () => {

    it("THEN state is idle", () => {
      const state = fsmStore.getState();

      expect(state.fsm.state).toBe('idle');
    });

    describe("AND state is idle", () => {
      describe("WHEN form is updated", () => {
        it("THEN person can be updated", () => {
          const before = fsmStore.getState();

          expect(before.fsm.person.name).toBe('John');

          fsmStore.dispatch(fsmUpdateAction({
            person: {
              name: 'jeff',
              age: 15
            },
          }))

          const after = fsmStore.getState();

          expect(after.fsm.person.name).toBe('jeff');
          expect(after.fsm.person.age).toBe(15);
        });
      });
    });
  });


  describe("GIVEN state is errors", () => {
    describe("WHEN form is updated", () => {
      it("THEN person is not updated", () => {
        const before = fsmStore.getState();

        expect(before.fsm.state).toBe('idle');
        expect(before.fsm.person.name).toBe('John');

        fsmStore.dispatch(fsmUpdateState("errors"));

        const middle = fsmStore.getState();

        expect(middle.fsm.state).toBe('errors');
        expect(middle.fsm.person.name).toBe('John');

        fsmStore.dispatch(fsmUpdateAction({
          person: {
            name: 'jeff',
            age: 15
          },
        }));

        const after = fsmStore.getState();

        expect(after.fsm.state).toBe('errors');
        expect(after.fsm.person.name).toBe('John');
        expect(after.fsm.person.age).toBe(30);
      });
    });
  });
});
