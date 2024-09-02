import React from 'react';

type DeviceData = {
  name: string;
  total: number;
  executed: number;
  color: string;
};

type Props = {
  data: DeviceData[];
  direction?: 'horizontal' | 'vertical';
  title?: string;
  subtitle?: string;
  align?: 'center' | 'left' | 'right';
  showLegend?: boolean; // Prop para controlar a exibição da legenda
};

const RateBar: React.FC<Props> = ({ data, direction = 'horizontal', title, subtitle, align = 'left', showLegend = true }) => {
  const isVertical = direction === 'vertical';

  return (
    <div className={`card-body ${isVertical ? 'flex flex-col' : ''}`}>
      {/* Título e subtítulo */}
      {(title || subtitle) && (
        <div className={`text-${align} mb-4`}>
          {title && <h3 className="text-xl font-bold mb-1">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}

      <div className={`row ${isVertical ? 'flex flex-col' : 'flex-row flex-wrap'}`}>
        {data.map((item, index) => (
          <div
            key={index}
            className={`col-md-3 flex-grow rounded flex items-center py-1 mb-5 ${item.color} ${
              isVertical ? 'w-full mb-4' : ''
            }`}
            style={{ backgroundColor: `${item.color}20` }}
          >
            <span className="text-xl ml-1"></span>
            <div className="flex-grow flex items-center">
              <div
                className="h-8 flex items-center justify-end rounded"
                style={{ width: `${(item.executed / item.total) * 100}%`, backgroundColor: item.color }}
              >
                <div className="text-xs px-2 text-slate-50">{`${Math.round((item.executed / item.total) * 100)}%`}</div>
              </div>
            </div>
            <div className="ml-auto pr-3 text-current w-14 text-end">{item.total}</div>
          </div>
        ))}
      </div>

      {/* Legenda condicional */}
      {showLegend && (
        <ul className="flex flex-wrap justify-center items-center gap-x-4 m-0 p-0 list-none">
          {data.map((item, index) => (
            <li key={index} className="flex items-center text-xs">
              <i className={`rounded-full w-2 h-2 mr-2`} style={{ backgroundColor: item.color }}></i> {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RateBar;