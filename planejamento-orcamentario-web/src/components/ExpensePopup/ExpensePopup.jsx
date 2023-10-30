import "./ExpensePopup.css";
import closeIcon from "../../images/close.png";

import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoryService";
import { getAllGroups } from "../../services/groupService";
import { updateExpense } from "../../services/expenseService";
import { NumericFormat } from "react-number-format";

const ExpensePopup = ({ expense, setExpense, setPopup }) => {
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [groupOptions, setGroupOptions] = useState([]);

    useEffect(() => {
    const fetchSelectsData = (async () => {
    const categories = await getAllCategories();
    setCategoryOptions(categories);

    const groups = await getAllGroups();
    setGroupOptions(groups);
    });
    fetchSelectsData();
    },[])


    const handleSelectId = ({name, value}) => {
        setExpense({
            ...expense, 
            [name]: parseInt(value)
        });
    }

    const handleObjectInput = ({name, value}) => {
    setExpense({
        ...expense, 
        [name]:value
    });
    }

    const handleMonetaryInput = ({name, value}) => {
    setExpense({
        ...expense,
        [name]: parseFloat(value.replace('R$', '').trim())
    })
    }

    const handleClosePopup = () => {
      setPopup(false);
      setExpense({});
    }

    const saveExpense = async () => {
      const updated = await updateExpense(expense);
      if(updated){
        setPopup(false);
        setExpense({});
      } 
    }

return (
    <div className="backShadow">
        <div className="popupExpense">
            <button className="closeIcon" onClick={handleClosePopup}>
                <img src={closeIcon} alt={"close icon"}/>
            </button>

        <div className="popupForm">
          <div className="labelInputPopup">
            <label>Nome</label>
            <input
              type="text"
              value={expense.name}
              onChange={(e) =>
                handleObjectInput({ name: "name", value: e.target.value })
              }
              placeholder="Edital de pesquisa"
            />
          </div>

          <div className="displayTwo">
          <div className="labelInputPopup">
            <label>Grupo da Despesa</label>
            <select id="selectGroup" onChange={(e) => handleSelectId({name: 'groupId', value: e.target.value })}>
              <option value="default">—</option>
              {groupOptions.map(group => {
                return (
                  <option key={group.key} value={group.id}>
                    {group.number + ` - ` + group.name}
                  </option>
                )
              })}
            </select>
            </div>
            <div className="labelInputPopup">
              <label>Categoria da despesa</label>
              <select onChange={(e) => handleSelectId({name: 'categoryId', value: e.target.value })}>
                  <option key={0} value="default">—</option>
                  {categoryOptions.map(category => {
                      return (
                          <option key={category.key} value={category.id}>
                          {category.name}
                          </option>
                      )
                  })}
              </select>
            </div>
          </div>

          <div className="displayTwo">
            <div className="labelInputPopup">
              <label>Solicitante</label>
              <input
                value={expense.requester}
                onChange={(e) =>
                  handleObjectInput({
                    name: "requester",
                    value: e.target.value,
                  })
                }
                placeholder=""
              />
            </div>
            <div className="labelInputPopup">
              <label>Ano Fiscal</label>
              <input
                value={expense.balanceId}
                placeholder="2023"
                disabled
                className="lockedInput"
              />
            </div>
          </div>

          <div className="displayTwo">
            <div className="labelInputPopup">
              <label>Previsão de pagamento</label>
              <input
                value={expense.expectedPaymentDate}
                onChange={(e) =>
                  handleObjectInput({
                    name: "expectedPaymentDate",
                    value: e.target.value,
                  })
                }
                type="date"
              />
            </div>
            <div className="labelInputPopup">
              <label>Valor solicitado</label>
              <NumericFormat
                value={expense.requestedValue}
                onChange={(e) =>
                  handleMonetaryInput({
                    name: "requestedValue",
                    value: e.target.value,
                  })
                }
                thousandSeparator={true}
                prefix={"R$ "}
              />
            </div>
          </div>

          <div className="labelInputPopup">
            <label>Observação</label>
            <textarea
              value={expense.observation}
              onChange={(e) =>
                handleObjectInput({
                  name: "observation",
                  value: e.target.value,
                })
              }
              placeholder="Edital para ..."
            />
          </div>
          <button div="saveButton" onClick={saveExpense}> Salvar </button>
        </div>
      </div>
    </div>
);
}; //TODO: Estilizar botão de salvar (Cassio)

export default ExpensePopup;
