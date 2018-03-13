import Component from "@reactions/component";
import * as React from "react";

export const ControlledSelect = ({ selected, values, onChange }) => {
  return (
    <select
      onChange={ev => {
        const newValue = ev.target.value;
        onChange(newValue);
      }}
      value={selected}>
      {values.map(val => (
        <option key={val} value={val}>
          {val}
        </option>
      ))}
    </select>
  );
};

export const Expandable = ({
  renderCollapsed,
  renderExpanded,
  isCollapsed = true
}) => {
  return isCollapsed ? renderCollapsed() : renderExpanded();
};

export const RTouchable: React.StatelessComponent<{
  onPress?: () => any;
  onPressUp?: () => any;
  onPressDown?: () => any;
  children?: any;
}> = ({ onPress, onPressUp, onPressDown, children }) => {
  return (
    <button
      onClick={onPress}
      onMouseDown={onPressDown}
      onMouseUp={onPressUp}
      onMouseLeave={onPressUp}>
      {children}
    </button>
  );
};
RTouchable.defaultProps = {
  onPress: () => null,
  onPressDown: () => null,
  onPressUp: () => null
};
const cache = {};

const startPromiseLifecycle = ({ cacheKey, promise, state, setState }) => {
  setState({ status: "resolving" });
  if (cacheKey in cache) {
    const { result, status } = cache[cacheKey];
    setState({ result, status });
    return;
  }
  promise({ state })
    .then(result => {
      const newState = {
        result,
        status: "resolved"
      };
      cache[cacheKey] = newState;
      setState(newState);
    })
    .catch(error => {
      const newState = {
        status: "errored",
        error
      };
      cache[cacheKey] = newState;
      setState(newState);
    });
};

export const RenderPromise: React.StatelessComponent<{
  promise?: Promise<any>;
  renderResolved?: any;
  renderErrored?: any;
  renderResolving?: any;
  cacheKey?: string;
}> = ({
  promise,
  renderResolved,
  renderErrored,
  renderResolving,
  cacheKey
}) => {
  return (
    <Component
      cacheKey={cacheKey}
      initialState={{ status: "none" }}
      didUpdate={({ props, prevProps, state, setState }) => {
        if (props.cacheKey === prevProps.cacheKey) {
          return;
        }
        startPromiseLifecycle({
          cacheKey,
          promise,
          state,
          setState
        });
      }}
      didMount={({ state, setState, props }) => {
        startPromiseLifecycle({
          cacheKey,
          promise,
          state,
          setState
        });
      }}
      render={({ state }) => {
        return (
          <React.Fragment>
            {state.status &&
              state.status === "resolving" &&
              renderResolving(state)}
            {state.status &&
              state.status === "resolved" &&
              renderResolved(state)}
            {state.status && state.status === "errored" && renderErrored(state)}
          </React.Fragment>
        );
      }}
    />
  );
};

/**
 * 
 <Component
      cacheKey={cacheKey}
      initialState={{ status: "none" }}
      didUpdate={({ props, prevProps, state, setState }) => {
        if (props.cacheKey === prevProps.cacheKey) {
          return;
        }
        startPromiseLifecycle({ cacheKey, promise, state, setState });
      }}
      didMount={({ state, setState, props }) => {
        startPromiseLifecycle({ cacheKey, promise, state, setState });
      }}
      render={({ state }) => {
        return (
          <React.Fragment>
            {state.status &&
              state.status === "resolving" &&
              renderResolving(state)}
            {state.status &&
              state.status === "resolved" &&
              renderResolved(state)}
            {state.status && state.status === "errored" && renderErrored(state)}
          </React.Fragment>
        );
      }}
    />
 */
