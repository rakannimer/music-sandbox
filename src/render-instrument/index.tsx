import * as React from "react";
import { getInstrument } from "../get-instrument-web/";
import { RenderPromise } from "../react-utils/";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const createCacheKey = ({ instrumentName }) => instrumentName;

export const RenderInstrument: React.StatelessComponent<any> = ({
  instrumentName,
  children,
  render
}) => {
  const cacheKey = createCacheKey({ instrumentName });
  const childrenRenderer = children
    ? typeof children === "function" ? children : () => children
    : render ? render : () => null;
  // alert(instrumentName);
  return (
    <div>
      <RenderPromise
        cacheKey={cacheKey}
        promise={() => getInstrument(instrumentName)}
        renderErrored={promiseState => (
          <div>
            Error Loading instrument : {JSON.stringify(promiseState.error)}
          </div>
        )}
        renderResolved={promiseState => {
          return (
            <div>
              Instrument Loaded :
              <div>{childrenRenderer(promiseState.result)}</div>
            </div>
          );
        }}
        renderResolving={promiseState => <div> Loading Instrument </div>}
      />
    </div>
  );
};
