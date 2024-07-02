import { useEffect, useMemo, useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activity-Reducer";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  const canRestartApp = () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMemo(() => state.activities.length, []);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex  justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase ">
            Contador de Calorias
          </h1>
          <button
            disabled={!canRestartApp()}
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm mb-2
           disabled:opacity-10"
           onClick={() => dispatch({type: 'restar-app'})}
          >
            Reiniciar App
          </button>
        </div>

        <section className="bg-lime-500 py-20 px-5">
          <div className="max-w-4xl mx-auto">
            <Form dispatch={dispatch} state={state} />
          </div>
        </section>


        <section className="bg-gray-800 py-10 ">
          <div className="max-w-4xl mx-auto">
              <CalorieTracker
                activities={state.activities}
              />
          </div>

        </section>

        <section className="p-10 mx-auto max-w-4xl ">
          <ActivityList state={state.activities} dispatch={dispatch} />
        </section>
      </header>
    </>
  );
}

export default App;
