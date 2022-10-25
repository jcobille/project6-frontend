import { User } from "../../redux/types/ActionTypes";

interface RegisterProps {
  label: string;
  value: string;
  name: string;
  type: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SharingProps {
  value: string;
  data: User[];
  changeHandler: (event: React.FormEvent<HTMLSelectElement>) => void;
}

export const TextInput = (props: RegisterProps) => {
  return (
    <div className="row">
      <div className="col-5 text-end">
        <label>{props.label}</label>
      </div>
      <div className="col-3 text-start">
        <input
          onChange={props.onChange}
          type={props.type}
          name={props.name}
          className="bordered-input"
          placeholder={props.placeholder}
          value={props.value}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export const UserSelection = ({ value, changeHandler, data }: SharingProps) => {
  return (
    <select className="custom-select" value={value} onChange={changeHandler}>
      <option></option>
      {data.map((u, key) => {
        return (
          <option key={key} value={u.id}>
            {u.name}
          </option>
        );
      })}
    </select>
  );
};
