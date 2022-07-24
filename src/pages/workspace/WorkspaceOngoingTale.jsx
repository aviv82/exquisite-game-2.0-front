import "./WorkspaceOngoingTale.css";

export const WorkspaceOngoingTale = ({ num, tales }) => {
  const taleToShow = [];
  if (tales) {
    tales.map((tale) =>
      tale.id === Number(num) ? taleToShow.push(tale) : null
    );
  }
  console.log("tale to show:", taleToShow[0]);

  return (
    <div className="ongoing-tale">
      <h2 className="ongoing-head">
        Ongoing tale - {taleToShow[0].attributes.title}
      </h2>
    </div>
  );
};
