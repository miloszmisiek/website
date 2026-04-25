
type Props = {
  text: string;
};

export function ArrayTitle({ text }: Props) {
  return <span>{`[ ${text} ]`}</span>;
}
