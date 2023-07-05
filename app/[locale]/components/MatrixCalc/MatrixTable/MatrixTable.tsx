"use client";
import { useEffect, useState } from "react";
import { OutputData, getTableList } from "@/app/[locale]/helper/calcData";
import style from "./MatrixTable.module.css";

interface TableList {
  list: Array<{
    chakraName: string;
    physics: number;
    energy: number;
    emotions: any;
    color: string;
  }>;
  physicsTotal: number | null;
  energyTotal: number | null;
  emotionsTotal: number | null;
}

const MatrixTable = ({ matrixData }: { matrixData: OutputData }) => {
  const [tableList, setTableList] = useState<TableList>({
    list: [],
    physicsTotal: null,
    energyTotal: null,
    emotionsTotal: null,
  });
  useEffect(() => {
    const result: TableList = getTableList(matrixData);
    setTableList(result);
  }, [matrixData]);

  if (!Array.isArray(tableList.list)) return null;

  return (
    <div>
      <ul className={style.tableList}>
        <li className={style.tableElement}>
          <p className={style.tableText} style={{ flex: 4 }}>
            Чакра
          </p>
          <p className={style.tableText}>Физика</p>
          <p className={style.tableText}>Энергия</p>
          <p className={style.tableText}>Эмоции</p>
        </li>
        {tableList.list.map(
          ({ chakraName, physics, energy, emotions, color }: any) => {
            return (
              <li
                className={style.tableElement}
                key={chakraName}
                style={{ backgroundColor: color }}
              >
                <p className={style.tableText} style={{ flex: 4 }}>
                  {chakraName}
                </p>
                <p className={style.tableText}>{physics}</p>
                <p className={style.tableText}>{energy}</p>
                <p className={style.tableText}>{emotions}</p>
              </li>
            );
          }
        )}
        <li className={style.tableElement}>
          <p className={style.tableText} style={{ flex: 4 }}>
            Итог
          </p>
          <p className={style.tableText}>{tableList.physicsTotal}</p>
          <p className={style.tableText}>{tableList.energyTotal}</p>
          <p className={style.tableText}>{tableList.emotionsTotal}</p>
        </li>
        <li
          className={style.tableElement}
          style={{ borderTop: "1px solid black" }}
        >
          <p style={{ fontStyle: "italic" }}>Итог: {tableList.emotionsTotal}</p>
        </li>
      </ul>
    </div>
  );
};

export default MatrixTable;