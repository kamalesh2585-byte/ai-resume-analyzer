export function ProgressBar({ value }: { value: number }) { return <div className="progress"><span style={{ width: `${value}%` }} /></div>; }
