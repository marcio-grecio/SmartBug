import { FC } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Button from '../Button/Index';
import { infoLog } from '../../Utils/Logger';

type ExportButtonProps = {
  data: any[];
  columns: Array<{
    header: string;
    key: string;
    width?: number;
    alignment?: 'left' | 'center' | 'right';
    sum?: boolean;
  }>;
  fileName?: string;
  title?: string;
  subtitleLeft?: string;
  subtitleRight?: string;
  subtitleCenter?: string;
  titleFontSize?: number;
  subtitleFontSize?: number;
  titleBackgroundColor?: string;
  subtitleBackgroundColor?: string;
  headerFontSize?: number;
  headerTextColor?: string;
  headerBackgroundColor?: string;
  titleHeight?: number;
  subtitleHeight?: number;
  sumText?: string;
  sumColspan?: number;
  sumBackgroundColor?: string;
  sumTextColor?: string; // Nova propriedade para cor do texto na somatória
} & Omit<React.ComponentProps<typeof Button>, 'onClick'>;

const ExportButton: FC<ExportButtonProps> = ({
  data,
  columns,
  fileName = 'data.xlsx',
  title,
  subtitleLeft,
  subtitleRight,
  subtitleCenter,
  titleFontSize = 14,
  subtitleFontSize = 12,
  titleBackgroundColor = 'FFCC00',
  subtitleBackgroundColor = 'FFFF99',
  headerFontSize = 12,
  headerTextColor = 'FFFFFFFF',
  headerBackgroundColor = '333333',
  titleHeight = 30,
  subtitleHeight = 20,
  sumText = 'Total',
  sumColspan = 1,
  sumBackgroundColor = 'FFFFCC',
  sumTextColor = 'FF0000', // Valor padrão para a cor do texto na somatória (vermelho)
  ...buttonProps
}) => {
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    infoLog('Exportando colunas', columns);

    // Adiciona o título
    if (title) {
      const titleRange = `A1:${String.fromCharCode(65 + columns.length - 1)}1`;
      worksheet.mergeCells(titleRange);
      const titleCell = worksheet.getCell('A1');
      titleCell.value = title;
      titleCell.font = { size: titleFontSize, bold: true, color: { argb: 'FFFFFFFF' } };
      titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
      titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: titleBackgroundColor } };
      worksheet.getRow(1).height = titleHeight;
    }

    // Adiciona o subtítulo
    const totalColumns = columns.length;
    if (subtitleCenter) {
      const subtitleRange = `A2:${String.fromCharCode(65 + totalColumns - 1)}2`;
      worksheet.mergeCells(subtitleRange);
      const subtitleCell = worksheet.getCell('A2');
      subtitleCell.value = subtitleCenter;
      subtitleCell.font = { size: subtitleFontSize, color: { argb: 'FFFFFFFF' } };
      subtitleCell.alignment = { vertical: 'middle', horizontal: 'center' };
      subtitleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: subtitleBackgroundColor } };
      worksheet.getRow(2).height = subtitleHeight;
    } else if (subtitleLeft || subtitleRight) {
      const leftColspan = Math.floor(totalColumns / 2);
      const leftTextCell = worksheet.getCell('A2');
      leftTextCell.value = subtitleLeft || '';
      leftTextCell.font = { size: subtitleFontSize, color: { argb: 'FFFFFFFF' } };
      leftTextCell.alignment = { vertical: 'middle', horizontal: 'left' };
      leftTextCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: subtitleBackgroundColor } };
      const leftTextCellRange = `A2:${String.fromCharCode(65 + leftColspan - 1)}2`;
      worksheet.mergeCells(leftTextCellRange);

      const rightTextCell = worksheet.getCell(`${String.fromCharCode(65 + leftColspan)}2`);
      rightTextCell.value = subtitleRight || '';
      rightTextCell.font = { size: subtitleFontSize, color: { argb: 'FFFFFFFF' } };
      rightTextCell.alignment = { vertical: 'middle', horizontal: 'right' };
      rightTextCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: subtitleBackgroundColor } };
      const rightTextCellRange = `${String.fromCharCode(65 + leftColspan)}2:${String.fromCharCode(65 + totalColumns - 1)}2`;
      worksheet.mergeCells(rightTextCellRange);

      worksheet.getRow(2).height = subtitleHeight;
    }

    // Adiciona o cabeçalho com base na configuração de colunas
    const headerRow = worksheet.addRow(columns.map(column => column.header));

    // Aplica estilo ao cabeçalho e configura as colunas
    columns.forEach((column, index) => {
      const colNumber = index + 1;
      const headerCell = headerRow.getCell(colNumber);

      headerCell.font = { size: headerFontSize, bold: true, color: { argb: headerTextColor } };
      headerCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: headerBackgroundColor } };
      worksheet.getColumn(colNumber).alignment = { vertical: 'middle', horizontal: column.alignment || 'left' };
      worksheet.getColumn(colNumber).width = column.width || 20;
    });

    // Inicializa um objeto para armazenar as somatórias das colunas
    const sums: { [key: string]: number } = {};

    // Adiciona os dados da tabela e calcula a somatória das colunas
    data.forEach(row => {
      const rowData = columns.map(column => {
        const value = row[column.key];

        if (column.sum) {
          sums[column.key] = (sums[column.key] || 0) + (typeof value === 'number' ? value : 0);
        }

        return value;
      });

      worksheet.addRow(rowData);
    });

    // Adiciona a linha de somatória no rodapé, se houver colunas a serem somadas
    if (Object.keys(sums).length > 0) {
      const sumRow = worksheet.addRow([]);

      // Mescla as células conforme o colspan especificado
      const sumStartCell = sumRow.getCell(1);
      sumStartCell.value = sumText;
      sumStartCell.font = { bold: true, color: { argb: sumTextColor } }; // Aplica a cor do texto
      sumStartCell.alignment = { vertical: 'middle', horizontal: 'center' };
      sumStartCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: sumBackgroundColor } };

      if (sumColspan > 1) {
        const sumTextRange = `A${sumRow.number}:${String.fromCharCode(65 + sumColspan - 1)}${sumRow.number}`;
        worksheet.mergeCells(sumTextRange);
      }

      columns.forEach((column, index) => {
        if (column.sum) {
          const cell = sumRow.getCell(index + 1 + (sumColspan - 1));
          cell.value = sums[column.key];
          cell.font = { bold: true, color: { argb: sumTextColor } }; // Aplica a cor do texto
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: sumBackgroundColor } };
        }
      });
    }

    // Gera o arquivo Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, fileName);
  };

  return <Button {...buttonProps} onClick={handleExport} />;
};

export default ExportButton;
