
interface Award {
  id: string,
  institution: string,
  name: string,
  serviceLine: string,
  comments: string
  outcome: string
  intSource: string
  extSource: string
  messaging: string
  frequency: string
  notifDate: string
  cmcontact: string
  sourceatr: string
  wherepubint: string
  promotionlim: string
  imgurl1: string
  imgurl2: string
  imgurl3: string
  imgurl4: string
  effectiveDate: string,
  expirationDate: string
}

type AwardList = Award[];

const Table: React.FC<{ Awards: AwardList }> = ({ Awards }) => {
  return (
    <ul>
      {Awards.map((award: Award) => (
        <li key={award.id}>{award.name}</li>
      ))}
    </ul>
  );
};
export default Table;
