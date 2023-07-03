import { IProps } from './models';

export function FormatDate(props: IProps) {
  const date = new Date(props.epoch * 1000);
  return (
    <>
      {date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      })}
    </>
  );
}
