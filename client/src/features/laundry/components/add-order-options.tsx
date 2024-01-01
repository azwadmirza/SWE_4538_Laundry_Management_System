import { IItems } from "./add-new-order";

interface IAddOrderOptions {
    item: IItems;
    }

const AddOrderOptions = ({item}:IAddOrderOptions) => {
  return (
    <>
    <span>{item.ClothType}</span>
      <div className="inputbox">
        <input type="number" min="0" onChange={(e)=>{
          item.Quantity=Number(e.target.value);
        }}/>
        <label htmlFor="">Quantity</label>
      </div>
      <select id="wash-type" className="inputbox" onChange={(e)=>{
        item.Type=String(e.target.value);
      }}>
        <option className="wash-type-options" value="none">
          None
        </option>
        <option className="wash-type-options" value="Wash">
          Wash
        </option>
        <option className="wash-type-options" value="Iron">
          Iron
        </option>
        <option className="wash-type-options" value="WashAndIron">
          Wash & Iron
        </option>
        <option className="wash-type-options" value="DryClean">
          Dry Wash
        </option>
      </select>
    </>
  );
};

export default AddOrderOptions;
