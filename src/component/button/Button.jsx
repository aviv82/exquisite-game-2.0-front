import "./Button.css";

export const Button = ({ kind, title, face, action }) => {
  return (
    <button type={kind} className={face} onClick={action}>
      {title}
    </button>
  );
};
