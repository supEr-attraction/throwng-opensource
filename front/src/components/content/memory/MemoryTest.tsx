import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "@/styles/content/memory/App.module.scss";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { postContentResult } from "@services/contentResultApi/ContentResultApi";

function MemoryTest() {
  const navigate = useNavigate();
  const [start, setStart] = useState<boolean>(false);
  const [cardEls, setCardEls] = useState<any>([]);
  const cards = useMemo(
    () => Array.from(new Array(cardEls.length), (_, i) => i + 1),
    [cardEls]
  );
  const [round, setRound] = useState<number>(1);
  const [life, setLife] = useState<number>(1);
  const [displayRound, setDisplayRound] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(3);
  const [roundRunning, setRoundRunning] = useState<boolean>(false);
  const [answer, setAnswer] = useState<Array<string | number>>([""]);
  const [answerCount, setAnswerCount] = useState<number>(3);
  const [clickCount, setClickCount] = useState<number>(0);
  const [clickedCards, setClickedCards] = useState<Array<string>>([]);
  const [isFail, setIsFail] = useState<boolean>(false);
  const [isSuccess, setIsSuccesss] = useState<boolean>(false);
  const [gameClear, setGameClear] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(4);
  const [endCountdownClear, setEndCountdownClear] = useState<any>(() => {});
  const [difficultyUpDelayClear, setDifficultyUpDelayClear] = useState<any>(
    () => {}
  );

  const [animations, setAnimations] = useState<Array<any>>([]);

  const clear = useCallback(async () => {
    setGameClear(true);
    setStart(false);
    postContentResult("memory");
    setRoundRunning(false);
    await postContentResult("memory");
    sessionStorage.setItem("cleared", "true");
    navigate("/memory/success", { replace: true });
  }, [navigate]);

  const restart = () => {
    cardEls.forEach((el: any) => {
      el.style.backgroundColor = "whitesmoke";
      el.style.boxShadow = "none";
      el.style.borderColor = "whitesmoke";
    });
    setGameClear(false);
    setDisplayRound(0);
    setClickedCards([]);
    setClickCount(0);
    setRound(1);
    setLife(1);
    setAnswerCount(3);
    setDifficulty(3);
    setIsFail(false);
    setStart(false);
    setCountdown(4);
  };

  const nextRound = useCallback(() => {
    clearTimeout(endCountdownClear);
    setClickCount(0);
    setClickedCards([]);
    setCountdown(4);
    setRoundRunning(false);
    setLife(1);
    setRound((prev) => prev + 1);
    setAnswerCount((prev) => prev + 1);
  }, [endCountdownClear]);

  const gameover = useCallback(async () => {
    cardEls.forEach((el: any) => {
      if (answer.indexOf(el.id) !== -1 && clickedCards.indexOf(el.id) === -1) {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "0px 0px 15px orange, 0px 0px 30px whitesmoke";
        el.style.borderColor = "orange";
      } else if (answer.indexOf(el.id) !== -1) {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "0px 0px 15px #48cae4, 0px 0px 30px whitesmoke";
        el.style.borderColor = "#48cae4";
      } else if (
        answer.indexOf(el.id) === -1 &&
        clickedCards.indexOf(el.id) !== -1
      ) {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "0px 0px 15px #bf1f1f, 0px 0px 30px whitesmoke";
        el.style.borderColor = "#bf1f1f";
      }
    });
    setIsFail(true);
    setRoundRunning(false);
    setClickCount(0);
    await postContentResult("memory");
  }, [answer, cardEls, clickedCards]);

  const onCardClick = useCallback(
    (e: any) => {
      if (!roundRunning || clickedCards.indexOf(e.target.id) !== -1) {
        return;
      }

      setClickedCards((prev) => [...prev, e.target.id]);

      if (answer.indexOf(e.target.id) === -1) {
        e.target.style.backgroundColor = "#7b66ff";
        e.target.style.boxShadow = "0px 0px 15px #bf1f1f, 0px 0px 30px #7b66ff";
        e.target.style.borderColor = "#bf1f1f";

        if (life !== 0) {
          setLife(0);
        } else {
          gameover();
          clearTimeout(endCountdownClear);
        }

        return;
      } else {
        e.target.style.backgroundColor = "#7b66ff";
        e.target.style.boxShadow = "0px 0px 15px #48cae4, 0px 0px 30px #7b66ff";
        e.target.style.borderColor = "#48cae4";
      }

      if (clickCount + 1 === answer.length) {
        setIsSuccesss(true);

        if (round === 5 || round === 10 || round === 15) {
          const difficultyUpDelay = setTimeout(() => {
            nextRound();
          }, 1000);

          setDifficultyUpDelayClear(difficultyUpDelay);

          return;
        }

        if (round === 1) {
          clear();

          return;
        }

        nextRound();
      } else {
        setClickCount((prev) => prev + 1);
      }
    },
    [
      answer,
      clear,
      clickCount,
      clickedCards,
      endCountdownClear,
      gameover,
      life,
      nextRound,
      round,
      roundRunning,
    ]
  );

  const endCountdown = useCallback((time: number) => {
    const endTimer = setTimeout(() => {
      gameover();
    }, time);

    setEndCountdownClear(endTimer);
  }, []);

  const changeDifficulty = useCallback(
    (num: number) => {
      cardEls.forEach((el: any) => {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "none";
        el.style.borderColor = "whitesmoke";
      });

      setAnswerCount(3);
      setDifficulty(num);
    },
    [cardEls]
  );

  const roundStart = useCallback(() => {
    if (!start) {
      return;
    }

    let delay = 0;

    if (round === 5) {
      delay = 1000;
      setCountdown(5);
      changeDifficulty(4);
      setDisplayRound(5);
    } else if (round === 10) {
      delay = 1000;
      setCountdown(5);
      changeDifficulty(5);
      setDisplayRound(10);
    } else if (round === 15) {
      delay = 1000;
      setCountdown(5);
      changeDifficulty(6);
      setDisplayRound(15);
    }

    const prepareTimer = setTimeout(() => {
      setIsSuccesss(false);

      if (round !== 5 && round !== 10 && round !== 15) {
        setDisplayRound((prev) => prev + 1);
      }

      cardEls.forEach((el: any) => {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "none";
        el.style.borderColor = "whitesmoke";
      });

      const newAnswer = [...cards].map((card) => card.toString());
      for (
        let i = difficulty ** 2 - answerCount, j = difficulty ** 2 - 1;
        i !== 0;
        i--, j--
      ) {
        const pick = Math.round(Math.random() * j);
        newAnswer.splice(pick, 1);
      }

      setAnswer(newAnswer);

      cardEls.forEach((el: any) => {
        if (newAnswer.indexOf(el.id) !== -1) {
          el.style.backgroundColor = "whitesmoke";
          el.style.boxShadow = "0px 0px 15px #48cae4, 0px 0px 30px whitesmoke";
          el.style.borderColor = "#48cae4";
        } else {
          el.style.backgroundColor = "black";
          el.style.borderColor = "black";
        }
      });
    }, 1000 + delay);

    const countdown = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const colorTimer = setTimeout(() => {
      cardEls.forEach((el: any) => {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "none";
        el.style.borderColor = "whitesmoke";
      });
    }, 3000 + delay);

    const startTimer = setTimeout(() => {
      setRoundRunning(true);
      setCountdown(0);
      clearTimeout(countdown);
    }, 4000 + delay);

    endCountdown(20000 + delay);

    delay = 0;

    return { colorTimer, startTimer, countdown, delayTimer: prepareTimer };
  }, [
    answerCount,
    cardEls,
    cards,
    changeDifficulty,
    difficulty,
    endCountdown,
    round,
    start,
  ]);

  useEffect(() => {
    setCardEls(document.querySelectorAll(`.${styles.card}`));
  }, [difficulty]);

  useEffect(() => {
    if (!start && cardEls.length !== 0) {
      const animationArr: Array<any> = [];

      cardEls.forEach((el: any) => {
        animationArr.push(
          gsap.to(el, cardEls.length / 10, {
            repeat: -1,
            yoyo: true,
            delay: parseInt(el.id) / 10,
            backgroundColor: "whitesmoke",
            borderColor: "#48cae4",
            boxShadow: "0px 0px 15px #48cae4, 0px 0px 30px whitesmoke",
          })
        );
      });

      setAnimations((prev) => [...prev, ...animationArr]);
    }
  }, [cardEls, start]);

  useEffect(() => {
    return () => {
      clearTimeout(endCountdownClear);
      clearTimeout(difficultyUpDelayClear);
    };
  });

  useEffect(() => {
    if (!start) {
      return;
    }

    const { colorTimer, startTimer, countdown, delayTimer }: any = roundStart();

    return () => {
      clearTimeout(colorTimer);
      clearTimeout(startTimer);
      clearTimeout(countdown);
      clearTimeout(delayTimer);
    };
  }, [roundStart, start]);

  const rowsGenerator = useCallback(() => {
    const rowsReturn: Array<any> = [];

    const cardsGenerator = (i: number) => {
      const cardsReturn: Array<any> = [];

      for (let j = 1; j <= difficulty; j++) {
        const id = -difficulty + j + difficulty * i;
        cardsReturn.push(
          <div
            id={`${id}`}
            key={`${id}`}
            className={styles.card}
            onClick={onCardClick}
          ></div>
        );
      }

      return cardsReturn;
    };

    for (let i = 1; i <= difficulty; i++) {
      rowsReturn.push(
        <div key={i} className={styles.row}>
          {/* 카드 생성 */}
          {cardsGenerator(i)}
        </div>
      );
    }

    return rowsReturn;
  }, [difficulty, onCardClick]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.round}>Round {displayRound}</div>
        <div className={styles.level}>
          {displayRound >= 15
            ? "4단계"
            : displayRound >= 10
            ? "3단계"
            : displayRound >= 5
            ? "2단계"
            : "1단계"}
        </div>
      </div>

      <div className={styles.content}>
        {(!start || isFail || gameClear) && (
          <div className={styles.start}>
            {(isFail || gameClear) && (
              <div className={styles["result"]}>
                {gameClear}
                <div className={styles["score__text"]}>Score</div>
                <div className={styles["score__round"]}>{round}</div>
              </div>
            )}
            <span
              className={styles["start__text"]}
              style={{ fontSize: gameClear || isFail ? "5vmin" : "20vmin" }}
              onClick={() => {
                animations.forEach((el) => {
                  el.kill();
                });
                if (isFail || gameClear) {
                  restart();
                } else {
                  setStart(true);
                }
              }}
            >
              {isFail || gameClear ? "Restart" : "Start"}
            </span>
          </div>
        )}
        <div className={styles.status}>
          {isFail
            ? ""
            : isSuccess
            ? round !== 5 && round !== 10 && round !== 15
              ? "Success"
              : "Level up"
            : start && (countdown === 0 ? "" : countdown !== 4 && countdown)}
        </div>
        <div className={styles.br}>
          <div className={styles.board}>{rowsGenerator()}</div>
        </div>
      </div>
    </div>
  );
}

export default MemoryTest;
