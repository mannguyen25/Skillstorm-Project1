import * as React from "react";
import clsx from "clsx";


const ProgressBar = React.memo(function ProgressBar(props) {
  const { value } = props;
  const valueInPercent = value * 100;

  return (
    <div className='root'>
      <div
        className='value'
      >{`${valueInPercent.toLocaleString()} %`}</div>
      <div
        className={clsx('bar', {
          low: valueInPercent < 30,
          medium: valueInPercent >= 30 && valueInPercent <= 70,
          high: valueInPercent > 70
        })}
        style={{ maxWidth: `${valueInPercent}%` }}
      />
    </div>
  );
});
export function renderProgress(params) {
  return <ProgressBar value={Number(params.value)} />;
}
