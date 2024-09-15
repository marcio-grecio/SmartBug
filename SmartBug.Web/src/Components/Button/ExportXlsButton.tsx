import { FC } from 'react';
import ExcelJS from 'exceljs'; // Importa o ExcelJS
import { saveAs } from 'file-saver'; // Importa o file-saver para salvar o arquivo no navegador
import Button from '../Button/Index'; // Importa seu componente Button existente
import { infoLog } from '../../Utils/Logger';

type ExportButtonProps = {
  data: any[]; // O array de dados que será exportado
  columns: Array<{ header: string; key: string; width?: number; alignment?: 'left' | 'center' | 'right' }>; // Novo formato de colunas
  fileName?: string; // Nome do arquivo de exportação (opcional)
  title?: string; // Título para o Excel
  subtitle?: string; // Subtítulo para o Excel
  titleFontSize?: number; // Tamanho da fonte do título
  subtitleFontSize?: number; // Tamanho da fonte do subtítulo
  titleBackgroundColor?: string; // Cor de fundo do título
  subtitleBackgroundColor?: string; // Cor de fundo do subtítulo
  headerFontSize?: number; // Tamanho da fonte do cabeçalho
  headerTextColor?: string; // Cor do texto do cabeçalho
  headerBackgroundColor?: string; // Cor de fundo do cabeçalho
  titleHeight?: number; // Altura da linha do título
  subtitleHeight?: number; // Altura da linha do subtítulo
} & Omit<React.ComponentProps<typeof Button>, 'onClick'>; // Inclui todas as propriedades de Button, exceto onClick

const ExportButton: FC<ExportButtonProps> = ({
  data,
  columns,
  fileName = 'data.xlsx',
  title,
  subtitle,
  titleFontSize = 14,
  subtitleFontSize = 12,
  titleBackgroundColor = 'FFCC00',
  subtitleBackgroundColor = 'FFFF99',
  headerFontSize = 12,
  headerTextColor = 'FFFFFFFF',
  headerBackgroundColor = '333333',
  titleHeight = 30,
  subtitleHeight = 20,
  ...buttonProps
}) => {
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook(); // Cria um novo workbook
    const worksheet = workbook.addWorksheet('Sheet1'); // Cria uma nova planilha

    infoLog('Exportando colunas', columns);

    // Adiciona o título
    if (title) {
      const titleRange = `A1:${String.fromCharCode(65 + columns.length - 1)}1`;
      worksheet.mergeCells(titleRange); // Mescla as células para o título
      const titleCell = worksheet.getCell('A1');
      titleCell.value = title;
      titleCell.font = { size: titleFontSize, bold: true, color: { argb: 'FFFFFFFF' } }; // Define a fonte e a cor
      titleCell.alignment = { vertical: 'middle', horizontal: 'center' }; // Centraliza o texto
      titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: titleBackgroundColor } }; // Define a cor de fundo
      worksheet.getRow(1).height = titleHeight; // Define a altura da linha do título
    }

    // Adiciona o subtítulo
    if (subtitle) {
      const subtitleRange = `A2:${String.fromCharCode(65 + columns.length - 1)}2`;
      worksheet.mergeCells(subtitleRange); // Mescla as células para o subtítulo
      const subtitleCell = worksheet.getCell('A2');
      subtitleCell.value = subtitle;
      subtitleCell.font = { size: subtitleFontSize, color: { argb: 'FFFFFFFF' } }; // Define a fonte e a cor
      subtitleCell.alignment = { vertical: 'middle', horizontal: 'center' }; // Centraliza o texto
      subtitleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: subtitleBackgroundColor } }; // Define a cor de fundo
      worksheet.getRow(2).height = subtitleHeight; // Define a altura da linha do subtítulo
    }

    // Adiciona o cabeçalho com base na configuração de colunas
    const headerRow = worksheet.addRow(columns.map(column => column.header));

    // Aplica estilo ao cabeçalho e configura as colunas
    columns.forEach((column, index) => {
      const colNumber = index + 1; // Números de colunas começam em 1 no ExcelJS
      const headerCell = headerRow.getCell(colNumber);

      headerCell.font = { size: headerFontSize, bold: true, color: { argb: headerTextColor } };
      headerCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: headerBackgroundColor } };
      
      // Define o alinhamento e largura da coluna
      worksheet.getColumn(colNumber).alignment = { vertical: 'middle', horizontal: column.alignment || 'left' }; // Define o alinhamento da coluna
      worksheet.getColumn(colNumber).width = column.width || 20; // Define a largura da coluna
    });

    // Adiciona os dados da tabela
    data.forEach(row => {
      const rowData = columns.map(column => row[column.key]);
      const dataRow = worksheet.addRow(rowData);

      // Aplica o alinhamento de cada coluna a cada célula da linha de dados
      dataRow.eachCell((cell, colNumber) => {
        cell.alignment = { vertical: 'middle', horizontal: columns[colNumber - 1].alignment || 'left' }; // Aplica o alinhamento com base na configuração
      });
    });

    // Gera o arquivo Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, fileName); // Salva o arquivo usando o file-saver
  };

  return <Button {...buttonProps} onClick={handleExport} />;
};

export default ExportButton;
