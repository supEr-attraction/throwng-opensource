import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@styles/content/ContentInfo.scss";

interface QuizItem {
  id: number;
  text: JSX.Element;
  checked: boolean;
}

interface InfoProps {
  items: QuizItem[];
  nextPath: string;
  buttonText: string;
}

const ContentInfo = ({ items: initialItems, nextPath, buttonText }: InfoProps) => {
  const navigate = useNavigate();
  const [items, setItems] = useState<QuizItem[]>(initialItems);
  const [buttonVisible, setButtonVisible] = useState(false);
  
  const areAllChecked = useMemo(
    () => items.every((item) => item.checked),
    [items]
  );

  const handleCheck = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleCheckAll = () => {
    setItems(items.map((item) => ({ ...item, checked: !areAllChecked })));
  };

  useEffect(() => {
    setButtonVisible(areAllChecked);
  }, [areAllChecked]);

  const handleStart = () => {
    navigate(nextPath, { replace: true });
  };

  return (
    <div className="QuizInfo">
      <div className="quiz-group">
        <div className="quiz-check">
          {items.map((item) => (
            <div key={item.id} className="check-item">
              <input
                id={`checkbox-${item.id}`}
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheck(item.id)}
              />
              <label htmlFor={`checkbox-${item.id}`}>{item.text}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="all-check">
        <input
          type="checkbox"
          id="checkbox-all"
          checked={areAllChecked}
          onChange={handleCheckAll}
        />
        <label htmlFor="checkbox-all">전체 확인</label>
      </div>

      <div className={`quiz-button ${buttonVisible ? "visible" : ""}`}>
        <button onClick={handleStart} disabled={!areAllChecked}>{buttonText}</button>
      </div>
    </div>
  );
};

export default ContentInfo;
